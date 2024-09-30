import React, { useState } from 'react';
import '../styles/login.css';
import { AccountCircle } from '@mui/icons-material';
import { Lock } from '@mui/icons-material';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn = async (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="">
      <div className="containerDiv">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
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
              <Lock style={{ fontSize: 30, color: "#999" }}></Lock>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="/" className="forgot-password">Forgot password?</a>
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

export default Login;
