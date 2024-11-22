import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function CustomBudget(){
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(""); 

    const handleSave = () => {
        console.log("Item Name:", itemName, "Price:", price);
    };

    return (   
        <ScrollArea className="h-[60vh] w-full">
            <div className="p-4">
                <Label htmlFor="itemName" className="block text-sm font-medium">
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
                      className="bg-gray-800 border-gray-700 text-white p-2 rounded-md"
                    />
                  </div>
                <Button 
                    onClick={handleSave}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                    Save
                </Button>
            </div>
        </ScrollArea>
    );
}

export default CustomBudget;