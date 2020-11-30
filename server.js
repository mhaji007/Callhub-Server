const express = require("express");
const callhub = require("./Callhub");
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();



const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Welcome to Callhub");
});
app.post("/login", async (req, res) => {
  console.log("Logging in... ");
  const {to, username, channel} = req.body
  // Send verification code to MOBILE number
  const data = await callhub.sendVerify(to, channel);
  res.send(data);
});
app.get("/verify", async (req, res) => {
  console.log("Verifying code...");
  const data = await callhub.verifyCode(process.env.MOBILE, req.query.code);
  return data;
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
