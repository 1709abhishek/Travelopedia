import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { getUserDetailsService } from '../services/CustomerServices';

const AccountContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.payload };
    case 'setLastName':
      return { ...state, lastName: action.payload };
    case 'setPhoneNumber':
      return { ...state, phoneNumber: action.payload };
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setCity':
      return { ...state, city: action.payload };
    case 'setCountry':
      return { ...state, country: action.payload };
    case 'setBio':
      return { ...state, bio: action.payload };
    case 'setPlacesTravelled':
      return { ...state, placesTravelled: action.payload };
    case 'setWishlist':
      return { ...state, wishlist: action.payload };
    case 'setTravelQuote':
      return { ...state, travelQuote: action.payload };
    case 'username':
      return { ...state, username: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const AccountContextProvider = (props) => {
  const [accountState, dispatch] = React.useReducer(reducer, {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    city: '',
    country: '',
    bio: '',
    placesTravelled: [],
    wishlist: [],
    travelQuote: '',
  });

  const setFirstName = (firstName) => dispatch({ type: 'setFirstName', payload: firstName });
  const setLastName = (lastName) => dispatch({ type: 'setLastName', payload: lastName });
  const setPhoneNumber = (phoneNumber) => dispatch({ type: 'setPhoneNumber', payload: phoneNumber });
  const setEmail = (email) => dispatch({ type: 'setEmail', payload: email });
  const setCity = (city) => dispatch({ type: 'setCity', payload: city });
  const setCountry = (country) => dispatch({ type: 'setCountry', payload: country });
  const setBio = (bio) => dispatch({ type: 'setBio', payload: bio });
  const setPlacesTravelled = (placesTravelled) =>
    dispatch({ type: 'setPlacesTravelled', payload: placesTravelled });
  const setWishlist = (wishlist) => dispatch({ type: 'setWishlist', payload: wishlist });
  const setTravelQuote = (travelQuote) => dispatch({ type: 'setTravelQuote', payload: travelQuote });

  const fetchProfileDetails = async () => {
    try {
      console.log('Fetching profile details...');
      const email = localStorage.getItem('user');
      const jwt = localStorage.getItem('token');
      const response = await getUserDetailsService(jwt, email);
      const profile = response.data;
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPhoneNumber(profile.phoneNumber);
      setEmail(profile.email);
      setCity(profile.city);
      setCountry(profile.country);
      setBio(profile.bio);
      setPlacesTravelled(profile.placesTravelled || []);
      setWishlist(profile.wishlist || []);

      setTravelQuote(profile.travelQuote);
    } catch (error) {
      console.error('Failed to fetch profile details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        accountState,
        setFirstName,
        setLastName,
        setPhoneNumber,
        setEmail,
        setCity,
        setCountry,
        setBio,
        setPlacesTravelled,
        setWishlist,
        setTravelQuote,
        fetchProfileDetails,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

AccountContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AccountContext
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountContextProvider');
  }
  return context;
};

export { AccountContext, AccountContextProvider };
