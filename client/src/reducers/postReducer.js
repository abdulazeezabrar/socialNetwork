import {GET_POST, GET_POSTS, POST_LOADING, ADD_POST } from '../actions/types';
const initPost = {
  loading: false,
  posts: null,
  post: null
};

export default (state = initPost, actions) => {
  switch (actions.type) {
    case GET_POST:
    return {
      ...state,
      loading: false,
      post: actions.payload
    };
    case ADD_POST:
    return {
      ...state,
      posts: [actions.payload, ...state.posts]
    };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: actions.payload
      };
      case POST_LOADING:
       return {
         ...state,
         loading: true
       };
    default:
      return state;
  }
}
