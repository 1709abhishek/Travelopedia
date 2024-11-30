import axios from 'axios';
import serviceConfig from './Config';

export const searchAirportService = async (data) => {
    return await axios({
        method: 'post',
        url: `${serviceConfig.budgetHost}/api/budgets/airports/search`,
        data: data
      });
  }