import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

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


// Add experience
export const addExperience = (ExpData, history) => dispatch => {
  axios.post('api/profile/experience', ExpData)
    .then(res => history.push('/dashboard'))
    .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}

// Add education
export const addEducation = (EduData, history) => dispatch => {
  axios.post('api/profile/education', EduData)
    .then(res => history.push('/dashboard'))
    .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}

// Delete experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`api/profile/experience/${id}`)
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}

// Delete experience
export const deleteEducation = (id) => dispatch => {
  axios.delete(`api/profile/education/${id}`)
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}
