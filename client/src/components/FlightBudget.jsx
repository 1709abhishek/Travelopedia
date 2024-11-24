import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBudgets } from "@/hooks/useBudgets";
import { ClipLoader } from "react-spinners";
import BudgetProcess from "./BudgetProcess";
import FlightList from "./FlightList";
import { toast } from "react-toastify";

const temp_flights = [
  {
    departureAirportName: "John F. Kennedy International Airport",
    departureAirportId: "JFK",
    departureTime: "2024-12-15 09:00",
    arrivalAirportName: "Los Angeles International Airport",
    arrivalAirportId: "LAX",
    arrivalTime: "2024-12-15 12:20",
    duration: 380,
    airplane: "Airbus A320",
    airline: "JetBlue",
    airlineLogo: "https://www.gstatic.com/flights/airline_logos/70px/B6.png",
    travelClass: "Economy",
    flightNumber: "B6 223",
    legroom: "32 in",
    extensions: null,
    totalDuration: 380,
    carbonEmissions: 0,
    price: 672,
    tripType: "Round trip",
    departureToken: null,
  },
  {
    departureAirportName: "John F. Kennedy International Airport",
    departureAirportId: "JFK",
    departureTime: "2024-12-15 06:58",
    arrivalAirportName: "Los Angeles International Airport",
    arrivalAirportId: "LAX",
    arrivalTime: "2024-12-15 10:20",
    duration: 382,
    airplane: "Airbus A321 (Sharklets)",
    airline: "American",
    airlineLogo: "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
    travelClass: "Economy",
    flightNumber: "AA 1",
    legroom: "31 in",
    extensions: null,
    totalDuration: 382,
    carbonEmissions: 0,
    price: 687,
    tripType: "Round trip",
    departureToken: null,
  },
  {
    departureAirportName: "John F. Kennedy International Airport",
    departureAirportId: "JFK",
    departureTime: "2024-12-15 08:40",
    arrivalAirportName: "Los Angeles International Airport",
    arrivalAirportId: "LAX",
    arrivalTime: "2024-12-15 12:06",
    duration: 386,
    airplane: "Boeing 767",
    airline: "Delta",
    airlineLogo: "https://www.gstatic.com/flights/airline_logos/70px/DL.png",
    travelClass: "Economy",
    flightNumber: "DL 713",
    legroom: "31 in",
    extensions: null,
    totalDuration: 386,
    carbonEmissions: 0,
    price: 727,
    tripType: "Round trip",
    departureToken: null,
  },
];

const spinnerStyle = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};

const spinnerContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  color: "white",
};

const FlightBudget = ({ trip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const { getFlights, createFlightBudget, refreshBudgets } = useBudgets();

  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return "";
    const start = new Date(startDate);
    if (isNaN(start)) return "";
    const durationDays = parseInt(duration.split(" ")[0], 10);
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays);
    return end.toISOString().split("T")[0];
  };
  
  useEffect(() => {
    if (trip.date && trip.duration) {
      setDepartureDate(trip.date);
      setArrivalDate(calculateEndDate(trip.date, trip.duration));
    }
  }, []);

  const handleFlightSelect = (flight) => {
    if (
      selectedItems.some((item) => item.flightNumber === flight.flightNumber)
    ) {
      setSelectedItems(
        selectedItems.filter(
          (item) => item.flightNumber !== flight.flightNumber
        )
      );
    } else {
      setSelectedItems([...selectedItems, flight]);
    }
  };

  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const handleSearch = async () => {
    if (!from || !to || !departureDate || !arrivalDate || !adults) {
      alert("Please fill in all fields.");
      return;
    }

    const start = new Date(departureDate);
    const end = new Date(arrivalDate);

    if (end < start) {
      alert("End date should not be before start date.");
      return;
    }

    const fromCode = "LAX";
    const toCode = "JFK";

    if (fromCode && toCode) {
      const inputs = {
        departure: fromCode,
        arrival: toCode,
        departureDate,
        arrivalDate,
        adults,
      };
      console.log(inputs);
      const flightsData = await getFlights(inputs);
      setFlights(flightsData);
      setShowSearch(true);
    } else {
      alert("Invalid city name.");
    }
  };

  const handleSave = async () => {
    setLoading(true); 
    try {
      let data = {
        itineraryID: 104,
        type: "flight",
        price: totalPrice,
        items: selectedItems,
      };
  
      console.log("Flights data:", data);
  
      const result = await createFlightBudget(data);
      console.log(result['success']);
      if (result.success) { 
        console.log("Flights saved:", result);
        refreshBudgets(); 
        toast.success("Budget saved successfully!");
      } else {
        toast.error(result.message || "Failed to save budget");
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      toast.error("An error occurred while saving the budget");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ScrollArea className="h-[40vh] w-full pr-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  type="date"
                  id="departureDate"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="arrivalDate">Arrival Date</Label>
                <Input
                  type="date"
                  id="arrivalDate"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="from">From</Label>
                <Input
                  type="text"
                  id="from"
                  placeholder="Enter city name"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="to">To</Label>
                <Input
                  type="text"
                  id="to"
                  placeholder="Enter city name"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="adults">Adults</Label>
                <Input
                  type="number"
                  id="adults"
                  min="1"
                  max="4"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Search Flights
              </Button>
            </div>
            {showSearch && (
              <FlightList
                flights={flights}
                onSelect={handleFlightSelect}
                selectedItems={selectedItems}
              />
            )}
          </ScrollArea>
        );
      case 2:
        return (
          <ScrollArea className="h-[40vh] w-full pr-4">
            <div className="space-y-4">
              <h4 className="italic">Selected Flights</h4>
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-gray-800 rounded-lg"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() =>
                      setSelectedItems(
                        selectedItems.filter(
                          (flight) => flight.flightNumber !== item.flightNumber
                        )
                      )
                    }
                  >
                    &times;
                  </button>
                  <h4>
                    {item.airline} - {item.flightNumber}
                  </h4>
                  <p className="text-gray-400">Price: ${item.price}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        );
      case 3:
        return (
          <ScrollArea className="h-[40vh] w-full pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Confirm and Save</h3>
              <div className="p-4 bg-gray-800 rounded-lg text-center">
                <p className="text-2xl font-bold">${totalPrice}</p>
                <p className="text-lg mt-2">Total Budget</p>
              </div>
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <span>
                      {item.airline} - {item.flightNumber}
                    </span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        );
    }
  };

  return (
    <div>
      <BudgetProcess step={currentStep} />
      {renderStepContent()}
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="bg-gray-700 hover:bg-gray-600"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (currentStep === 3) {
              handleSave();
            } else {
              setCurrentStep(Math.min(3, currentStep + 1));
            }
          }}
          disabled={selectedItems.length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === 3 ? "Save" : "Next"}
        </Button>
      </div>
      {loading && (
        <div style={spinnerContainerStyle}>
          <ClipLoader
            color="#ffffff"
            cssOverride={spinnerStyle}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

FlightBudget.propTypes = {
  trip: PropTypes.shape({
    destination: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default FlightBudget;
