import React from 'react';
import '../styles/login.css';
import { AccountCircle } from '@mui/icons-material';
import { Lock } from '@mui/icons-material';
import { Email } from '@mui/icons-material';

function SignUp() {

  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Perform your login logic here
    // For this example, we'll just simulate a login
    // onSignIn();
  };

  return (
    <div className="">
      <div className="containerDiv">
        <div className="signin-signup">
            <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="login-title">Sign up</h2>
            <div className="input-field">
            <AccountCircle style={{ fontSize: 30, color: "#999" }} />
              <input type="text" placeholder="Name" />
            </div>
            <div className="input-field">
            <Email style={{ fontSize: 30, color: "#999" }}></Email>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
            <Lock style={{ fontSize: 30, color: "#999" }}></Lock>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign Up" className="btn"/>
            {/* <Button type="submit" className="btn" variant="contained" color="primary">Sign up</Button> */}
            <p>Already have an account? <a href="/" className="account-text" id="sign-in-link">Sign in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
