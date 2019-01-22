const { mongodbURI } = require('../config/keys');
const mongoose = require('mongoose');

// create object module
const obj = {};

obj.init = () => {
  // Connecting to database
  mongoose.connect( mongodbURI )
    .then( () => console.log("MongoDB connected") )
    .catch( err => console.log(err) );

  // required mongoose modles
  require('./User');
}

// export module
module.exports = obj;
