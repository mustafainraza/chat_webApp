import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Client.css";
import emaill from "./Image/email.png";

import Chat from "./Chat";
const axios = require("axios").default;

var vendor_list = [];

// function assign(){
//   axios.get('http://localhost:3001/users/room', {

//           })
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//   if(vendor_list != null){
//     var a = Math.floor(Math.random() * 10);

//   }

// }
const socket = io.connect("http://localhost:3001");

const joinRoom = () => {
  socket.emit("join_room", 122);
};

function Client() {
  const [useremail, setUseremail] = useState("");
  const [myArray, setMyArray] = useState([]);

  function handlesubmit() {
    axios
      .post("http://localhost:3001/users", {
        email: { useremail },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post("http://localhost:3001/users/queue", {
        email: { useremail },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMyArray((oldArray) => [...oldArray, useremail]);
  }
  useEffect(() => {
    const interval = setInterval(() => {}, 5000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="emaill">
            <img src={emaill} alt="email" className="email" />
            <input
              value={useremail}
              type="email"
              className="name"
              placeholder="Client Email"
              onChange={(event) => {
                setUseremail(event.target.value);
              }}
            ></input>
          </div>
          <div className="client-btn">
            <button className="btn" onClick={handlesubmit}>
              Start Conversation
            </button>
          </div>
          <p>Connecting With Vendor...</p>
          <div className="room">
            {joinRoom()}
            <Chat socket={socket} username={useremail} room={122} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
