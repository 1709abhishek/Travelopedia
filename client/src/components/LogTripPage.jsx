import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin, PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AddTripModal } from "../components/add-trip-modal.tsx";
import { BudgetModal } from "../components/BudgetModel.jsx";
import Header from "../components/Header.jsx";
import {
  deleteTripService,
  getTripsService,
} from "../services/BudgetServices.jsx";
import { useBudgets } from "@/hooks/useBudgets";
import Footer from "./Footer";

function ItineraryModal({ isOpen, onClose, trip }) {
  if (!trip) return null;

  // Sort and group itinerary items by day
  const groupedItinerary = trip.itinerary.reduce((acc, item) => {
    const day = item.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});

  // Sort days numerically
  const sortedDays = Object.keys(groupedItinerary).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>{trip.destination} Itinerary</DialogTitle>
          <DialogDescription className="text-gray-400">
            {trip.country}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          {sortedDays.map((day) => (
            <div key={day} className="mb-6">
              <h2 className="text-lg font-bold text-white mb-2">Day {day}</h2>
              {groupedItinerary[day].map((item, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-300">
                    {item.time}
                  </h3>
                  <p className="text-sm text-gray-400">{item.activity}</p>
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
ItineraryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trip: PropTypes.object,
};

function LogTripPage() {
  const { deleteItinerary } = useBudgets();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isOpenBudget, setIsOpenBudget] = useState(false);
  const [isOpenItinerary, setIsOpenItinerary] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    try {
      const jwt = localStorage.getItem("token");
      const response = await getTripsService(jwt);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [isAddModalOpen]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const openItinerary = (trip) => {
    setSelectedTrip(trip);
    setIsOpenItinerary(true);
  };

  const openBudget = (trip) => {
    setSelectedTrip(trip);
    setIsOpenBudget(true);
  };

  const closeBudget = () => {
    setIsOpenBudget(false);
    setSelectedTrip(null);
  };

  const closeItinerary = () => {
    setSelectedTrip(null);
    setIsOpenItinerary(false);
  };

  const onDeleteTrip = async (id) => {
    try {
      const jwt = localStorage.getItem("token");
      await deleteTripService(jwt, id);
      await deleteItinerary(id);
      await fetchTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const openEditModal = (trip) => {
    setTripToEdit(trip);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTripToEdit(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    console.log("Trips:", trips);
  }, [trips.length]);

  return (
    <div>
      <div className="min-h-screen bg-black text-white">
        <header className="bg-gray-900 py-8 flex justify-between items-center">
          <Header></Header>
        </header>
        {isLoading ? (
          <div className="text-center">Loading trips...</div>
        ) : (
          <main className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips
                ? trips.map((trip) => (
                    <Card
                      key={trip.id}
                      className="bg-gray-800 border-gray-700 text-white"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center text-gray-100">
                          <MapPin className="mr-2 text-blue-600" />
                          {trip.destination}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {trip.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-4">
                          {trip.description}
                        </p>
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
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-600 text-white"
                          onClick={() => openItinerary(trip)}
                        >
                          View Itinerary
                        </Button>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-600 text-white"
                          onClick={() => openBudget(trip)}
                        >
                          View Budget
                        </Button>
                        <div className="w-full flex space-x-2">
                          <Button
                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                            onClick={() => openEditModal(trip)}
                          >
                            Edit Trip
                          </Button>
                          <Button
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => onDeleteTrip(trip.id)}
                          >
                            Delete Trip
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                : null}
              <Card className="bg-gray-800 border-gray-700 text-white flex flex-col justify-center items-center p-6">
                <PlusCircle className="h-12 w-12 text-blue-600 mb-4" />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add New Trip
                </Button>
                <AddTripModal
                  isOpen={isAddModalOpen}
                  fetchTrips={fetchTrips}
                  onClose={() => setIsAddModalOpen(false)}
                />
              </Card>
            </div>
          </main>
        )}
        <ItineraryModal
          isOpen={isOpenItinerary}
          onClose={closeItinerary}
          trip={selectedTrip}
          fetchTrips={fetchTrips}
        />
        <BudgetModal
          isOpen={isOpenBudget}
          onClose={closeBudget}
          trip={selectedTrip}
        />
        {tripToEdit && (
          <AddTripModal
            isOpen={isEditModalOpen}
            fetchTrips={fetchTrips}
            onClose={closeEditModal}
            trip={tripToEdit}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LogTripPage;
