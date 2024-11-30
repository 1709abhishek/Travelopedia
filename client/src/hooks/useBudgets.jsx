import { 
  getHotelsService, 
  getFlightsService, 
  createHotelBudgetService, 
  createFlightBudgetService, 
  createCustomBudgetService, 
  getBudgetsService,
  deleteBudgetService,
  deleteItineraryService 
} from '../services/BudgetServices';
import { useState } from 'react';

export const useBudgets = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const getHotels = async (inputs) => {
        try {
            const response = await getHotelsService(inputs);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getFlights = async (inputs) => {
        try {
            const response = await getFlightsService(inputs);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const createHotelBudget = async (data) => {
        try {
            const response = await createHotelBudgetService(data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const createFlightBudget = async (data) => {
        try {
            const response = await createFlightBudgetService(data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const createCustomBudget = async (data) => {
        try {
            const response = await createCustomBudgetService(data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getBudgets = async (id) => {
        try {
            const response = await getBudgetsService(id);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const refreshBudgets = () => {
        setRefreshFlag(!refreshFlag);
    };

    const deleteBudget = async (budgetId, type) => {
        try {
            const response = await deleteBudgetService(budgetId, type);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const deleteItinerary = async (itineraryId) => {
        try {
            const response = await deleteItineraryService(itineraryId);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        getHotels,
        getFlights,
        createHotelBudget,
        createFlightBudget,
        createCustomBudget,
        getBudgets,
        refreshBudgets,
        deleteBudget,
        deleteItinerary,
        refreshFlag
    };
};