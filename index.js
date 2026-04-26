const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello CI/CD 🚀 IM ARINDAM MONDAL Test Deploying VIA CI CD");
});
<<<<<<< HEAD

app.listen(3000, () => {
  console.log("Server running on http://localhost:30005");
  console.log("Hello World");
=======
app.get("/home", (req, res) => {
  res.send("This is home route of the repo deployed VIA CI CD");
});
app.get("/menu", (req, res) => {
  res.send("This is menu route of the repo deployed VIA CI CD");
});
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
>>>>>>> a53cefb67abc3ca04e1e7f9ed5d64958a042aad9
});
module.exports = app; // important for testing
