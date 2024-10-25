import React, { useState } from 'react';
import '../styles/accountpage.css';
import cook from "../assets/cook.jpg";
import Header from "../components/Header.jsx";





const AccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: 'Tim',
    lastName: 'Cook',
    phoneNumber: '(408) 996-1010',
    email: 'tcook@apple.com',
    city: 'New York',
    country: 'America'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission or API call
    console.log('Updated Info: ', formData);
  };

  return (

    <div className="account-page">
      <div className="content-other">
        <Header></Header>
      </div>
      <div className="sidebar">
        <div className="profile">
          <img src={cook} alt="Profile" className="profile-pic" />
          <h2>Tim Cook</h2>
          <p>CEO of Apple</p>
          <p>Opportunities applied: 32</p>
          <p>Opportunities won: 26</p>
          <p>Current opportunities: 6</p>
          <button>View Public Profile</button>
        </div>
      </div>
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="America">America</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              {/* More options */}
            </select>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>

  );
};


export default AccountPage;
