"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createTripService } from "../services/BudgetServices"

interface ItineraryItem {
  time: string
  activity: string
  day: string
}

export function AddTripModal({ isOpen, onClose, fetchTrips }: { isOpen: boolean; onClose: () => void, fetchTrips: () => void }) {
  const [destination, setDestination] = useState("")
  const [country, setCountry] = useState("")
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { time: "", activity: "", day: "" },
  ])
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const addItineraryItem = () => {
    setItinerary([...itinerary, { time: "", activity: "", day: "" }])
  }

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: string) => {
    const newItinerary = [...itinerary]
    newItinerary[index][field] = value
    setItinerary(newItinerary)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      destination,
      country,
      duration: parseInt(duration),
      date,
      description,
      itinerary
    }
    // Add your form submission logic here
    const jwttoken = localStorage.getItem('token')
    
    const response = createTripService(data, jwttoken)
    await fetchTrips();
    console.log(response)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#1a1b26] border-gray-800 text-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-semibold">
                <Input
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-none text-xl font-semibold placeholder:text-gray-400"
                />
              </DialogTitle>
              <Input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent border-none text-gray-400 placeholder:text-gray-500"
              />
              <Input
                placeholder="Duration (days)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent border-gray-700 text-gray-300 mt-2"
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-gray-700 text-gray-300 mt-2"
              />
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-transparent border-gray-700 text-gray-300 mt-2"
              />
            </div>
            
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="grid grid-cols-[75px,1fr,3fr] gap-4">
                <Input
                  placeholder="Day"
                  value={item.day}
                  onChange={(e) => updateItineraryItem(index, "day", e.target.value)}
                  className="bg-transparent border-gray-700 text-gray-300"
                />
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) => updateItineraryItem(index, "time", e.target.value)}
                  className="bg-transparent border-gray-700 text-gray-300"
                />
                <Input
                  placeholder="Activity"
                  value={item.activity}
                  onChange={(e) => updateItineraryItem(index, "activity", e.target.value)}
                  className="bg-transparent border-gray-700 text-gray-300"
                />
                
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={addItineraryItem}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Add Activity
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Trip
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

