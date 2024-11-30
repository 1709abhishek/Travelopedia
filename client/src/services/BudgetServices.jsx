import axios from 'axios';
import serviceConfig from './Config';

console.log(serviceConfig.host);

export const getHotelsService = async (inputs) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.budgetHost}/api/budgets/getHotelsCost`,
    data: inputs
  });
}

export const getFlightsService = async (inputs) => {
    return await axios({
        method: 'post',
        url: `${serviceConfig.budgetHost}/api/budgets/getFlightsCost`,
        data: inputs
      });
}

export const createHotelBudgetService = async (data) => {
  return await axios({
      method: 'post',
      url: `${serviceConfig.budgetHost}/api/budgets/hotel/create`,
      data: data
    });
}

export const createFlightBudgetService = async (data) => {
  return await axios({
      method: 'post',
      url: `${serviceConfig.budgetHost}/api/budgets/flight/create`,
      data: data
    });
}

export const createCustomBudgetService = async (data) => {
  return await axios({
      method: 'post',
      url: `${serviceConfig.budgetHost}/api/budgets/custom/create`,
      data: data
    });
}

export const getBudgetsService = async (id) => {
  return await axios({
      method: 'get',
      url: `${serviceConfig.budgetHost}/api/budgets/${id}`
    });
}

export const deleteBudgetService = async (budgetId, type) => {
  return await axios({
      method: 'delete',
      url: `${serviceConfig.budgetHost}/api/budgets/delete/${budgetId}/${type}`
    });
}

export const deleteItineraryService = async (itineraryId) => {
  return await axios({
      method: 'delete',
      url: `${serviceConfig.budgetHost}/api/budgets/delete/${itineraryId}`
    });
}
