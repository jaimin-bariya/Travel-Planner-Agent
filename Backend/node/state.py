from typing import TypedDict, Dict, List, Any, Optional



class AgentState(TypedDict):
    preferences: Dict[str, Any]
    suggested_places: List[Dict[str, Any]]
    user_selected_places: List[Dict[str, Any]]
    itinerary: Dict[str, Any]
    history: List[Dict[str, Any]]
    is_paused: bool
    plan_id: str
    next: Optional[str]
    last_updated: float  




