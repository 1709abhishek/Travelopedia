import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Groq } from 'groq-sdk';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { createTripService } from "../services/BudgetServices";
import { addChatMessage, createConversation } from '../services/RecommendationServices';
import Header from "./Header";
import StructuredItinerary from "./StructuredItinerary";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true })

const interests = [
  { id: "art", label: "Art", group: 1 },
  { id: "museums", label: "Museums", group: 1 },
  { id: "nightlife", label: "Nightlife", group: 1 },
  { id: "sports", label: "Sports", group: 1 },
  { id: "food", label: "Food", group: 2 },
  { id: "music", label: "Music", group: 2 },
  { id: "shopping", label: "Shopping", group: 2 },
  { id: "history", label: "History", group: 3 },
  { id: "natural-parks", label: "Natural Parks", group: 3 },
  { id: "sightseeing", label: "Sightseeing", group: 3 },
]

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  days: z.string().min(1, "Number of days is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  privacy: z.enum(["public", "private"]),
})

export default function CreateItinerary() {
  const [loading, setLoading] = useState(false)
  const [generatedItinerary, setGeneratedItinerary] = useState("")
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      privacy: "public",
    },
  })

  async function onSubmit(values) {
    setLoading(true)
    try {
      const jwt = localStorage.getItem('token')
      if (!jwt) {
        throw new Error('No JWT token found')
      }

      const newConversation = await createConversation(jwt, values.title)
      
      const prompt = `Create a ${values.days}-day itinerary for a trip to ${values.title}. 
        Include activities related to ${values.interests.join(', ')}.
        Format the itinerary with **Day X:** headers and activities for each day.`

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null
      })

      let itinerary = ""
      for await (const chunk of chatCompletion) {
        itinerary += chunk.choices[0]?.delta?.content || ""
      }

      setGeneratedItinerary(itinerary)

      await addChatMessage(jwt, newConversation.conversationId, { role: 'assistant', content: itinerary })

    } catch (error) {
      console.error('Error generating itinerary:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExploreMore = () => {
    navigate('/explore?tab=create');
  }

  const handleAddLogTrip = async () => {
    const prompt = `Generate a JSON-formatted trip itinerary for the given ${generatedItinerary}. The JSON should have the following structure:

{
  "destination": "City, Country",
  "country": "Country",
  "description": "A brief description of the trip",
  "duration": given duration,
  "date": "YYYY-MM-DD",
  "itinerary": [
    { "day": "1", "time": "HH:MM", "activity": "Description of activity" },
    ...
  ]
}

Requirements:
1. The destination should be given.
2. Provide a concise description of the trip's theme or focus.
3. Set the date to the current date.
4. Times should be in 24-hour format (e.g., "14:00" for 2 PM).
5. Ensure the JSON is properly formatted and valid.
6. Ensure the duration is a number.

Please generate a complete itinerary JSON for the given generated itinerary. Only return the JSON, no additional text.`

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null
      })
      let itineraryJson = ""
      for await (const chunk of chatCompletion) {
        itineraryJson += chunk.choices[0]?.delta?.content || ""
      }
      // Clean up the response: remove any non-JSON content
    let responseContent = itineraryJson.replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1');
    console.log('Cleaned response:', responseContent);

    const itineraryJsonCleaned = JSON.parse(responseContent);
    console.log('Parsed JSON:', itineraryJsonCleaned);

    await createTripService(itineraryJsonCleaned, localStorage.getItem('token'));
    navigate('/log-trip');

    }

      

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <Header />
      <div className="mx-auto flex-1 container px-4 py-8 mt-14">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create AI Itinerary</h1>
              <p className="text-gray-400">
                Unlock seamless and precise travel planning, tailored to your every need.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Place</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the place you want to visit"
                          className="bg-gray-800 border-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Select number of days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day} {day === 1 ? 'day' : 'days'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((group) => (
                          <div key={group} className="space-y-4">
                            {interests
                              .filter((interest) => interest.group === group)
                              .map((interest) => (
                                <FormField
                                  key={interest.id}
                                  control={form.control}
                                  name="interests"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={interest.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 text-white"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                            checked={field.value?.includes(interest.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, interest.id])
                                                : field.onChange(
                                                    field.value?.filter((value) => value !== interest.id)
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {interest.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Generating...' : 'Create'}
                  </Button>
  
                </div>
              </form>
            </Form>

            {generatedItinerary && (
              <div className="mt-8">
                <div className="flex space-x-4">
                <h2 className="text-2xl font-bold mb-4">Generated Itinerary</h2>
                <Button type="button" onClick={handleExploreMore} className="bg-blue-600 hover:bg-blue-700">
                    Explore More
                  </Button>
                  <Button type="button" onClick={handleAddLogTrip} className="bg-blue-600 hover:bg-blue-700">
                    Add to Log Trip
                  </Button>
                </div>
                <StructuredItinerary itinerary={generatedItinerary} />
              </div>
            )}
            <style jsx>{`
              .checkbox-icon {
                color: white !important;
              }
            `}</style>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

