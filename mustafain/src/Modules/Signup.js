import React from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import profile from "../Image/profile.png";
import Email from "../Image/email.png";
import pass from "../Image/pass.png";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:8062/Signup", {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("created with email : " + email);
        } else {
          alert("Email already exist");
          console.log("already exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const check = () => {
    if (name.length >= 1 && email.length >= 1 && password.length >= 1) {
      handleSubmit();
      navigate("/");
    } else {
      alert("Please Fill All Fields");
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div>
            <h1>SIGN UP</h1>
            <div className="usr">
              <img src={profile} alt="profile" className="email" />
              <input
                type="text"
                placeholder="User Name"
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
            <div className="Signup-button">
              <button className="Login" onClick={check}>
                CREATE ACCOUNT
              </button>
            </div>
            <br />
            <div>
              <p>
                Already have an account?{" "}
                <a className="Signin" href="/">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
