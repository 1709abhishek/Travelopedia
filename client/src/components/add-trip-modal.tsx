"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createTripService, updateTripService } from "../services/BudgetServices"
import { toast } from "react-toastify"

interface ItineraryItem {
  time: string
  activity: string
  day: string
}

export function AddTripModal({ isOpen, onClose, fetchTrips, trip }: { isOpen: boolean; onClose: () => void, fetchTrips: () => void, trip?: any }) {
  const [destination, setDestination] = useState(trip?.destination || "")
  const [country, setCountry] = useState(trip?.country || "")
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(trip?.itinerary || [{ time: "", activity: "", day: "" }])
  const [duration, setDuration] = useState(trip?.duration || "")
  const [date, setDate] = useState(trip?.date || "")
  const [description, setDescription] = useState(trip?.description || "")

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
    const jwttoken = localStorage.getItem('token')
    try {
      if (trip) {
        // Update existing trip
        await updateTripService(jwttoken, trip.id, data)
        toast.success("Trip updated successfully!")
      } else {
        // Create new trip
        await createTripService(data, jwttoken)
        toast.success("Trip created successfully!")
        onClose()
      }
      await fetchTrips()
    } catch (error) {
      toast.error("An error occurred while saving the trip.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white sm:max-w-[600px] sm:p-8 p-4 max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-semibold">
                <Input
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-gray-700 text-gray-300 mt-2"
                />
              </DialogTitle>
              <Input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent border-gray-700 text-gray-300 mt-2"
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Activity
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {trip ? "Update Trip" : "Save Trip"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

