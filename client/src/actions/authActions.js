import axios from 'axios';
import { GET_ERRORS , SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {

  axios.post('/api/users/register', userData)
  .then( data => {
    history.push('/login');
  })
  .catch( err => dispatch({
    type: GET_ERRORS,
    payload :err.response.data
  }));
}

export const loginUser = (userData) => dispatch => {

  axios.post('/api/users/login', userData)
  .then( res => {
    // save to localstorage
    const {token } = res.data;
    //set token to localstorage
    localStorage.setItem('jwtToken', token);
    // set token to authe header
    setAuthToken(token);
    // decode token to get user data
    const decode = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decode));
  })
  .catch( err => dispatch({
    type: GET_ERRORS,
    payload :err.response.data
  }));
}

// Set current user (create object to dispatch it)
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
}

export const logoutUser = () => dispatch => {
  // remove localStorage from token
  localStorage.removeItem("jwtToken");
  // remove token from header
  setAuthToken(false);
  //remove user from redux
  dispatch(setCurrentUser({}));
}
