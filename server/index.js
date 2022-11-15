const videos = require('./data')

const express = require("express");
const fs = require('fs')

// fs.writeFileSync('data.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});