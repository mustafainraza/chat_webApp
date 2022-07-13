import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from "axios";


import ChatBox from './ChatBox';
const socket = io.connect("http://localhost:5000");
const socket2 = io.connect("http://localhost:5000");


const VendorChatBox = (props) => {
   // const [rooms, setrooms] = useState([]);
    const [room1, setroom1] = useState(props.room1);
    const [room2, setroom2] = useState(props.room2);
    const [v_email, setV_email] = useState(props.email);
    const [assignroom1, setassignroom1] = useState(false);
    const [assignroom2, setassignroom2] = useState(false);

    const JoinRoom1 = ()=>{
        socket.emit("join_room", room1);
        //socket2.emit("join_room", room2);
    
    }
    
    const JoinRoom2 = ()=>{
        //  console.log(props.location);
          socket.emit("join_room", room2);
          //socket2.emit("join_room", room2);
      
      }
    const fetchroom =() =>{
    if(assignroom1==false){
      console.log("......."+room1);
    axios
    .get(`http://localhost:3004/vendors/${room1}`)
    .then((response) => setassignroom1(response.data))
    .then((json) => json);
    console.log(assignroom1);

    }
    if(assignroom2==false){
      axios
      .get(`http://localhost:3004/vendors/${room2}`)
      .then((response) => setassignroom2(response.data))
      .then((json) => json);
      console.log(assignroom2);
  
      }
    }
      useEffect(() => {
        const interval = setInterval(() => {
          fetchroom();
        }, 3000);
        return () => clearInterval(interval);
      });
  return (
    <div>
    {/* <div>
        <button onClick={handleClick}>Click</button>
        {email}
    </div> */}
    <div>
    {JoinRoom1()}
    {JoinRoom2()}

    {assignroom1 ? <ChatBox socket={socket} username={"vendor"} room={room1} email={v_email} /> :null} 
    {assignroom2 ? <ChatBox socket={socket2} username={"vendor"} room={room2} email={v_email} /> :null}
    </div>
    </div>
    )
}

export default VendorChatBox