# Travelopedia - Frontend

Travelopedia is a modularized React/context application designed to provide a one stop app for all the solo traveler's needs. The application is structured to maintain clean and manageable code by organizing different functionalities into separate folders.

## Information

Clickup Board link to update tasks :- https://app.clickup.com/9011212251/v/s/90110947014

## Project Structure

The project is organized into the following main directories:

- **src**: Contains the main source code for the application.
  - **components**: Contains all the reusable React components.
  - **contexts**: Contains context providers for managing state across different parts of the application.
  - **services**: Contains all the Axios requests and API service functions.
  - **assets**: Contains static assets like images and icons.
  - **styles**: Contains global and component-specific styles.

## Context Management

Each page or major feature of the application has its own context to avoid a convoluted state management system. Context providers are placed in the `contexts` folder.

### Example Context

```jsx
// src/contexts/MainContext.jsx
import PropTypes from 'prop-types';
import React, { createContext, useReducer } from 'react';

const MainContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'setCount':
      return { ...state, count: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const MainContextProvider = ({ children }) => {
  const [mainState, dispatch] = useReducer(reducer, { count: 0 });

  const setCount = (count) => dispatch({ type: 'setCount', payload: count });

  return (
    <MainContext.Provider value={{ mainState, setCount }}>
      {children}
    </MainContext.Provider>
  );
};

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MainContext, MainContextProvider };
```

## Services

All Axios requests are managed in the services folder. This helps in keeping the API calls separate from the UI logic, making the code more modular and easier to maintain.

```jsx
// src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async () => {
  try {
    const response = await apiClient.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

## Main Entry Point

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { MainContextProvider } from './contexts/MainContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </StrictMode>
);
```

## Getting Started

git clone https://github.com/your-username/travelopedia.git
cd travelopedia
npm install
npm run dev
npm run build
npm test
