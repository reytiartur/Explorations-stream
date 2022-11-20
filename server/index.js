const videos = require('./data')

const express = require("express");
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get("/videos", (req, res) => {
    res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});