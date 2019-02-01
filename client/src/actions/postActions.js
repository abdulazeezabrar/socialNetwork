import axios from 'axios';
import {GET_POST, GET_POSTS, GET_ERRORS, POST_LOADING, ADD_POST } from './types';

// Add Post
export const addPost = postData => dispatch => {
  axios.post('/api/posts', postData)
    .then(res => dispatch({type: ADD_POST, payload: res.data}))
    .catch(error =>  dispatch({type: GET_ERRORS, payload: error.response.data}));
}

// get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios.get('/api/posts')
  .then(res => dispatch({type: GET_POSTS, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

// get Post by Id
export const getPostById = (id) => dispatch => {
  dispatch(setPostLoading());
  axios.get(`/api/posts/${id}`)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

// Delete Post by Id
export const DeletePostById = (id) => dispatch => {
  axios.delete(`/api/posts/${id}`)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

// likePost
export const likePost = (id) => dispatch => {
  axios.post(`/api/posts/like/${id}`)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}
// unlike Post
export const unLikePost = (id) => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

// Comment to post
export const commentToPost = (id, commentData) => dispatch => {
  axios.post(`/api/posts/comment/${id}`, commentData)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

// Delete Comment
export const DeleteCommentPost = (id) => dispatch => {
  axios.delete(`/api/posts/comment/${id}`)
  .then(res => dispatch({type: GET_POST, payload: res.data}))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

export const setPostLoading = () => {
  return{
    type: POST_LOADING
  }
}
