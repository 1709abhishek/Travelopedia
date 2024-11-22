import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const existingBudgets = [
    {
      budgetPrice: 1500,
      items: [
        { name: "Courtyard by Marriott Mumbai International Airport", price: 500 },
        { name: "HOLIDAY INN MUMBAI INTL ARPT", price: 1000 },
      ],
      createdDate: "2023-10-01",
    },
    {
      budgetPrice: 2000,
      items: [
        { name: "HILTON MUMBAI INTERNATIONAL AIRPORT", price: 1200 },
        { name: "Hyatt Regency Mumbai", price: 800 },
      ],
      createdDate: "2023-10-05",
    },
  ];
  
function ExistingBudgets(){
    const [budgets, setBudgets] = useState(existingBudgets);

    const handleDeleteBudget = (budgetIndex) => {
        const newBudgets = budgets.filter((_, index) => index !== budgetIndex);
        setBudgets(newBudgets);
    };

    return (   
        <ScrollArea className="h-[60vh] w-full">
              <div className="space-y-4">
                {budgets.map((budget, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Budget Price: ${budget.budgetPrice}</span>
                      <button 
                        onClick={() => handleDeleteBudget(index)} 
                        className="ml-2 text-red-500 text-xs p-2"
                      >
                        Delete
                      </button>
                    </div>
                    <span className="text-gray-400">Created Date: {budget.createdDate}</span>
                    <div className="mt-2 space-y-2">
                      {budget.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-white">{item.name}</span>
                          <span className="text-white">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
    );
}

export default ExistingBudgets;