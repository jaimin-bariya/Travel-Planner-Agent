/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Utensils,
  Hotel,
  DollarSign,
  Camera,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { format, addDays } from "date-fns";



const Itinerary = ({ preferences, destinations, onItineraryGenerated, setItinerary, itinerary }) => {
    // const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("summary");
  


    useEffect(() => {
      // console.log("Preferences:", preferences);
      // console.log("Destinations:", destinations);

      setLoading(true);
      setError(null);

      
      if (itinerary && Object.keys(itinerary).length > 0) {
        setLoading(false)
      }

    }, [destinations, preferences, itinerary]);
  

    // After Done By User
    const handleFinalize = () => {
      if (itinerary) {
        onItineraryGenerated(itinerary);
      }
    };


  
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">Creating your personalized itinerary...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Generating Itinerary</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      );
    }
  
    if (!itinerary) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Unable to Generate Itinerary</h3>
          <p className="text-gray-600 mb-4">We couldn't create an itinerary with the provided information. Please check your destinations and try again.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      );
    }
  
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Personalized Itinerary</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your preferences and selected destinations, we've created a comprehensive travel plan for you.
          </p>
        </div>
  
        <Tabs 
          defaultValue="summary" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
            <TabsTrigger value="detailed" className="flex-1">Detailed Plan</TabsTrigger>
          </TabsList>
  

        
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" /> 
                  Trip Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h3 className="text-xl font-semibold text-blue-700">{itinerary?.summary?.total_days ?? '...'}</h3>
                      <p className="text-blue-600">Total Days</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h3 className="text-xl font-semibold text-blue-700">{destinations?.length}</h3>
                      <p className="text-blue-600">Major Destinations</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h3 className="text-xl font-semibold text-blue-700">₹{itinerary?.summary?.estimated_cost ?? '...'}</h3>
                      <p className="text-blue-600">Estimated Cost</p>
                    </div>
                  </div>
                </div>
  
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day / Date</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>No. of Places</TableHead>
                        <TableHead>Places</TableHead>
                        <TableHead>One Day Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(itinerary?.summary?.plan_table ?? []).map((day) => (
                        <TableRow key={day.day}>
                          <TableCell>
                            Day {day['day']} <br />
                            <span className="text-gray-500 text-sm">
                              {format(day['date'], 'dd/MM/yyyy')}
                            </span>
                          </TableCell>
                          <TableCell>{day?.state ?? '...'}</TableCell>
                          <TableCell>{day?.city ?? '...'}</TableCell>
                          <TableCell>{day?.num_places ?? '...'}</TableCell>
                          <TableCell>{day?.places.join(', ') ?? '...'}</TableCell>
                          <TableCell>₹{day?.one_day_cost ?? '...'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
  
                <div className="mt-6 text-right">
                  <Button onClick={() => setActiveTab("detailed")}>
                    View Detailed Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="detailed">
            <div className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Trip Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">Duration</h4>
                    </div>
                    <p className="text-lg font-semibold">
                      {itinerary?.summary?.total_days ?? '...'} days
                      <span className="block text-sm font-normal text-gray-500 mt-1">
                        {format(itinerary?.detailed_plan[0]?.date, 'MMM d')} - {format(itinerary?.detailed_plan[itinerary?.detailed_plan.length - 1]?.date, 'MMM d, yyyy')}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">Major Destinations</h4>
                    </div>
                    <p className="text-lg font-semibold">
                      {destinations.length} cities
                      <span className="block text-sm font-normal text-gray-500 mt-1">
                        {destinations.map(d => d.name?.split(',')[0] || 'Unknown').join(', ')}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="h-5 w-5 text-blue-600" >₹ </p>
                      <h4 className="font-medium">₹Total Budget</h4>
                    </div>
                    <p className="text-lg font-semibold">
                      ₹{itinerary?.summary?.estimated_cost}
                      <span className="block text-sm font-normal text-gray-500 mt-1">
                        All inclusive estimate
                      </span>
                    </p>
                  </div>
                </div>
              </div>
  
              {itinerary?.detailed_plan.map((day, index) => (
                <Card key={day.day} className="overflow-hidden">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" /> 
                      Day {day?.day} - {format(day?.date, 'EEEE, MMMM d, yyyy')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-semibold">{day?.heading}</h3>
                    </div>
  
                    <div className="mb-8">
                      <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-blue-600" /> Meal Plan
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Breakfast</h5>
                          {/* <p><span className="text-gray-600">Where:</span> {day?.meal_plan?breakfast?.where.join(' or ')}</p> */}
                          {/* // <p><span className="text-gray-600">When:</span> {day.mealPlan.breakfast.when}</p> */}
                          <p><span className="text-gray-600">Options:</span> {day?.meal_plan?.breakfast}</p>
                          {/* <p><span className="text-gray-600">Price:</span> ${day.mealPlan.breakfast.price}</p> */}
                        </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Lunch</h5>
                          {/* <p><span className="text-gray-600">Where:</span> {day.mealPlan.lunch.where.join(' or ')}</p> */}
                          {/* <p><span className="text-gray-600">When:</span> {day.mealPlan.lunch.when}</p> */}
                          <p><span className="text-gray-600">Options:</span> {day?.meal_plan?.lunch}</p>
                          {/* <p><span className="text-gray-600">Price:</span> ${day.mealPlan.lunch.price}</p> */}
                        </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Dinner</h5>
                          {/* <p><span className="text-gray-600">Where:</span> {day.mealPlan.dinner.where.join(' or ')}</p> */}
                          {/* <p><span className="text-gray-600">When:</span> {day.mealPlan.dinner.when}</p> */}
                          <p><span className="text-gray-600">Options:</span> {day?.meal_plan?.dinner}</p>
                          {/* <p><span className="text-gray-600">Price:</span> ${day.mealPlan.dinner.price}</p> */}
                        </div>
                      </div>
                    </div>
  
                    <div>
                      <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" /> Places & Activities
                      </h4>
                      <div className="space-y-6">
                        {day?.activities.map((activity, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h5 className="font-medium text-lg mb-2">{activity?.place}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="flex items-center gap-2 mb-2">
                                  <Camera className="h-4 w-4 text-gray-500" />
                                  <span className="text-gray-600">Photos:</span> {activity?.photo}
                                </p>
                                <p className="flex items-center gap-2 mb-2">
                                  <p className="h-4 w-4 text-gray-500" >₹</p>
                                  <span className="text-gray-600">Entry:</span> {activity?.entry}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <h6 className="font-medium mb-1">Main Attractions:</h6>
                              <p className="flex items-center gap-2 mb-2">
                                  <span className="text-black">{activity?.main_attraction}</span> 
                                </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
  
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <p className="font-medium">Daily Budget: ₹{itinerary?.summary?.plan_table[index]?.one_day_cost}</p>

                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{day?.tips}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
  
              <div className="flex justify-end mt-8">
                <Button 
                  onClick={handleFinalize} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Finalize Itinerary <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
//   export default Itinerary;
  

export default Itinerary;
