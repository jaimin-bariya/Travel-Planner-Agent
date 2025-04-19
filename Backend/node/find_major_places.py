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


prompt = PromptTemplate(
        input_variables = ['travelState', 'travelCountry', 'preferences'],
        template ="""

        You are a travel planner AI assistant.

        Based on the user's preferences below, suggest some (at least 7) major tourist places like city where more tourist places, Places where there are more small palces to visit around that major place
        in {travelState} and {travelCountry}.

        TIme Required to visit that place or city fully


        User Preferences:
        {preferences}

        Return only the result in this exact Python format (no extra text):

        [
            {{"unique_id": "ID", "name": "PLACE_NAME", "desc": "Short description...", "cityname": "City", "timeRequired": "1-2 Days"}},
            ...
        ]

        Don't include any explanation or greeting. Just return the list.



        - Religion = hindu → include temples. Muslim → mosques. Christian → churches.
        - If religion is mulslim then don't choose temple or Hindu related places and vice-verca
        - If tags like "culture" exist → include cultural shows, museums, etc.
        - Suggest Activites according to tags
        """
    )



def get_list_of_places(response):
    try:
        return json.loads(response.content)
    except json.JSONDecodeError:
        print("Error decoding JSON")
        return []


def get_in_table_format(placesList):
    try:
        
        table = [[item['unique_id'], item['name'], item['desc'], item['cityname']] for item in placesList]
        return tabulate(table, headers=["Place Name", "Description", "City"], tablefmt="fancy_grid")
    except Exception as e:
        return f"⚠️ Failed to format response: {e}"


def suggest_major_places(state: AgentState) -> AgentState:

    preferences = state['preferences']
    
    

    formatted_prompt = prompt.format(
        travelState=preferences['travelState'],
        travelCountry=preferences['travelCountry'],
        preferences=preferences)

    response = llm.invoke(formatted_prompt)


    # Convert response to Python list
    places = get_list_of_places(response=response)

    
    print(get_in_table_format(placesList=places))

    state['suggested_places'] = places
    state['is_paused'] = True

    return state




def pause_node(state: AgentState):

    
    if not state.get("is_paused", False):
        return state

    return state
