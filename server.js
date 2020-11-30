const express = require("express");
const callhub = require("./Callhub");
require("dotenv").config();

const app = express();

app.get("/test", (req, res) => {
  res.send("Welcome to Callhub");
});
app.get("/login", async (req, res) => {
  console.log("Logging in... ");
  // Send verification code to MOBILE number
  const data = await callhub.sendVerify(process.env.MOBILE, "sms");
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
