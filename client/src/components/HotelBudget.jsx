import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HotelList from "./HotelList";
import { useBudgets } from "@/hooks/useBudgets";
import cityCodes from "@/resources/cityCodes.json";
import { ClipLoader } from "react-spinners";
import BudgetProcess from "./BudgetProcess";
import { toast } from "react-toastify";

// const temp_hotels = [
//   {
//     hotelName: "Courtyard by Marriott Mumbai International Airport",
//     hotelId: "CYBOMCYC",
//     cityCode: "BOM",
//     price: 672600.0,
//     available: true,
//     currency: "INR",
//   },
//   {
//     hotelName: "HOLIDAY INN MUMBAI INTL ARPT",
//     hotelId: "HIBOMD98",
//     cityCode: "BOM",
//     price: 474773.0,
//     available: true,
//     currency: "INR",
//   },
//   {
//     hotelName: "HILTON MUMBAI INTERNATIONAL AIRPORT",
//     hotelId: "HLBOM440",
//     cityCode: "BOM",
//     price: 620798.12,
//     available: true,
//     currency: "INR",
//   },
//   {
//     hotelName: "Hyatt Regency Mumbai",
//     hotelId: "HYBOMMUM",
//     cityCode: "BOM",
//     price: 339150.0,
//     available: true,
//     currency: "INR",
//   },
// ];

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

const HotelBudget = ({ trip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [city, setCity] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [hotels, setHotels] = useState();
  const [loading, setLoading] = useState(false);
  const { getHotels, createHotelBudget, refreshBudgets } = useBudgets();
  const [totalPrice, setTotalPrice] = useState(0);

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
      setCity(trip.destination);
      setStartDate(trip.date);
      setEndDate(calculateEndDate(trip.date, trip.duration));
    }
  }, []);

  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const handleHotelSelect = (hotel) => {
    const hotelWithDatesAndGuests = {
      ...hotel,
      startDate,
      endDate,
      guests,
    };
  
    if (selectedItems.some((item) => item.hotelId === hotel.hotelId)) {
      setSelectedItems(
        selectedItems.filter((item) => item.hotelId !== hotel.hotelId)
      );
    } else {
      setSelectedItems([...selectedItems, hotelWithDatesAndGuests]);
    }
  };

  const handleSearch = async () => {
    if (!city || !startDate || !endDate || !guests) {
      alert("Please fill in all fields.");
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end < start) {
      alert("End date should not be before start date.");
      return;
    }
  
    const cityCode =
      cityCodes.cities.find((c) => c.name.toLowerCase() === city.toLowerCase())
        ?.code || "";
  
    if (cityCode) {
      const inputs = {
        cityCode,
        checkInDate: startDate,
        checkOutDate: endDate,
        adults: guests,
        roomQuantity: Math.ceil(guests / 4),
      };
      console.log(inputs);
      // setHotels(temp_hotels);
      // setShowSearch(true);
      setLoading(true);
      const hotelsData = await getHotels(inputs);
      if (!hotelsData) {
        setLoading(false);
        return;
      }
      setHotels(hotelsData);
      setLoading(false);
      setShowSearch(true);
    } else {
      alert("Invalid city name.");
    }
  };

  const handleUnselectItem = (hotelId) => {
    setSelectedItems(selectedItems.filter((item) => item.hotelId !== hotelId));
  };

  const handlePriceChange = (hotelId, newPrice) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.hotelId === hotelId ? { ...item, price: newPrice } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
  
      let data = {
        itineraryID: 104,
        type: "hotel",
        price: totalPrice,
        items: selectedItems,
      };
  
      console.log("Hotels data:", data);
  
      const result = await createHotelBudget(data);
  
      if (result.success) {
        console.log("Hotels saved:", result);
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
          <>
          <ScrollArea className="h-[40vh] w-full pr-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  type="number"
                  id="guests"
                  min="1"
                  max="4"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </div>
            {showSearch && (
                <HotelList
                  hotels={hotels}
                  onSelect={handleHotelSelect}
                  selectedItems={selectedItems}
                />
              )}
              </ScrollArea>
          </>
        );
      case 2:
        return (
          <ScrollArea className="h-[40vh] w-full pr-4">
            <div className="space-y-4">
              <h4 className="italic">Customize Your Items</h4>
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-gray-800 rounded-lg"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => handleUnselectItem(item.hotelId)}
                  >
                    &times;
                  </button>
                  <h4>{item.hotelName}</h4>
                  <div className="flex items-center mt-2">
                    <span className="text-white mr-2">$</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handlePriceChange(
                          item.hotelId,
                          parseFloat(e.target.value)
                        )
                      }
                      min="0.01"
                      step="0.01"
                      className="bg-white-800 border-gray-700 text-white p-2 rounded"
                    />
                  </div>
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
                <p className="text-2xl font-bold">
                  ${totalPrice}
                </p>
                <p className="text-lg mt-2">Total Budget</p>
              </div>
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <span>{item.hotelName}</span>
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

HotelBudget.propTypes = {
  trip: PropTypes.shape({
    destination: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
export default HotelBudget;
