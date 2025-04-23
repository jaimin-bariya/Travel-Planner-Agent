from langchain.tools import tool


@tool
def regenerate_itinerary_tool(userWish: str) -> str:
    """User wants to change something in the plan and regenerate the itinerary."""
    return "regenerate_plan"


@tool
def end_trip_tool(userWish: str) -> str:
    """User is done with planning and wants to end the session."""
    return "end_trip"






tools_list = [regenerate_itinerary_tool, end_trip_tool]