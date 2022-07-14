import React from "react";
import "../UI/login.css"
import { useState } from "react";
import axios from "axios";
import profile from "../Image/profile.png";
import Email from "../Image/email.png";
import pass from "../Image/pass.png";
import { Link } from "react-router-dom";
import VendorChatBox from "./VendorChatBox";

const state={
  name:'rajdeep singh',
  love:'coding',
  earn:'null'
}

const a1 = Math.floor(Math.random()*100000);
const a2 = Math.floor(Math.random()*100000);

export const Login = () => {
   const [showchat, setshowchat] = useState(false);
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [room1, setRoom1] = useState(a1);
    const [room2, setRoom2] = useState(a2);
  const handleSubmit = () => {
    console.log(email);
    console.log(password);
    axios
      .get(`http://localhost:3004/clients/chatapplication/'${email}'/'${password}'`)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    //set rooms
    axios
      .post("http://localhost:3004/vendors/rooms", {
        v_email: email,
        room: room1,
        status: false,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log("created room with email : " + room1);
        } else {
          console.log("not created");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      //set rooms
    axios
    .post("http://localhost:3004/vendors/rooms", {
      v_email: email,
      room: room2,
      status: false,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log("created room with email : " + room2);
      } else {
        console.log("not created");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
    setshowchat(true);

  };

  return (
    <div className="main">
      {
        !showchat?
      (<div className="sub-main">
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
              {/* <Link to={{ pathname: "/vendorchatbox", state:"jjjjj",}}> */}
                <button onClick={handleSubmit}>Login</button>
              {/* </Link> */}
            </div>
            <br />
            <div>
              <a href="/Forgetpassword">Forget Password</a>
            </div>
            <div>
              <a href="/vendor">Sign Up</a>
            </div>
          </div>
        </div>
      </div>)
      :(
        <VendorChatBox email={email} room1={room1} room2={room2}/>
      )}
    </div>
  );
};
