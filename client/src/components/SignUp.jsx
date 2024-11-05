import { AccountCircle, Email, Lock } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import travelPic from "../assets/travel_vertical.jpg";
import { signUpService } from "../services/CustomerServices";
import "../styles/loginpage.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await signUpService(username, email, password);
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
              <div className="input-field">
                <AccountCircle style={{ fontSize: 30, color: "#999" }} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <Email style={{ fontSize: 30, color: "#999" }}></Email>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <Lock style={{ fontSize: 30, color: "#999" }}></Lock>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Login" className="btn" />
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
