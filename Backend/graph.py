from node.state import AgentState
from langgraph.graph import StateGraph
from node.extract_preferences import extract_preferences, validate_preferences
from node.find_major_places import suggest_major_places
from node.generate_itinerary import generate_itinerary
from node.graph_end import ending


# graph definition with input type
travel_graph = StateGraph(AgentState)
travel_graph_2 = StateGraph(AgentState)


# All Node (steps adding)
travel_graph.add_node("extract_preferences", extract_preferences)
travel_graph.add_node("validate_preferences", validate_preferences)
travel_graph.add_node("suggest_major_places", suggest_major_places)



# Connect node with Edges
travel_graph.set_entry_point("extract_preferences") 
travel_graph.add_edge("extract_preferences", "validate_preferences")
travel_graph.add_edge("validate_preferences", "suggest_major_places")
travel_graph.set_finish_point("suggest_major_places")

#compilation 
travel_planner_graph = travel_graph.compile()



travel_graph_2.add_node("generate_itinerary", generate_itinerary)
travel_graph_2.add_node("ending", ending)

travel_graph_2.set_entry_point("generate_itinerary")
travel_graph_2.add_edge("generate_itinerary", "ending")
travel_graph_2.set_finish_point("ending")

travel_planner_graph_2 = travel_graph_2.compile()

