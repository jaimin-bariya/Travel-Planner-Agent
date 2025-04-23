from node.state import AgentState


def extract_preferences(state: AgentState) -> AgentState:

    

    # update state["history"]
    print(f"Node 1 - User Preferences Received:")

    state["history"].append({
        "step": "extract_preferences",
        "message": "User preferences extracted."
    })

    return state



def validate_preferences(state: AgentState) -> AgentState:

    preferences = state["preferences"]
    
    required_keys = ["age", "travelState", "travelCountry", "travelDuration", "tags", "numberOfPeople", "tripType", "restType", "travelType", "foodType", "budget"]

    missing = [key for key in required_keys if key not in preferences or not preferences[key]]


    if missing:
        raise ValueError(f"Missing Preferences: {', '.join(missing)}")
    

    print("Node 2 - Validation Checked")

    return state



