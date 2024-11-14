import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import Header from "../components/Header.jsx"

const trips = [
  {
    id: 1,
    destination: 'Paris',
    country: 'France',
    duration: '1 Day',
    date: '2024-06-15',
    description: 'Explore the City of Light in just one day!',
    itinerary: [
      { time: '9:00 AM', activity: 'Arrival in Paris' },
      { time: '9:30 AM', activity: 'Visit the Galeries Lafayette' },
      { time: '11:00 AM', activity: 'Take in the views of the Eiffel Tower' },
      { time: '12:00 PM', activity: 'Lunchtime' },
      { time: '1:00 PM', activity: 'The Louvre Museum' },
      { time: '4:00 PM', activity: 'Seine River Cruise' },
      { time: '6:00 PM', activity: 'Explore Montmartre' },
      { time: '8:00 PM', activity: 'Dinner' },
      { time: '10:00 PM', activity: 'Return to Brussels' },
    ]
  },
  {
    id: 2,
    destination: 'Rome',
    country: 'Italy',
    duration: '3 Days',
    date: '2024-07-20',
    description: 'Discover the Eternal City\'s ancient wonders.',
    itinerary: []
  },
  {
    id: 3,
    destination: 'Tokyo',
    country: 'Japan',
    duration: '5 Days',
    date: '2024-09-10',
    description: 'Experience the perfect blend of tradition and modernity.',
    itinerary: []
  }
]

function ItineraryModal({ isOpen, onClose, trip }) {
  if (!trip) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>{trip.destination} Itinerary</DialogTitle>
          <DialogDescription className="text-gray-400">{trip.country}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          {trip.itinerary.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-300">{item.time}</h3>
              <p className="text-sm text-gray-400">{item.activity}</p>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function LogTripPage() {
    const [selectedTrip, setSelectedTrip] = useState(null)

  const openItinerary = (trip) => {
    setSelectedTrip(trip)
  }

  const closeItinerary = () => {
    setSelectedTrip(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-8 flex justify-between items-center">
        <Header></Header>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip.id} className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-100">
                  <MapPin className="mr-2 text-blue-600" />
                  {trip.destination}
                </CardTitle>
                <CardDescription className="text-gray-400">{trip.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">{trip.description}</p>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Clock className="mr-2 h-4 w-4 text-blue-600" />
                  {trip.duration}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                  {trip.date}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-600 text-white" onClick={() => openItinerary(trip)}>View Itinerary</Button>
              </CardFooter>
            </Card>
          ))}
          <Card className="bg-gray-800 border-gray-700 text-white flex flex-col justify-center items-center p-6">
            <PlusCircle className="h-12 w-12 text-blue-600 mb-4" />
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">Add New Trip</Button>
          </Card>
        </div>
      </main>
      <ItineraryModal
        isOpen={!!selectedTrip}
        onClose={closeItinerary}
        trip={selectedTrip}
      />
    </div>
  )
}

export default LogTripPage;