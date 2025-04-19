import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  ClipboardList, 
  MapPin, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';
import { UserPreferences, Destinations, Itinerary, FollowUpQuestions } from "@/pages";


const StartPlanning = () => {
  
  const [userPreferences, setUserPreferences] = useState({});
  const [planId, setPlanId] = useState("");
  const [foundMajorPlaces, setFoundMajorPlaces] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [itinerary, setItinerary] = useState({});
  const [showDestinations, setShowDestinations] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);


  // This function will be called when the user submits their preferences
  const handlePreferencesSubmit = (preferences) => {
    setUserPreferences(preferences);
    setShowDestinations(true);
    console.log("Preferences Handles sucessfully ------------ Step 1 Done ");
    
    // Smoothly scroll to destinations section
    document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth' });
  };



  // This function will be called when the user selects destinations
  const handleDestinationsSubmit = (destinations) => {
    setSelectedDestinations(destinations);
    setShowItinerary(true);
    
    
    // Smoothly scroll to itinerary section
    document.getElementById('itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
  };



  // This function will be called when the itinerary is generated
  const handleItineraryGenerated = (generatedItinerary) => {
    setItinerary(generatedItinerary);
    setShowFollowUp(true);
    // Smoothly scroll to follow-up section
    document.getElementById('followup-section')?.scrollIntoView({ behavior: 'smooth' });
  };



  const renderSectionHeader = (icon, title) => (
    <div className="flex items-center space-x-3 mb-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full   text-red-600">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
  
  return (
    <>
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-center">Plan Your Perfect Trip</h1>
          <p className="text-center text-gray-600 mt-2">Follow these steps to create your personalized travel plan</p>
          



          {/* Steps =  */}
          <div className="flex justify-between items-center my-8 relative">

            {/* Border  */}
            {/* <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div> */}


            <div className="flex flex-col items-center z-0">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-500  mb-2">
                <ClipboardList size={24} />
              </div>
              <span className="text-sm font-medium  text-gray-500">Your Preferences</span>
            </div>


            
            <div className="flex flex-col items-center z-0">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${showDestinations ? 'bg-travel-600 text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                <MapPin size={24} />
              </div>
              <span className={`text-sm font-medium ${showDestinations ? 'text-travel-600' : 'text-gray-500'}`}>Choose Destinations</span>
            </div>
            

            <div className="flex flex-col items-center z-0">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${showItinerary ? 'bg-travel-600 text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                <Calendar size={24} />
              </div>
              <span className={`text-sm font-medium ${showItinerary ? 'text-travel-600' : 'text-gray-500'}`}>Your Itinerary</span>
            </div>


            
            <div className="flex flex-col items-center z-0">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${showFollowUp ? 'bg-travel-600 text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                <MessageSquare size={24} />
              </div>
              <span className={`text-sm font-medium ${showFollowUp ? 'text-travel-600' : 'text-gray-500'}`}>Finalize Plan</span>
            </div>


          </div>
          
          


          <div className="space-y-16">
            {/* Section 1: User Preferences */}
            <section id="preferences-section" className="bg-white rounded-xl p-6 shadow-sm border">
              {renderSectionHeader(<ClipboardList size={24} />, "Tell Us About Your Preferences")}
              <UserPreferences onSubmit={handlePreferencesSubmit} setFoundMajorPlaces={setFoundMajorPlaces} setPlanId={setPlanId} />
            </section>
            
            {/* Section 2: Destinations */}
            <section id="destinations-section" className={`bg-white rounded-xl p-6 shadow-sm border transition-opacity duration-500 ${showDestinations ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              {renderSectionHeader(<MapPin size={24} />, "Choose Major Destinations")}
              {showDestinations && (
                <Destinations 
                  preferences={userPreferences} 
                  onSubmit={handleDestinationsSubmit} 
                  foundMajorPlaces={foundMajorPlaces}
                  planId={planId}
                  setItinerary={setItinerary}

                />
                
              )}
              {!showDestinations && (
                <div className="text-center py-8 text-gray-500">
                  <p>Please complete your preferences first</p>
                </div>
              )}
            </section>
            
            {/* Section 3: Itinerary */}
            <section id="itinerary-section" className={`bg-white rounded-xl p-6 shadow-sm border transition-opacity duration-500 ${showItinerary ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              {renderSectionHeader(<Calendar size={24} />, "Your Personalized Itinerary")}
              {showItinerary && (
                <Itinerary 
                  preferences={userPreferences}
                  destinations={selectedDestinations}
                  onItineraryGenerated={handleItineraryGenerated}
                  itinerary={itinerary}
                  setItinerary={setItinerary}
                />
                
              )}
              {!showItinerary && (
                <div className="text-center py-8 text-gray-500">
                  <p>Please select your destinations first</p>
                </div>
              )}
            </section>
            
            {/* Section 4: Follow-up Questions */}
            <section id="followup-section" className={`bg-white rounded-xl p-6 shadow-sm border transition-opacity duration-500 ${showFollowUp ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              {renderSectionHeader(<MessageSquare size={24} />, "Finalize Your Plan")}
              {showFollowUp && (
                <FollowUpQuestions 
                  preferences={userPreferences}
                  destinations={selectedDestinations}
                  itinerary={itinerary}
                />

              )}
              {!showFollowUp && (
                <div className="text-center py-8 text-gray-500">
                  <p>Your itinerary needs to be generated first</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      
    </>
  );
};

export default StartPlanning;