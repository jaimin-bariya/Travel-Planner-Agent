from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from graph import travel_planner_graph, travel_planner_graph_2

app = FastAPI()

# Global Session Store
# Key = plan_id, value = state dict
session_store = {}



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
        "next": "",
        "is_paused": False,
        "plan_id": "trip" + str(uuid.uuid4())
        
        

    }

    print(pref)

    result_state = travel_planner_graph.invoke(agent_state)


    
    
 
    
    places = result_state.get("suggested_places", [])
    

    session_store[result_state['plan_id']] = result_state

    print(result_state['plan_id'])

    return {
        "msg": "ok", 
        "plan_id": result_state['plan_id'],
        "sdata": pref,
        "places": places

    }




@app.post("/make_itinerary")
async def make_itinerary(resume: ResumeRequest):

    print("🔥 make_itinerary triggered \n \n")

    

    # ⛔ Plan ID not found
    if resume.plan_id not in session_store:
        return {"error": "Session expired or not found!"}
    
    
    
    

    paused_state = session_store[resume.plan_id]


    paused_state['user_selected_places'] = [p.as_dict() for p in resume.selected_places]
    

    result_state = travel_planner_graph_2.invoke(paused_state)



    return {
        "msg": "Itinerary created!",
        "selected_places": paused_state['user_selected_places'],
        "MSG2": result_state['is_paused'],
        "itinerary": result_state.get('itinerary', {}),
        # "history": final_state.get("history", [])

    }




    



