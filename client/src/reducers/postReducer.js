import {GET_POST, GET_POSTS, POST_LOADING, ADD_POST, DELETE_POST, UPDATE_POST } from '../actions/types';
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== actions.payload._id)
      };
    case UPDATE_POST:
      const postIndex = state.posts.findIndex(post => post._id === actions.payload._id);
      state.posts[postIndex] = actions.payload;
      return{
        ...state,
        post: actions.payload
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
