import axios from 'axios';
import serviceConfig from './Config';

console.log(serviceConfig.host);

export const signUpService = async (name, email, password) => {
  return await axios({
    method: 'post',
    url: `${serviceConfig.host}/accounts/register`,
    data: {
      name: name,
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

