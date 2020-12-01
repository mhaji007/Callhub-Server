const express = require("express");
const callhub = require("./Callhub");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
// Use socket io for emitting event
// from client to server without
// having to post and wait on them
const socketIo = require("socket.io");


const app = express();
// Server
const server = http.createServer(app);
// Scoket
const socket = socketIo(server);

// Subscribe to events on socket
socket.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
})

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// // Test endpoint
// app.get("/test", (req, res) => {
//   res.send("Welcome to Callhub");
// });

// Endpoint for sending verification code
// (retruns an object containing verification code)
app.post("/login", async (req, res) => {
  console.log("Logging in... ");
  const { to, username, channel } = req.body;
  // Send verification code to MOBILE number
  const data = await callhub.sendVerify(to, channel);
  res.send(data);
});
// Endpoint for verifying the verification code sent
// back from the frontend
// (returns an object containing verification code's valid status)
app.post("/verify", async (req, res) => {
  const { to, code } = req.body;
  console.log("Verifying code...");
  const data = await callhub.verifyCode(to, code);
  res.send(data);
});

const port = process.env.PORT || 3002;

// When using sockets server now takes over
// the listening from app ( app.listen(port, () => {...})
server.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
