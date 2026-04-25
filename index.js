const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello CI/CD 🚀 IM ARINDAM MONDAL Test Deploying VIA CI CD");
});
app.get("/home", (req, res) => {
  res.send("This is home route of the repo deployed VIA CI CD");
});
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
module.exports = app; // important for testing
