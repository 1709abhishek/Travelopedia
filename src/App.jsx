import { useContext, useEffect } from 'react';
import './App.css';
import { MainContext } from './contexts/MainContext';
import HomePage from './components/Homepage.jsx';

function App() {
  return (
    <>
      <div>
        <HomePage></HomePage>
      </div>
    </>
  )
}

export default App
