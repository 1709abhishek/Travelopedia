import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AccountPage from './components/AccountPage.jsx';
import Blogs from './components/Blogs.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';
import ExplorePage from './components/ExplorePage.jsx';
import HomePage from './components/HomePage.jsx';
import JourneyPage from './components/JourneyPage.jsx';
import LogTripPage from './components/LogTripPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<HomePage />} />

        {/* Sign In Route */}
        <Route path="/signin" element={<SignIn />} />

        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />
        
          {/* Protected Routes */}

        <Route path="/my-journey" element={<ProtectedRoute><JourneyPage></JourneyPage></ProtectedRoute>}></Route>
        <Route path="/wishlist" element={<ProtectedRoute><JourneyPage></JourneyPage></ProtectedRoute>}></Route>
        <Route path="/explore" element={<ProtectedRoute><ExplorePage></ExplorePage></ProtectedRoute>}></Route>
        <Route path="/account" element={<ProtectedRoute><AccountPage></AccountPage></ProtectedRoute>}></Route>
        <Route path="/contact-us" element={<ProtectedRoute><ContactUsPage></ContactUsPage></ProtectedRoute>}></Route>
        <Route path="/log-trip" element={<ProtectedRoute><LogTripPage></LogTripPage></ProtectedRoute>}></Route>
        <Route path="/blogs" element={<ProtectedRoute><Blogs></Blogs></ProtectedRoute>}></Route>
        {/* Not Found Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <ToastContainer />
    </Router>
    </AuthProvider>
  );
}

export default App
