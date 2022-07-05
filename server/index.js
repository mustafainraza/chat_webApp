const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const pool = require("./api/db");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
const users=require("./api/routes/users");
app.use("/users",users);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","http://localhost:3006"],
    methods: ["GET", "POST"],
  },
});





io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
