const videos = require('./data')

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/", (req, res) => {
    res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;