const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users api works'}) );

//@route POST api/users/register
//@desc To Create new User
//@access Public
router.post('/register', (req, res) => {
  const { name, email, password} = req.body;
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
      bcrypt.genSalt(10, salt => {
        bcrypt.hash(newUser.password, salt , hashedPassword => {
          newUser.password = hashedPassword;
          // save the user into database
          newUser.save()
            .then(user => res.json(user))
            .catch(err => res.status(500).json({msg: 'there is error ecured during create user'}))
        });
      });
    })
    .catch( err => console.log( err));

});


module.exports= router;
