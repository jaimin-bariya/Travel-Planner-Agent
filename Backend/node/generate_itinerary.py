from .state import AgentState
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
import json
from tabulate import tabulate
from apis.note import groq_model


llm = ChatGroq(
    model = groq_model['model'],
    api_key= groq_model['api_key']
)


from langchain.prompts import PromptTemplate

prompt = PromptTemplate(
    input_variables=["preferences", "Majorplaces"],
    template="""
You are a smart travel planner agent.

Your job is to generate a detailed travel itinerary using the **user preferences** and **major places**.

---

🚨 VERY IMPORTANT:

✅ Your output format MUST be **only a valid Python dictionary**.
❌ DO NOT add any explanation, comment, sentence, title, or code formatting like ```python.
✅ Just give a pure dictionary: it MUST start with `{{ ` and end with ` }}`.

---

📥 INPUTS:

- preferences: {preferences}
- major places: {Majorplaces}

---

🎯 FORMAT EXAMPLE:

{{
"summary": {{
    "total_days": <int>,
    "major_destination": <string>,
    "estimated_cost": <int>,
    "plan_table": [
        {{
            "day": "Day 1",
            "date": "YYYY-MM-DD",
            "state": "State Name",
            "city": "City Name",
            "num_places": <int>,
            "places": [<list of place names>],
            "one_day_cost": <int>
        }},
        ...
    ]
}},
"detailed_plan": [
    {{
        "day": "Day 1",
        "date": "YYYY-MM-DD",
        "heading": "Major Places names",
        "meal_plan": {{
            "breakfast": "DISH_Name with items names in DISH ADD  Local Famous Dish",
            "lunch": "DISH_Name with items names in DISH ADD  Local Famous Dish",
            "dinner": "DISH_Name with items names in DISH ADD Local Famous Dish"
        }},
        "activities": [
            {{
                "place": "Place Name",
                "main_attraction": "3 to 3 Name of Attractions",
                "photo": "Allowed" | "Not-allowed" | "Unknown",
                "entry": "Free" | "Paid" | "Unknown"
            }},
            ...
        ],
        "tips": "TIPS or Suggesions"
    }},
    ...
]
}}

---

🧠 LOGIC RULES TO FOLLOW:

- Everyday places should be differnet and Unique
- Religion = hindu → include temples. Muslim → mosques. Christian → churches.
- If religion is mulslim then don't choose temple or Hindu related places and vice-verca
- foodType = nonveg → suggest non-veg food, every day food should be different
- tripType = family → avoid clubs, suggest peaceful/cultural experiences.
- tripType = Couple -> Suggest club, couple places
- Use `budget` from preferences to adjust estimated costs.
- If budget is high -> Add more paid activities like sky dying, etc 
- If tags like "culture" exist → include cultural shows, museums, etc.
- Suggest Activites according to tags
- shoppingInterest = luxurybrands → include premium malls or markets.

---

RETURN ONLY THE PYTHON DICT. DO NOT SAY ANYTHING ELSE. THE OUTPUT MUST BE CLEAN.
"""
)



def get_in_proper_format(response):
    try:
        return json.loads(response.content)
    except json.JSONDecodeError:
        print("Error decoding JSON")
        return []



def print_all_tables(properFormat):

    print("\n📅 Plan Table:\n")
    table_data = [ [d['day'], d['date'], d['state'], d['city'], ", ".join(d['places']), d['one_day_cost']] for d in properFormat['summary']['plan_table'] ]
    print(tabulate(table_data, headers=["Day", "Date", "State", "City", "Places", "Cost"], tablefmt="fancy_grid"))


    print("\n📝 Detailed Itinerary:\n")
    detailed_table =  [
        [
            d['day'],
            d['date'],
            d['heading'],
            f"🍳 {d['meal_plan']['breakfast']}, 🍱 {d['meal_plan']['lunch']}, 🍽 {d['meal_plan']['dinner']}",
            d['activities'][0]['main_attraction'],
            d['tips']
        ]
            for d in properFormat['detailed_plan']
    ]

    print(tabulate(detailed_table, headers=["Day", "Date", "Heading", "Meal Plan", "Main Attraction", "Tips"], tablefmt="fancy_grid"))




def generate_itinerary(state: AgentState):

    selected_places = state['user_selected_places']

    preferences = state['preferences']


    formatted_prompt = prompt.format(
        preferences = preferences,
        Majorplaces = selected_places
    )

    response = llm.invoke(formatted_prompt)

    answer = get_in_proper_format(response=response)

    print("\n\n\n", answer['summary'] , "\n\n\n" )
    print("\n\n\n", answer['detailed_plan'] , "\n\n\n" )


    print_all_tables(answer)



    state['itinerary'] = answer
    

    print(f"Node 3 - Itinerary Generated:")

    return state



