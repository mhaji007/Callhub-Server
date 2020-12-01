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
// Socket
const io = socketIo(server);

// Subscribe to events on socket
// socket below is an individual connection
// that we get back when connection is established
// this socket is our direct connection to unique
// page in browser. Each page has its own unique
// socket
io.on("connection", (socket) => {
  // When specific page is connected
  console.log("Socket connected", socket.id);
  // On disconnet from any page
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// // Test endpoint
// app.get("/test", (req, res) => {
//   res.send("Welcome to Callhub");
// });

// Endpoint for sending verification code
// (returns an object containing verification code)
app.post("/login", async (req, res) => {
  const { to, username, channel } = req.body;
  // Send verification code to MOBILE number
  const data = await callhub.sendVerify(to, channel);
  res.send('Sent Code');
});
// Endpoint for verifying the verification code sent
// back from the frontend
// If code is approved, create jwt for the user
// if not send back invalid token message
app.post("/verify", async (req, res) => {
  const { to, code, username } = req.body;
  const data = await callhub.verifyCode(to, code);
    if(data.status === 'approved') {
      const token = jwt.createJwt(username);
      return res.send({token})
    }
  res.status(401).send('Invalid token');
});

const port = process.env.PORT || 3002;

// When using sockets server now takes over
// the listening from app ( app.listen(port, () => {...})
server.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
