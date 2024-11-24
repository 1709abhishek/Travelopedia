import { searchAirportService } from '../services/SearchServices';

export const useSearch = () => {
    const searchAirport = async (inputs) => {
        try {
            const response = await searchAirportService(inputs);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        searchAirport
    };
};