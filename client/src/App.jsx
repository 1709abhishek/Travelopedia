import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import AccountPage from './components/AccountPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';
import ExplorePage from './components/ExplorePage.jsx';
import HomePage from './components/HomePage.jsx';
import JourneyPage from './components/JourneyPage.jsx';
import LogTripPage from './components/LogTripPage.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<HomePage />} />

        {/* Sign In Route */}
        <Route path="/signin" element={<SignIn />} />

        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/my-journey" element={<JourneyPage></JourneyPage>}></Route>
        <Route path="/wishlist" element={<JourneyPage></JourneyPage>}></Route>
        <Route path="/explore" element={<ExplorePage></ExplorePage>}></Route>
        <Route path="/account" element={<AccountPage></AccountPage>}></Route>
        <Route path="/contact-us" element={<ContactUsPage></ContactUsPage>}></Route>
        <Route path="/log-trip" element={<LogTripPage></LogTripPage>}></Route>

        {/* Not Found Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}


export default App
