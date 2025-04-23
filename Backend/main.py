from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import uuid
from graph import travel_planner_graph
from node.state import AgentState
from langchain_core.messages import HumanMessage




app = FastAPI()

# config = {"configurable": {"thread_id": "thread1"}}


# Global Session Store
# Key = plan_id, value = state dict
session_store: Dict[str, AgentState] = {}



# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Preferences(BaseModel):
    name: str
    age: int
    travelState: str
    travelCountry: str
    gender: str
    religion: str
    travelDuration: dict
    tags: list
    numberOfPeople: int
    tripType: str
    restType: str
    travelType: str
    foodType: str
    budget: dict 
    shoppingInterest: list
    specialChoices: str

    def __str__(self):
        return (
            f"\n🧑 Name: {self.name}\n"
            f"🎂 Age: {self.age}\n"
            f"📍 Travel Location: {self.travelState}, {self.travelCountry}\n"
            f"⚧️ Gender: {self.gender}\n"
            f"🛐 Religion: {self.religion}\n"
            f"⏳ Travel Duration: {self.travelDuration}\n"
            f"🏷️ Tags: {self.tags}\n"
            f"👨‍👩‍👧‍👦 People: {self.numberOfPeople}\n"
            f"🎒 Trip Type: {self.tripType}\n"
            f"😴 Rest Type: {self.restType}\n"
            f"🛣️ Travel Type: {self.travelType}\n"
            f"🍽️ Food Type: {self.foodType}\n"
            f"💰 Budget: {self.budget}\n"
            f"🛍️ Shopping Interest: {self.shoppingInterest}\n"
            f"🌟 Special Choices: {self.specialChoices}\n"
        )
    
    def as_dict(self):
        return self.model_dump()



class Selected_Places_By_User(BaseModel):
    unique_id: str
    name: str
    desc: str
    cityname: str
    timeRequired: str 

    def as_dict(self):
        return self.model_dump()


class ResumeRequest(BaseModel):
    plan_id: str
    selected_places: list[Selected_Places_By_User]


class FollowUpRequest(BaseModel):
    plan_id: str
    user_message: str





@app.get("/")
def helloJP():
    return {"msg": "Hello JP bro, B is live now"}


@app.post("/user-preferences")
async def collect_preferences(pref: Preferences):

    agent_state = {
        "preferences": pref.as_dict(),
        "suggested_places": [],
        "user_selected_places": [],
        "itinerary": {},
        "history": [],
        "is_paused": False,
        "plan_id": "trip" + str(uuid.uuid4())
        
        

    }

    
    
    # print("Initial state:", agent_state)  # Before graph execution
    result_state = travel_planner_graph.invoke(agent_state)
    # print("Result state:", result_state)  # After graph execution


    
    
    
    places = result_state.get("suggested_places", [])
    

    session_store[result_state['plan_id']] = AgentState(**result_state)

    print(result_state['plan_id'])

    return {
        "msg": "ok", 
        "plan_id": result_state['plan_id'],
        "sdata": pref,
        "places": places

    }




@app.post("/make_itinerary")
async def make_itinerary(resume: ResumeRequest):


    

    # ⛔ Plan ID not found
    if resume.plan_id not in session_store:
        return {"error": "Session expired or not found!"}
    
    
    
    paused_state = session_store[resume.plan_id]

    paused_state['user_selected_places'] = [p.as_dict() for p in resume.selected_places]
    
    print("\n PS",paused_state['is_paused'], "\n")



    
    resume_state = {
        **paused_state,
        "is_paused": False,
        "next": "generate_itinerary",
    }

    print(" \n RS", resume_state['is_paused'], "\n")


    # config2 = {"configurable": {"thread_id": "thread1", "branch": "generate_itinerary"}}
   
    
    result_state = travel_planner_graph.invoke(resume_state)
    


    print("Graph nodes:", travel_planner_graph.nodes)
    
    return {
        "msg": "Itinerary created!",
        "state": result_state['is_paused'],
        "selected_places": result_state['user_selected_places'],
        "itinerary": result_state.get('itinerary', {}),
        

    }




    

@app.post("/conversation_chat")
async def follow_up_staet(req: FollowUpRequest):


    print(req.model_dump())

    planID = req.plan_id
    userMsg = req.user_message

    print(userMsg)


    state = session_store.get(planID)

    if not state:
        return {"error": "Session expired or not found!"}



    state['messages'].append(HumanMessage(content=userMsg))


    



    updated_state = travel_planner_graph.invoke(state)



    return {
        "msg": "Follow up done",
        "itinerary": updated_state['itinerary'],
        "user_msg": updated_state['messages'][-1]
    }
    








