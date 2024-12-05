import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBudgets } from "@/hooks/useBudgets";
import { toast } from "react-toastify";

function ExistingBudgets() {
  const { getBudgets, refreshFlag, deleteBudget } = useBudgets();
  const [budgets, setBudgets] = useState([]);
  
  const fetchBudgets = async () => {
    const data = await getBudgets(104);
    if (data) {
      setBudgets(data);
      // console.log(data);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [refreshFlag]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleDeleteBudget = async (budgetIndex) => {
    try {
      const budgetID = budgets[budgetIndex][0].budget.budgetID;
      const budgetType = budgets[budgetIndex][0].budget.type;
  
      console.log(`Deleting budget with ID: ${budgetID} and type: ${budgetType}`);
  
      const result = await deleteBudget(budgetID, budgetType);
  
      if (result.success) { 
        const newBudgets = budgets.filter((_, index) => index !== budgetIndex);
        setBudgets(newBudgets);
        toast.success("Budget deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete budget");
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("An error occurred while deleting the budget");
    }
  };

  const totalPrice = budgets.reduce((total, budgetGroup) => {
    return total + budgetGroup.reduce((groupTotal, item) => groupTotal + item.price, 0);
  }, 0).toFixed(2);

  return (
    <ScrollArea className="h-[60vh] w-full pt-16">
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p className="text-2xl font-bold">${totalPrice}</p>
          <p className="text-lg mt-2">Total Itinerary Budget</p>
        </div>
        {budgets.length === 0 ? (
          <div className="p-4 bg-gray-800 rounded-lg text-center">
            <p className="text-lg text-white">Create budgets for your Itinerary</p>
          </div>
        ) : (
          budgets.map((budgetGroup, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Budget Price: ${budgetGroup[0].budget.price}</span>
                <button 
                  onClick={() => handleDeleteBudget(index)} 
                  className="ml-2 text-red-500 text-xs p-2"
                >
                  Delete
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {budgetGroup.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-white">
                      {item.budget.type.charAt(0).toUpperCase() + item.budget.type.slice(1)} - {item.name}
                    </span>
                    <span className="text-white">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}

export default ExistingBudgets;