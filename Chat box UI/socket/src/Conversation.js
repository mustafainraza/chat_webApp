import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import "./conversation.css";

function Conversation({ setVendoremail, vendoremail, assigned }) {
  const socket1 = io.connect("http://localhost:3001");
  const socket2 = io.connect("http://localhost:3001");
  const [room1, setRoom1] = useState(122);
  const [room2, setRoom2] = useState(125);
  const [myArray, setMyArray] = useState([]);

  const assign_room1 = () => {
    axios
      .post("http://localhost:3001/users/room", {
        v_email: vendoremail,
        room: room1,
        status: false,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMyArray((oldArray) => [...oldArray, vendoremail]);
  };
  const joinRoom1 = () => {
    socket1.emit("join_room", room1);
    console.log(room1);
  };
  const assign_room2 = () => {
    axios
      .post("http://localhost:3001/users/room", {
        v_email: vendoremail,
        room: room2,
        status: false,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMyArray((oldArray) => [...oldArray, vendoremail]);
  };
  const joinRoom2 = () => {
    socket2.emit("join_room", room2);
  };

  useEffect(() => {
    assign_room1();
  }, [room1]);
  useEffect(() => {
    assign_room2();
    // joinRoom1();
  }, [room2]);

  // useEffect(() => {
  //   // This will fire only on mount.
  //   axios.post('http://localhost:3001/users/room', {
  //     v_email:vendoremail,
  //     room:room1,
  //     status:false
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //     setMyArray(oldArray => [...oldArray, vendoremail]);
  // }, [room1])
  // useEffect(() => {
  //   // This will fire only on mount.
  //   axios.post('http://localhost:3001/users/room', {
  //     v_email:vendoremail,
  //     room:room1,
  //     status:false
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //     setMyArray(oldArray => [...oldArray, vendoremail]);
  // }, [room2])

  return (
    <div className="rooms">
      <div className="main1">
        <div className="sub-main1">
          <div className="xd">
            <h1>
              <u>CLIENT 1</u>
            </h1>
            {joinRoom1()}
            <Chat socket={socket1} username={vendoremail} room={room1} />
          </div>
        </div>
      </div>

      <div className="main1">
        <div className="sub-main1">
          <div className="xd">
            <h1>
              <u>CLIENT 2</u>
            </h1>
            {joinRoom2()}
            <Chat socket={socket2} username={vendoremail} room={room2} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Conversation;
