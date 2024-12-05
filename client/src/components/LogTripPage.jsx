import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AddTripModal } from "../components/add-trip-modal.tsx"
import { BudgetModal } from "../components/BudgetModel.jsx"
import Header from "../components/Header.jsx"
import { getTripsService } from "../services/BudgetServices.jsx"



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
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [isOpenBudget, setIsOpenBudget] = useState(false);
    const [isOpenItinerary, setIsOpenItinerary] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchTrips = async () => {
        // setIsLoading(true);
        try {
          const jwt = localStorage.getItem('jwt');
          const response = await getTripsService(jwt);
          setTrips(response.data);
        } catch (error) {
          console.error("Error fetching trips:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTrips();
    }, []);

    useEffect(() => {
      console.log('Trips:', trips);
    }, [trips]);


  const openItinerary = (trip) => {
    setSelectedTrip(trip)
    setIsOpenItinerary(true);
  }

  const openBudget = (trip) => {
    setSelectedTrip(trip);
    setIsOpenBudget(true);
  }

  const closeBudget = () => { 
    setIsOpenBudget(false);
    setSelectedTrip(null)
  }

  const closeItinerary = () => {
    setSelectedTrip(null)
    setIsOpenItinerary(false);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-8 flex justify-between items-center">
        <Header></Header>
      </header>
      {isLoading ? (
        <div className="text-center">Loading trips...</div>
      ) : (
      <main className="container mx-auto p-6">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips ? trips.map((trip) => (
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
              <CardFooter className="mt-auto flex flex-col space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-600 text-white" onClick={() => openItinerary(trip)}>View Itinerary</Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-600 text-white" onClick={() => openBudget(trip)}>View Budget</Button>
              </CardFooter>
            </Card>
          )): null}
          <Card className="bg-gray-800 border-gray-700 text-white flex flex-col justify-center items-center p-6">
            <PlusCircle className="h-12 w-12 text-blue-600 mb-4" />
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => setIsAddModalOpen(true)}>Add New Trip</Button>
            <AddTripModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
          </Card>
        </div>
      </main>)}
      <ItineraryModal
        isOpen={isOpenItinerary}
        onClose={closeItinerary}
        trip={selectedTrip}
      />
      <BudgetModal
        isOpen={isOpenBudget}
        onClose={closeBudget}
        trip={selectedTrip} />
    </div>
  )
}

export default LogTripPage;