import axios from 'axios';
import serviceConfig from './Config';

console.log(serviceConfig.host);

export const getHotelsService = async (inputs) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.budgetHost}/budgets/getHotelsCost`,
    data: inputs
  });
}

export const getFlightsService = async (inputs) => {
    return await axios({
        method: 'post',
        url: `${serviceConfig.budgetHost}/budgets/getFlightCost`,
        data: inputs
      });
}

