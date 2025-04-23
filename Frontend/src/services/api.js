import axios from "axios";



const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});





export const testBackend = async () => {
    const res = await API.get("/");
    return res.data
}



// Send User Preferences to Backend
export const sendUserPreferences = async (user_pref) => {
    const res = await API.post("/user-preferences", user_pref)
    console.log("User Preferecnes Sent", res.data);
    return res.data
}





// Send Selected Major Destination and make Itinerary 
export const makeItinerary = async (selected_places, planId) => {
    console.log("sending selected places..................");
    
    const formattedPlaces = selected_places.map(place => ({
        unique_id: place.unique_id,
        name: place.name,
        desc: place.desc,
        cityname: place.cityname,
        timeRequired: place.timeRequired
      }));

    
      
    const res = await API.post("/make_itinerary", {
        plan_id: planId,
        selected_places: formattedPlaces
    });
      
    


    // const res = await API.post("/make_itinerary", {plan_id: planId, selected_places: selected_places})
    console.log("Use selected Places sent:", res.data);
    return res.data
    
}



// Sending user message - Follow-up conversations
export const followUp = async (userMSG, planId) => {

    console.log("User msg sending.............", userMSG);

    console.log(typeof(userMSG));
    console.log(typeof(planId));
    

    const res = await API.post("/conversation_chat", {plan_id: planId, user_message: userMSG})

    console.log("User msg sent...................");
    
    

    return res.data
}