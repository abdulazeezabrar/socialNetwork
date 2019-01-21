const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { mongodbURI } = require('./config/keys');

// import Routes
const usersRoute = require('./routes/api/users');
const postsRoute = require('./routes/api/posts');
const profileRoute = require('./routes/api/profile');

// Connecting to database
mongoose.connect( mongodbURI )
  .then( () => console.log("MongoDB connected") )
  .catch( err => console.log(err) );
// required mongoose modles
require('./models/User');


app.get('/', (req, res) => {
  res.send("Hello");
});


// Use our routes as express middlewares
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runing on prot ${PORT}`));
