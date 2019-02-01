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
    .then( post => res.status(200).json(post) )
    .catch(() => res.status(500).json({msg: 'error ecueard while create new Post'}));
});

// @route   GET api/posts
// @desc    GET all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({noPostsFound: 'No posts Found'}));
});

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
  .then(post => {
    if(!post) return res.status(404).json({noPostFound: 'No post Found'});
    res.json(post)
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userID = req.user.id;
  const postID = req.params.post_id;
  Post.findOneAndRemove({user: userID, _id: postID})
  .then(deletedPost => {
    if(!deletedPost) return res.status(404).json({noPostFound: 'No post Found'});
    res.json(deletedPost);
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});

// @route   POST api/posts/like/:post_id
// @desc    like post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userID = req.user.id;
  const postID = req.params.post_id;
  Post.findById( postID )
  .then(post => {
    if(!post) return res.status(404).json({noPostFound: 'No post Found'});
    if(post.likes.filter( like => like.user.toString() === userID).length > 0 ){
      res.json({youAlredyLiked : 'You already liked this post'});
    } else{
      post.likes.unshift({user: userID});
      post.save()
        .then( post => res.json(post))
    }
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});

// @route   POST api/posts/unlike/:post_id
// @desc    unlike post
// @access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userID = req.user.id;
  const postID = req.params.post_id;
  Post.findById( postID )
  .then(post => {
    if(!post) return res.status(404).json({noPostFound: 'No post Found'});
    // if there is like
    if(post.likes.filter( like => like.user.toString() === userID).length > 0 ){
      post.likes = post.likes.filter( like => like.user.toString() !== userID);
      post.save()
      .then( post => res.json(post));
    } else{ // if there isn't like;
    res.json({youDidntLikeYet : 'you Did\'t linked Yet ' });
    }
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // the add comment validation is the same with add post validation
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const userID = req.user.id;
  const postID = req.params.post_id;
  Post.findById( postID )
  .then(post => {
    if(!post) return res.status(404).json({noPostFound: 'No post Found'});
    if(post.comments.filter( comment => comment.user.toString() === userID).length > 0 ){
      res.json({youAlredyCommented : 'You already commented this post'});
    } else{
      post.comments.unshift({
        user: userID,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
      });
      post.save()
        .then( post => res.json(post))
    }
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delte comment from post
// @access  Private
router.delete('/comment/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userID = req.user.id;
  const postID = req.params.post_id;
  Post.findById( postID )
  .then(post => {
    if(!post) return res.status(404).json({noPostFound: 'No post Found'});
    // if there is comment
    if(post.comments.filter( comment => comment.user.toString() === userID).length > 0 ){
      post.comments = post.comments.filter( comment => comment.user.toString() !== userID);
      post.save()
      .then( post => res.json(post));
    } else{ // if there isn't comment;
    res.json({youDidntCommentedYet : 'you Did\'t comment Yet ' });
    }
  })
  .catch(err => res.status(404).json({noPostFound: 'No post Found'}));
});


module.exports= router;
