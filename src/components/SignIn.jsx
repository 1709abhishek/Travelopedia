import React, { useState } from "react";
import "../styles/loginpage.css";
import travelPic from "../assets/travel_vertical.jpg";
import { AccountCircle } from "@mui/icons-material";
import { Lock } from "@mui/icons-material";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="sign-in-background">
      <div className="app-name-background">Travelopedia</div>
      <div className="form-modal__wrapper">
        <div className="sign-up">
          <img src={travelPic} alt="Camels in the desert" />
        </div>
        <div className="sign-up__container">
          <form onSubmit={handleSignIn} className="sign-up__form">
            <h2 className="login-title">Sign in</h2>
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
              <Lock style={{ fontSize: 30, color: "#999" }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="/" className="forgot-password">
              Forgot password?
            </a>
            <input type="submit" value="Login" className="btn" />
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="account-text" id="sign-up-link">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
