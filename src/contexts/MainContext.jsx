import PropTypes from 'prop-types';
import React, { createContext } from 'react';

// import { useLocalStorage } from '../utils/useLocalStorage';

const MainContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'setCount':
      return { ...state, count: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}


const MainContextProvider = props => {
  const [mainState, dispatch] = React.useReducer(reducer, {
    count: 0
  });

  const setCount = count => dispatch({ type: 'setCount', payload: count });

  return (
    <MainContext.Provider
      value={{
        mainState,
        setCount
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export { MainContext, MainContextProvider };
