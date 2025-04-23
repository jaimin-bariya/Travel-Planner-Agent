from node.state import AgentState
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import tools_condition
from node.extract_preferences import extract_preferences, validate_preferences
from node.find_major_places import suggest_major_places, pause_node
from node.generate_itinerary import generate_itinerary
from node.handle_followup import handle_followup
from tools.all_tools import tools_list
from node.graph_end import ending
from langgraph.checkpoint.memory import MemorySaver


# memory = MemorySaver()

# graph definition with input type
travel_graph = StateGraph(AgentState)
# travel_graph_2 = StateGraph(AgentState)


# All Node (steps adding)
travel_graph.add_node("extract_preferences", extract_preferences)
travel_graph.add_node("validate_preferences", validate_preferences)
travel_graph.add_node("suggest_major_places", suggest_major_places)
travel_graph.add_node("pause_node", pause_node)
travel_graph.add_node("generate_itinerary", generate_itinerary)
travel_graph.add_node("handle_followup", handle_followup)
travel_graph.add_node("ending", ending)



# Connect node with Edges
travel_graph.set_entry_point("extract_preferences") 
travel_graph.add_edge("extract_preferences", "validate_preferences")
travel_graph.add_edge("validate_preferences", "suggest_major_places")
travel_graph.add_edge("suggest_major_places", "pause_node")



# travel_graph.add_conditional_edges(
#     "pause_node",
#     lambda state: "generate_itinerary" if not state['is_paused'] else None,  
#     {
#         "generate_itinerary": "generate_itinerary", 
#         None: END  
#     }
# )

travel_graph.add_edge("pause_node", "generate_itinerary")


travel_graph.add_edge("generate_itinerary", "handle_followup")
travel_graph.add_edge("handle_followup", "ending")

# travel_graph.add_conditional_edges(
#     "handle_followup", 
#     tools_condition(tools_list),
#     {
#         "regenerate_plan": "generate_itinerary",
#         "end_trip": "ending"
#     }
# )

travel_graph.add_edge("ending", END)





#compilation 
travel_planner_graph = travel_graph.compile()



# print(travel_planner_graph.get_graph().draw_ascii())





