import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
// import Chat from "./Chat";
const axios = require('axios').default;




const socket1 = io.connect("http://localhost:5000");



function Client() {
  const [useremail, setUseremail] = useState("");
  const [assignroom, setassignroom] = useState(false);
  const [room, setroom] = useState("");

  const joinRoom = () => {
    socket1.emit("join_room", room);
  };

  function handlesubmit(){
    axios.post('http://localhost:3004/clients', {
      email: {useremail}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    
  
  }
  const changestatus=()=>{
    axios.post(`http://localhost:3004/vendors/update/${room}`, {
      status: true
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const fetchroom=()=>{
    if(assignroom==false){
      console.log("object");
    axios
    .get(`http://localhost:3004/vendors/availableroom`)
    .then((response)=>{setroom(response.data)})
    .then((json) => json);
    if(room>0){
        console.log("111111111111"+room);
        setassignroom(true);
        joinRoom();
        changestatus();
    }
    console.log("....."+assignroom); }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetchroom();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    
    <div>
        <input value={useremail} onChange={(event) => {setUseremail(event.target.value);}}></input>
        <button onClick={handlesubmit}>Start Conversation</button>
        <p>Please wait while connecting</p>
        {assignroom? (
        <ChatBox socket={socket1} username={useremail} room={room} email={useremail} /> ):null}


    </div>
    
  );
}

export default Client;