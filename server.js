const express = require("express");
const app = express();
const PORT = 3002;

app.get('/test', (req, res) => {
  res.send("Welcome to Callhub")
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})
