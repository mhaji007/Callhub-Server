const express = require("express");
const callhub = require("./Callhub");

const app = express();
const client = callhub.client;

require("dotenv").config();

app.get("/test", (req, res) => {
  res.send("Welcome to Callhub");
});
app.get("/login", (req, res) => {
  console.log("Logging in... ");
});
app.get("/verify", (req, res) => {
  console.log("Verifying code...");
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
