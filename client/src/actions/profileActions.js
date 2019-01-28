import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch( setPrfileLoading());

  axios.get('/api/profile')
    .then(({data}) => dispatch({type: GET_PROFILE, payload: data}) )
    .catch(error => dispatch({type: GET_PROFILE, payload: {}}))
}


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
