const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { secretOrPrivateKey } = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users api works'}) );

//@route POST api/users/register
//@desc To Create new User
//@access Public
router.post('/register', (req, res) => {
  const { name, email, password} = req.body;
  const { errors, isValid} = validateRegisterInput(req.body);

  if(!isValid) return res.status(400).json(errors);

  User.findOne({email})
    .then( exsitUser => {
      if(exsitUser) return res.status(300).json({email: 'this email is alredy exsit'});
      // Create gravatar photo            //size   //rating  //default
      const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
      // if user dosen't exsit => Create new Ueser
      const newUser = new User({
        email, password, name, avatar
      });
      // Create Hased Password
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(newUser.password, salt)
        .then( hashedPassword => {
          console.log(password);
          console.log(hashedPassword);
          console.log(salt);
          newUser.password = hashedPassword;
          // save the user into database
          newUser.save()
          .then(user => res.json(user))
          .catch(err => res.status(500).json({msg: 'there is error ecured during create user'}))
        });
      });
    });
});

//  @route    POST api/users/login
//  @desc     login user => Send Token
//  @access   Public
router.post('/login', (req, res) => {
  const { email, password} = req.body;
  const { errors, isValid} = validateLoginInput(req.body);
  if(!isValid) return res.status(400).json(errors);

  User.findOne({email})
    .then(user => {
      if(!user) return res.status(404).json({email: 'User Not Found'});
      // if User exsit compare the password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if( !isMatch ) return res.status(400).json({password: 'Password Incorrect'});
          const payload = {id: user.id, name: user.name, avatar: user.avatar};
          // send jsonWenToken
          jwt.sign(payload, secretOrPrivateKey, {expiresIn : "7d"}, (err, token) => {

            return res.json({msg: 'Success', token :"Bearer " +token});
          });
        });
    })
});

//  @route    POST api/users/current
//  @desc     Return current user
//  @access   Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  });
});

module.exports= router;
