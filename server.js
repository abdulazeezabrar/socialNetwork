const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { mongodbURI } = require('./config/keys');


// Connecting to database
mongoose.connect( mongodbURI )
  .then( () => console.log("MongoDB connected") )
  .catch( err => console.log(err) );

app.get('*', (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runing on prot ${PORT}`));
