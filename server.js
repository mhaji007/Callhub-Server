const express = require("express");
const app = express();
require("dotenv").config();

app.get('/test', (req, res) => {
  res.send("Welcome to Callhub")
});
app.get('/login', (req, res) => {
  console.log('Logging in... ')
});
app.get('/verify', (req, res) => {
  console.log('Verifying code...')
  console.log('number', process.env.PHONE_NUMBER);
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
})
