/** @format */

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Cake,
  MapPin,
  Users,
  Home,
  Plane,
  Train,
  Car,
  Ship,
  Bus,
  Hotel,
  Utensils,
  DollarSign,
  Star,
  ArrowRight,
} from "lucide-react";


import { sendUserPreferences } from "@/services/api";



const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  age: z.coerce.number().min(0).max(120, {
    message: "Please enter a valid age.",
  }),

  travelState: z.string().min(1, { message: "Please select your state." }),
  travelCountry: z.string().min(1, { message: "Please enter your country." }),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender.",
  }),

  religion: z.enum(["hindu", "muslim", "christian", "other"], {
    required_error: "Please select your religion.",
  }),

  travelDuration: z.union([
    z.object({
      numberOfDays: z.coerce.number().min(1, {
        message: "Enter a valid number of days.",
      }),
    }),
  ]),

  tags: z
    .array(z.string())
    .min(1, { message: "Please select at least one tag." }),

  numberOfPeople: z.coerce.number().min(1).max(100, {
    message: "Please enter a valid number of people.",
  }),

  tripType: z.enum(["family", "alone", "friends", "school", "college", "other", "couple", "corporate"], {
    required_error: "Please select your trip type.",
  }),

  restType: z.string().min(1, { message: "Please enter your hotel preferences." }),

  travelType: z.enum(["personal", "flights", "train", "bus", "cruise", "mix"], {
    required_error: "Please select your travel type.",
  }),

  foodType: z.enum(["veg", "nonveg", "both"], {
    required_error: "Please select your food preference.",
  }),

  budget: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
    })
    .refine((data) => data.max > data.min, {
      message: "Maximum budget must be greater than minimum budget.",
      path: ["max"],
    }),

  shoppingInterest: z
    .array(z.string()),

  specialChoices: z.string().optional(),
});







const UserPreferences = ({ onSubmit, setFoundMajorPlaces, setPlanId }) => {





  // Default values in useForm
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      travel_state: "",
      travel_country: "",
      gender: undefined,
      religion: undefined,
      travelDuration: {
        numberOfDays: 3, // or { startDate: "", endDate: "" }
      },
      tags: [],
      numberOfPeople: 1,
      tripType: undefined,
      restType: "",
      travelType: undefined,
      foodType: undefined,
      budget: {
        min: 1000,
        max: 10000,
      },
      shoppingInterest: [],
      specialChoices: "",
    },
  });
  

    const handleSubmit = async (data) => {

      "Step 1 - Sendng user preferecne..."
      console.log("Form data:", data);
      try {
        const resData = await sendUserPreferences(data)

      

        setFoundMajorPlaces(resData.places)
        setPlanId(resData.plan_id)
        
      } catch (error) {
        console.error("While Sending User Preferences to backend", error);
        
      }
      onSubmit(data);
      console.log("Step 1 - Sending Done---");
      
    };


  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Cake className="h-4 w-4" /> Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Your age"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />travel State
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="travel state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>travel Country</FormLabel>
                      <FormControl>
                        <Input placeholder="travel country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Gender
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Other
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Religion
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your religion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hindu">Hindu</SelectItem>
                          <SelectItem value="muslim">Muslim</SelectItem>
                          <SelectItem value="christian">Christian</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <FormField
                control={form.control}
                name="travelDuration.numberOfDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Days</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of days"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="flex items-center gap-2">
                        <Star className="h-4 w-4" /> Tags / Interests 
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('romantic')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'romantic'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'romantic'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Romantic
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('culture')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'culture'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'culture'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Culture
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('food')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'food'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'food'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Food
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />

<FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('Adventure')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'Adventure'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'Adventure'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Adventure
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />

<FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('Wildlife')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'Wildlife'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'Wildlife'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Wildlife
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />

<FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('History')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'History'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'History'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              History
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />

<FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('Religious')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'Religious'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'Religious'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Religious
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Number of Travelers  */}
                <FormField
                  control={form.control}
                  name="numberOfPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Number of Travelers
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              
              {/* Type of Trip = Family, SOLO etc  */}
              <FormField
                  control={form.control}
                  name="tripType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Type of Trip
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trip type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="alone">Solo</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="school">School or College</SelectItem>
                          <SelectItem value="couple">Couple</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rest Type  */}
                <FormField
                  control={form.control}
                  name="restType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hotel className="h-4 w-4" /> Rest type (Hotel preferences)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Hotel preferences" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  {/* Travel Type = Mode  */}
                <FormField
                  control={form.control}
                  name="travelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Plane className="h-4 w-4" /> Travel Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select travel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4" /> Personal vehicle
                            </div>
                          </SelectItem>
                          <SelectItem value="flights">
                            <div className="flex items-center gap-2">
                              <Plane className="h-4 w-4" /> Start-End Flights
                            </div>
                          </SelectItem>
                          <SelectItem value="train">
                            <div className="flex items-center gap-2">
                              <Train className="h-4 w-4" /> Train
                            </div>
                          </SelectItem>
                          <SelectItem value="bus">
                            <div className="flex items-center gap-2">
                              <Bus className="h-4 w-4" /> Bus
                            </div>
                          </SelectItem>
                          <SelectItem value="cruise">
                            <div className="flex items-center gap-2">
                              <Ship className="h-4 w-4" /> Cruise
                            </div>
                          </SelectItem>
                          <SelectItem value="mix">
                            <div className="flex items-center gap-2">
                              <Ship className="h-4 w-4" /> Mix
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Food Type  */}
                <FormField
                  control={form.control}
                  name="foodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" /> Food Type
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="veg" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Vegetarian
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="nonveg" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Non-vegetarian
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="both" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Both
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


                  {/* Budget Range  */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 mb-6">
                      <DollarSign className="h-4 w-4" /> Budget Range
                    </FormLabel>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>₹{field.value.min}</span>
                        <span>₹{field.value.max}</span>
                      </div>
                      <FormControl>
                        <Slider
                          
                          defaultValue={[field.value.min, field.value.max]}
                          min={10000}
                          max={1000000}
                          step={100}
                          onValueChange={(values) => {
                            field.onChange({
                              min: values[0],
                              max: values[1]
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* shoppingInterest = Multi Selection  */}
              <FormField
                control={form.control}
                name="shoppingInterest"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="flex items-center gap-2">
                        <Star className="h-4 w-4" />  Shopping Interest
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      
                      
                    <FormField
                        control={form.control}
                        name="shoppingInterest"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('localmarkets')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'localmarkets'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'localmarkets'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Local Markets
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />


                      <FormField
                        control={form.control}
                        name="shoppingInterest"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('luxurybrands')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'luxurybrands'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'luxurybrands'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Luxury Brands
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />


                      <FormField
                        control={form.control}
                        name="shoppingInterest"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('notinterested')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, 'notinterested'])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== 'notinterested'
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              Not Interested
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

                {/* Special Choices */}
              <FormField
                control={form.control}
                name="specialChoices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Star className="h-4 w-4" /> Special Choices	
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or preferences... [Specific Places, Activities (like Trekking, Desert Safari), Food, Meetups, Festivals]"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


                
                <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-travel-600 hover:bg-travel-700 cursor-pointer bg-teal-600 hover:bg-teal-700"
                >
                  Find Destinations <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferences;
