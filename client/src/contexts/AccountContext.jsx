import PropTypes from 'prop-types';
import React, { createContext } from 'react';

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
    case 'setPlaceTravelled':
      return { ...state, placeTravelled: action.payload };
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


const AccountContextProvider = props => {
  const [accountState, dispatch] = React.useReducer(reducer, {
    firstName: 'Abhishek',
    lastName: 'Jain',
    phoneNumber: '1234567890',
    email: '1709abhishek@gmail.com',
    city: 'Bengaluru',
    country: 'India',
    bio: 'I am a software developer',
    placeTravelled: ['India', 'USA', 'France', 'Netherlands', 'Brussels', 'Azerbaijan'],
    wishlist: ['Rome', 'Italy', 'Spain', 'New Zealand', 'Australia'],
    travelQuote: 'Travel is the only thing you buy that makes you richer',
    username: 'Wanderlust'
  });

  const setFirstName = firstName => dispatch({ type: 'setFirstName', payload: firstName });
  const setLastName = lastName => dispatch({ type: 'setLastName', payload: lastName });
  const setPhoneNumber = phoneNumber => dispatch({ type: 'setPhoneNumber', payload: phoneNumber });
  const setEmail = email => dispatch({ type: 'setEmail', payload: email });
  const setCity = city => dispatch({ type: 'setCity', payload: city });
  const setCountry = country => dispatch({ type: 'setCountry', payload: country });
  const setBio = bio => dispatch({ type: 'setBio', payload: bio });
  const setPlaceTravelled = placeTravelled => dispatch({ type: 'setPlaceTravelled', payload: placeTravelled });
  const setWishlist = wishlist => dispatch({ type: 'setWishlist', payload: wishlist });
  const setTravelQuote = travelQuote => dispatch({ type: 'setTravelQuote', payload: travelQuote });
  const setUsername = username => dispatch({ type: 'username', payload: username });

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
        setPlaceTravelled,
        setWishlist,
        setTravelQuote,
        setUsername
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

AccountContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export { AccountContext, AccountContextProvider };
