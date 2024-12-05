import axios from 'axios';
import serviceConfig from './Config';

console.log(serviceConfig.host);

export const signUpService = async (firstName, lastName, email, password) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.host}/accounts/register`,
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
  });
}

export const signInService = async (email, password) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.host}/accounts/login`,
    data: {
      email: email,
      password: password
    }
  });
}

export const logOutService = async (jwt) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.host}/accounts/logout`,
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
}

export const getUserDetailsService = async (email, jwt) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8080/profile/${encodeURIComponent(email)}`,
      headers: { 
        'Authorization': token,
        'Cookie': document.cookie // This will include all cookies, including JSESSIONID if present
      },
      withCredentials: true // This ensures cookies are sent with the request
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

