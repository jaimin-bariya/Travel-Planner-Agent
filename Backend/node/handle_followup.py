from node.state import AgentState
from langchain_groq import ChatGroq
from apis.note import groq_model
from tools.all_tools import tools_list
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
import json


llm = ChatGroq(
    model=groq_model['model'],
    api_key=groq_model['api_key']
)



# System message





llm_with_tools = llm.bind_tools(tools_list)



def handle_followup(state: AgentState):

    print(f"Node 5 ENTER - Follow up")

    #Extract latest user message
    user_last_message = state['messages'][-1].content if state['messages'] else ""

    sys_msg = SystemMessage(
    content="You are a helpful Travel Planner Agent. You have already created a full itinerary for the client. Now the client wants to change something in their plan. Use the previous preferences and update based on their new request. RULES = 1. Keep format as it is (dictinory), 2. Make Changes where needed as said by user, 3. Give me plan after make changes only where needed"
)


    prev_plan = state.get('itinerary', {})
    user_prefs = state.get('preferences', {})


    # Conversation Flow 

    messages = [
        sys_msg, 
        AIMessage(content=f"Here is the current plan: {prev_plan}"),
        AIMessage(content=f"Your Preferences: {user_prefs}"),
        HumanMessage(content=user_last_message),
    ]

    #Run the LLM with tools

    response = llm_with_tools.invoke(messages)


    # Update the itinerary in state 

    try:
        updated_plan = json.loads(response.content)
    except json.JSONDecodeError:
        # Optional: log or handle it better
        updated_plan = prev_plan  # fallback
    

    state['itinerary'] = updated_plan
    state['messages'].append(AIMessage(content=response.content))


    # state['is_paused'] = True

    print(f"Node 5 EXIT - Follow up")


    return state



