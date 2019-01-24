const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose= require('mongoose');
const Post = mongoose.model('post');
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Posts api works'}) );

// // TODO: Working...
// @route   POST api/posts
// @desc    create Post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}) ,(req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const newPost = new Post({
    user: req.user.id,
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar
  });
  newPost.save()
    .then( post => res.json(post) )
    .catch(() => res.status(500).json({msg: 'error ecueard while create new Post'}));
});


module.exports= router;
