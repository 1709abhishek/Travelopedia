"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'
import { useState } from "react"
import { createTripService } from "../services/BudgetServices"

interface ItineraryItem {
  time: string
  activity: string
}

export function AddTripModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [destination, setDestination] = useState("")
  const [country, setCountry] = useState("")
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { time: "", activity: "" }
  ])
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const addItineraryItem = () => {
    setItinerary([...itinerary, { time: "", activity: "" }])
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
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="grid grid-cols-[100px,1fr] gap-4">
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

