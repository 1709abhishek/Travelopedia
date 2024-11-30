import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExistingBudgets from './ExistingBudgets';
import CustomBudget from './CustomBudget';
import HotelBudget from './HotelBudget';
import FlightBudget from './FlightBudget';

export function BudgetModal({ isOpen, onClose, trip }) {
  if (!trip) return null;

  const [budgetType, setBudgetType] = useState('flight');
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white sm:max-w-[1400px]">
        <DialogHeader>
          <DialogTitle>Your {trip.destination} Budget</DialogTitle>
          <DialogDescription className="text-gray-400">
            {trip.country}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="existing" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-6 gap-2">
            <TabsTrigger value="existing" className="text-white data-[state=active]:bg-gray-700">
              Existing Budgets
            </TabsTrigger>

            <TabsTrigger value="new" className="text-white data-[state=active]:bg-gray-700">
              New Budget
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-white data-[state=active]:bg-gray-700">
              New Custom Budget
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="pt-2">
            {/* <p className="text-m text-black-500 mb-4">Search hotels/Flights and add into your budget</p> */}
            
            <div className="flex-1 pb-4">
                <Label htmlFor="budgetType">Budget Type</Label>
                <Select value={budgetType} onValueChange={setBudgetType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 w-40">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            {budgetType === 'hotel' && <HotelBudget trip={trip} />}
            {budgetType === 'flight' && <FlightBudget trip={trip} />}
          </TabsContent>

          <TabsContent value="custom" className="pt-4">
            <CustomBudget />
          </TabsContent>

          <TabsContent value="existing" className="pt-4">
            <ExistingBudgets />
          </TabsContent>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
BudgetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trip: PropTypes.shape({
    destination: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default BudgetModal;