const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello CI/CD 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app; // important for testing
