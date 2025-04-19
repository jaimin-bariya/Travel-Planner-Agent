import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Utensils, 
  Camera, 
  ArrowRight,
  Loader2
} from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

import { makeItinerary } from '@/services/api';




// Mock data for destinations
// const mockDestinations = [
//     {
//       id: 1,
//       name: "Paris, France",
//       image: "https://source.unsplash.com/random/300x200/?paris",
//       cityname: "Rajkot",
//       timeRequired: "3-4 days",
//       travelTime: "2 hours from London", 
//       entryFees: "$15 for most attractions",
//       foodIncluded: false,
//       photoAllowed: true,
//       description: "The City of Light offers iconic landmarks, world-class cuisine, and romantic ambiance."
//     },
//     {
//       id: 2,
//       name: "Rome, Italy",
//       image: "https://source.unsplash.com/random/300x200/?rome",
//       timeRequired: "4-5 days",
//       travelTime: "2.5 hours from Paris",
//       entryFees: "$20 for most attractions",
//       foodIncluded: false,
//       photoAllowed: true,
//       description: "Explore ancient ruins, magnificent art, and indulge in authentic Italian cuisine."
//     },
//     {
//       id: 3,
//       name: "Barcelona, Spain",
//       image: "https://source.unsplash.com/random/300x200/?barcelona",
//       timeRequired: "3-4 days",
//       travelTime: "1.5 hours from Rome",
//       entryFees: "$10 for most attractions",
//       foodIncluded: false,
//       photoAllowed: true,
//       description: "A vibrant city with stunning architecture, beautiful beaches, and delicious tapas."
//     },
//     {
//       id: 4,
//       name: "Santorini, Greece",
//       image: "https://source.unsplash.com/random/300x200/?santorini",
//       timeRequired: "2-3 days",
//       travelTime: "3 hours from Barcelona",
//       entryFees: "Free for most attractions",
//       foodIncluded: false,
//       photoAllowed: true,
//       description: "Iconic whitewashed buildings, stunning sunsets, and crystal-clear waters."
//     },
//     {
//       id: 5,
//       name: "Prague, Czech Republic",
//       image: "https://source.unsplash.com/random/300x200/?prague",
//       timeRequired: "2-3 days",
//       travelTime: "2 hours from Santorini",
//       entryFees: "$8 for most attractions",
//       foodIncluded: false,
//       photoAllowed: true,
//       description: "A fairy-tale city with stunning architecture, rich history, and affordable dining."
//     },
//     {
//       unique_id: 6,
//       name: "Amsterdam, lands",
//       description: "Picturesque canals, world-famous museums, and unique coffee shops.",
//       cityname: "Rajkot"
//     }
//   ];
  



  const Destinations = ({ preferences, onSubmit, foundMajorPlaces, planId, setItinerary }) => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {

      if (!foundMajorPlaces || foundMajorPlaces.length === 0) return;

      console.log(foundMajorPlaces);
      

      const fetchDestinations = async () => {
        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDestinations(foundMajorPlaces);
        setLoading(false);
      };
  
      fetchDestinations();
    }, [preferences, foundMajorPlaces]);
  
    const handleDestinationToggle = (destinationId) => {
      setSelectedDestinations(prev => {
        if (prev.includes(destinationId)) {
          return prev.filter(id => id !== destinationId);
        } else {
          return [...prev, destinationId];
        }
      });
    };


    useEffect(() => {
      console.log(selectedDestinations);
      
    }, [selectedDestinations])
  
    const handleSubmit = async () => {
      if (selectedDestinations.length === 0) {
        toast({
          title: "No destinations selected",
          description: "Please select at least one destination to proceed.",
          variant: "destructive"
        });
        return;
      }

      try {

        const fullDestinations = destinations.filter(dest => selectedDestinations.includes(dest.unique_id));
        
        const resData = await makeItinerary(fullDestinations, planId)

        setItinerary(resData['itinerary'])
        

      } catch (error) {
        console.error("While Sending User Selected Places to backend", error);
      }
  
      const selected = destinations.filter(dest => selectedDestinations.includes(dest.unique_id));
      onSubmit(selected);

      

    };
  
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin h-10 w-10 text-travel-600 mb-4" />
          <p className="text-lg text-gray-600">Finding the perfect destinations for you...</p>
        </div>
      );
    }


    if (destinations === undefined) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin h-10 w-10 text-travel-600 mb-4" />
          <p className="text-lg text-gray-600">Undefined.</p>
        </div>
      );
    }
    
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Start with the Icons</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Pick the most popular places in your selected state – we'll take care of the rest!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {destinations.map((destination) => (
            <Card 
              key={destination.unique_id} 
              className={`overflow-hidden transition-all duration-200 ${
                selectedDestinations.includes(destination.unique_id) 
                  ? 'ring-2 ring-travel-600 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="relative h-fit">
                {/* <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                /> */}
                <div className="absolute top-2 right-2">
                  <Checkbox 
                    checked={selectedDestinations.includes(destination.unique_id)}
                    onCheckedChange={() => handleDestinationToggle(destination.unique_id)}
                    className="h-6 w-6 bg-white border-gray-300"
                  />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-travel-600" /> 
                  {destination.name}
                </CardTitle>
                <CardDescription>{destination.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span><span className="font-medium">City:</span> {destination.cityname}</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span><span className="font-medium">Travel time:</span> {destination.travelTime}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span><span className="font-medium">Entry fees:</span> {destination.entryFees}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Utensils className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Food included:</span> 
                      {destination.foodIncluded ? 'Yes' : 'No'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Camera className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Photos allowed:</span> 
                      {destination.photoAllowed ? 'Yes' : 'No'}
                    </span>
                  </li> */}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDestinationToggle(destination.unique_id)}
                >
                  {selectedDestinations.includes(destination.unique_id) 
                    ? 'Deselect' 
                    : 'Select Destination'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSubmit} 
            className="bg-travel-600 hover:bg-travel-700"
            disabled={selectedDestinations.length === 0}
          >
            Create Itinerary <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  export default Destinations;
  