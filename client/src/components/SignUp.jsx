import { AccountCircle, Email, Lock } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import travelPic from "../assets/travel_vertical.jpg";
import { useAuth } from "../contexts/AuthContext";
import { signUpService } from "../services/CustomerServices";
import "../styles/loginpage.css";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const {login} = useAuth();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await signUpService(firstName, lastName, email, password);
    login(response.data, email);
    navigate("/signin");
    console.log(response);
  };

  return (
    <div className="sign-in-background">
      <div className="app-name-background">Travelopedia</div>
      <div className="form-modal__container">
        <div className="form-modal__wrapper">
          <div className="sign-up">
            <img src={travelPic} alt="Camels in the desert"></img>
          </div>
          <div className="sign-up__container">
            <form onSubmit={handleSignUp} className="sign-up__form">
              <h2 className="login-title">Sign Up</h2>
              {/* <div className="input-field">
                <AccountCircle style={{ fontSize: 30, color: "#999" }} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div> */}
              <div className="input-field">
               <AccountCircle style={{ fontSize: 30, color: "#999" }} />
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-field">
              <AccountCircle style={{ fontSize: 30, color: "#999" }} />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                </div>
              <div className="input-field">
                <Email style={{ fontSize: 30, color: "#999" }}></Email>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <Lock style={{ fontSize: 30, color: "#999" }}></Lock>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Sign Up" className="btn" />
              <p>
                Already have an account?{" "}
                <a href="/signin" className="account-text" id="sign-in-link">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
