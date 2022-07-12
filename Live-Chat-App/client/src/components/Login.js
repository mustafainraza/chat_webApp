import React from "react";
import "../UI/login.css"
import { useState } from "react";
import axios from "axios";
import profile from "../Image/profile.png";
import Email from "../Image/email.png";
import pass from "../Image/pass.png";
import { Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email);
    console.log(password);
    axios
      .get(`http://localhost:3004/clients/chatapplication/'${email}'/'${password}'`)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <div>
              <img src={Email} alt="email" className="email" />
              <input
                type="text"
                placeholder="Email"
                className="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="second-input">
              <img src={pass} alt="pass" className="email" />
              <input
                type="password"
                placeholder="Password"
                className="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button">
              <Link to="/home" params={{ email }}>
                <button onClick={handleSubmit}>Login</button>
              </Link>
            </div>
            <br />
            <div>
              <a href="/Forgetpassword">Forget Password</a>
            </div>
            <div>
              <a href="/Signup">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
