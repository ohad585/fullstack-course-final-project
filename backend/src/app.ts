/* import server from './rest_server'

import {initSocketServer} from "./socket_server"

initSocketServer(server)

const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log('server started on port ' + PORT)
})

export = server
 */

import express from "express"
const app = express();
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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