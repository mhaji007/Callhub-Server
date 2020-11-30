const express = require("express");
const callhub = require("./Callhub");
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();



const app = express();

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
  const {to, username, channel} = req.body
  // Send verification code to MOBILE number
  const data = await callhub.sendVerify(to, channel);
  res.send(data);
});
// Endpoint for verifying the verification code sent
// back from the frontend
// (returns an object containing verification code's valid status)
app.post("/verify", async (req, res) => {
  const {to, code} = req.body
  console.log("Verifying code...");
  const data = await callhub.verifyCode(to, code);
  res.send(data);
});

const port = process.env.PORT || 3002;


app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
