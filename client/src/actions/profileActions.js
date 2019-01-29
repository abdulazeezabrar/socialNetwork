import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';
import { logoutUser } from './authActions';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch( setPrfileLoading());

  axios.get('/api/profile')
    .then(({data}) => dispatch({type: GET_PROFILE, payload: data}) )
    .catch(error => dispatch({type: GET_PROFILE, payload: {}}))
}

export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then( res => history.push('/dashboard'))
    .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
};

export const deleteProfile = () => dispatch => {
  if(window.confirm('Are you sure? This is NOT be undone!'))
  axios.delete('/api/profile')
    .then( res => {
      // Reove from localStorage
      localStorage.removeItem("jwtToken");
      //remove user from redux
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    })
    .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
};


export const setPrfileLoading = () => {
  return{
    type: PROFILE_LOADING
  }
}

// Clear current profile
export const clearCurrentProfile = () => {
  return{
    type: CLEAR_CURRENT_PROFILE
  }
}
