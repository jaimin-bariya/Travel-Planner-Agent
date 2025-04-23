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
    input_variables=["preferences", "Majorplaces", "userWish"],
    template="""
You are a smart travel planner agent.

Your job is to generate or update a detailed travel itinerary using the **user preferences**, **major places**, and any **change request** the user mentions.

---

🚨 VERY IMPORTANT:

✅ Your output format MUST be **only a valid Python dictionary**.
❌ DO NOT add any explanation, comment, sentence, title, or code formatting like ```python.
✅ Just give a pure dictionary: it MUST start with `{{ ` and end with ` }}`.

---


USER WANT THIS 

- User Message for change = {userWish}



📥 INPUTS:

- preferences: {preferences}
- major places: {Majorplaces}
- user request/change: {userWish}

---



🧠 LOGIC:

1. If the user request mentions changes (like "change", "update", "modify", "regenerate"), then use the input as a **change request**.
2. Adjust ONLY the necessary parts (like meals, day plan, city, activities) based on the request.
3. DO NOT remove all other parts unless the user wants a full reset.
4. If the user request is empty or neutral, generate the itinerary normally.
5. Do not repeat same places or meals in different days.
6. Follow the logic rules:

--- TRAVEL LOGIC TO FOLLOW:

- Religion = hindu → include temples. Muslim → mosques. Christian → churches.
- If religion is mulslim then don't choose temple or Hindu related places and vice-verca
- foodType = nonveg → suggest non-veg food, every day food should be different
- tripType = family → avoid clubs, suggest peaceful/cultural experiences.
- tripType = Couple -> Suggest club, couple places
- Use `budget` from preferences to adjust estimated costs.
- If budget is high -> Add more paid activities like sky dying, etc 
- If tags like "culture" exist → include cultural shows, museums, etc.
- shoppingInterest = luxurybrands → include premium malls or markets.

---

🎯 OUTPUT FORMAT (Strictly):


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

    try:
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

    except:
        print("Error decoding JSON")
        



def generate_itinerary(state: AgentState):

    selected_places = state['user_selected_places']
    user_wish = state['messages'][-1].content if state['messages'] else ""
    preferences = state['preferences']


    formatted_prompt = prompt.format(
        preferences = preferences,
        Majorplaces = selected_places,
        userWish = user_wish
    )

    response = llm.invoke(formatted_prompt)

    answer = get_in_proper_format(response=response)

    


    



    state['itinerary'] = answer
    

    print(f"Node 4 Exit - Itinerary Generated:")

    return state



