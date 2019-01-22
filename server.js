const bodyParser  = require('body-parser')
const express     = require('express');
const passport    = require('passport');
const app = express();

// start database
require('./models').init();

// Passport Middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

// import Routes
const usersRoute = require('./routes/api/users');
const postsRoute = require('./routes/api/posts');
const profileRoute = require('./routes/api/profile');

// Body parser configration
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


app.get('/', (req, res) => {
  res.send("Hello");
});

// Use our routes as express middlewares
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runing on prot ${PORT}`));
