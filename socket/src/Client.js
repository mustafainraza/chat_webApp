import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import Chat from "./Chat";
const axios = require('axios').default;




const socket = io.connect("http://localhost:3001");

const joinRoom = () => {
  socket.emit("join_room", 122);
};

function Client() {
  const [useremail, setUseremail] = useState("");

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

    
  
  }

  return (
    
    <div>
        <input value={useremail} onChange={(event) => {setUseremail(event.target.value);}}></input>
        <button onClick={handlesubmit}>Start Conversation</button>
        <p>Please wait while connecting</p>
        {joinRoom()}
        <Chat socket={socket} username={useremail} room={room} />


    </div>
    
  );
}

export default Client;