import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import Chat from "./Chat";
const axios = require('axios').default;

var vendor_list =[];


function assign(){
  axios.get('http://localhost:3001/users/room', {
        
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
  if(vendor_list != null){
    var a = Math.floor(Math.random() * 10);
    

  }

}
const socket = io.connect("http://localhost:3001");

const joinRoom = () => {
  socket.emit("join_room", 122);
};

function Client() {
  const [useremail, setUseremail] = useState("");
  const [myArray, setMyArray] = useState([]);

  function handlesubmit(){
    axios.post('http://localhost:3001/users', {
      email: {useremail}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://localhost:3001/users/queue', {
      email: {useremail}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setMyArray(oldArray => [...oldArray, useremail]);
  
  }
  useEffect(() => {
    const interval = setInterval(() => {
      

    }, 5000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    
    <div>
        <input value={useremail} onChange={(event) => {setUseremail(event.target.value);}}></input>
        <button onClick={handlesubmit}>Start Conversation</button>
        <p>Please wait while connecting</p>
        {joinRoom()}
        <Chat socket={socket} username={useremail} room={122} />


    </div>
    
  );
}

export default Client;