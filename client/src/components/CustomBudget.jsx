import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBudgets } from "@/hooks/useBudgets";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

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

function CustomBudget({ trip }){
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(""); 
    const { createCustomBudget, refreshBudgets } = useBudgets();
    const [loading, setLoading] = useState(false);
    
    const handleSave = () => {
        setLoading(true);
        let data = {
            "itineraryID": trip.id,
            "type": "custom",
            "name": itemName,
            "price": price
        };
        console.log("Custom data:", data);
        createCustomBudget(data);
        refreshBudgets();
        setLoading(false);
        console.log("Item Name:", itemName, "Price:", price);
        toast.success("Custom budget saved successfully!");
    };

    return (   
        <ScrollArea className="h-[60vh] w-full">
            <div className="p-4 md:p-8">
                <Label htmlFor="itemName" className="block text-sm font-medium pt-8">
                    Item Name
                </Label>
                <Input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-800 border-gray-700"
                />
                <Label htmlFor="price" className="block text-sm font-medium mt-4">
                    Price
                </Label>
                <div className="flex items-center mt-2">
                    <span className="text-white mr-2">$</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="0.01" 
                      step="0.01"
                      className="bg-gray-800 border-gray-700 text-white p-2 rounded-md w-full md:w-auto"
                    />
                  </div>
                <Button 
                    onClick={handleSave}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                >
                    Save
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
        </ScrollArea>
    );
}
CustomBudget.propTypes = {
    trip: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default CustomBudget;