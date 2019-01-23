const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const validateProfileInput = require('../../validation/profile');
const User = mongoose.model('users');
const Profile = mongoose.model('profile');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile api works'}) );
// @route   GET api/profile/
// @desc    Get current profile
// @access  Private
router.get('/',  passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'password'])
    .then( profile => {
      if(!profile) return res.status(404).json({"noprofile" : "There is no Profile for this user"});
      res.json(profile);
    })
    .catch( err => console.log(err) );
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post( '/', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Check Validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // split skills to be array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social media accounts
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            return res.status(400).json({handle: "That handle already exists"});
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/handle:Handle
// @desc    get profile by handle
// @access  public
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) return res.status(404).json({noprofile: 'there is no profiles for this handle'});
      res.json(profile);
    }).catch(() => res.status(404).json({noprofile: 'there is no profiles for this handle'}))
});

// TODO:
// @route   GET api/profile/id:user_id
// @desc    get profile by userID
// @access  public
router.get('/id/:user_id', (req, res) => {
  Profile.findOne({user: req.params.user_id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) return res.status(404).json({noprofile: 'there is no profiles for this handle'});
    res.json(profile);
  }).catch(() => res.status(404).json({noprofile: 'there is no profile for this user_id'}))
});

// TODO:
// @route   GET api/profile/all
// @desc    get all profiles
// @access  public
router.get('/all', (req, res) => {
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(profiles.length < 1) return res.status(404).json({noprofile: 'there is no profiles for this handle'});
    res.json(profiles);
  }).catch(() => res.status(404).json({noprofile: 'there are no profiles'}))
});

module.exports= router;
