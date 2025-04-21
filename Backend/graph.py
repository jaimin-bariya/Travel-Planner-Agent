from node.state import AgentState
from langgraph.graph import StateGraph, END
from node.extract_preferences import extract_preferences, validate_preferences
from node.find_major_places import suggest_major_places, pause_node
from node.generate_itinerary import generate_itinerary
from node.graph_end import ending


# graph definition with input type
travel_graph = StateGraph(AgentState)
# travel_graph_2 = StateGraph(AgentState)


# All Node (steps adding)
travel_graph.add_node("extract_preferences", extract_preferences)
travel_graph.add_node("validate_preferences", validate_preferences)
travel_graph.add_node("suggest_major_places", suggest_major_places)
travel_graph.add_node("pause_node", pause_node)
travel_graph.add_node("generate_itinerary", generate_itinerary)
travel_graph.add_node("ending", ending)



# Connect node with Edges
travel_graph.set_entry_point("extract_preferences") 
travel_graph.add_edge("extract_preferences", "validate_preferences")
travel_graph.add_edge("validate_preferences", "suggest_major_places")
travel_graph.add_edge("suggest_major_places", "pause_node")


travel_graph.add_conditional_edges(
    "pause_node",
    lambda state: state.get("next", None),  
    {
        "generate_itinerary": "generate_itinerary", 
        None: END  
    }
)

# travel_graph.set_finish_point("suggest_major_places")

travel_graph.add_edge("generate_itinerary", "ending")
travel_graph.set_finish_point("ending")


#compilation 
travel_planner_graph = travel_graph.compile()



# print(travel_planner_graph.get_graph().draw_ascii())





