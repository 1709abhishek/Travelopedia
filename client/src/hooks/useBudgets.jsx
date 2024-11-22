import { getHotelsService } from '../services/BudgetServices';

export const useBudgets = () => {
    const getHotels = async (inputs) => {
        try {
            const response = await getHotelsService(inputs);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        getHotels
    };
};