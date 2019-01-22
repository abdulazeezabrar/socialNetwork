const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { secretOrPrivateKey } = require('./keys');
var opts = {};
module.exports = passport => {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secretOrPrivateKey;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then( user => {
        if(user) return done(null, user);
        return (null, false);
      }).catch( err => console.log(err) );
  }));
}
