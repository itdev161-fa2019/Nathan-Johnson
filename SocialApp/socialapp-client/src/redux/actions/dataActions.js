import {
    SET_POSTS,
    LOADING_DATA,
    SET_ERRORS,
    POST_POST,
    SET_POST,
    LOADING_UI,
    LIKE_POST,
    UNLIKE_POST,
    STOP_LOADING_UI,
    CLEAR_ERRORS,
    DELETE_POST,
    SUBMIT_COMMENT,
    SET_POST_INFO,

  } from '../types';
  import axios from 'axios';
  
  // Get all posts
  export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/posts')
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => {
        dispatch({
          type: SET_POSTS,
          payload: []
        });
        dispatch({ type: STOP_LOADING_UI });
      });
  };

  //get all comments
  export const getComments = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/comments`)
      .then((res) => {
        dispatch({
          type: SET_POST_INFO,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };


  // Post a Post
  export const postPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/post', newPost)
      .then((res) => {
        dispatch({
          type: POST_POST,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  // Like a post
export const likePost = (postId) => (dispatch) => {
 
    axios
      .get(`/post/${postId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(`${err} it didn't work`));
  };


  // Unlike a post
  export const unlikePost = (postId) => (dispatch) => {
    console.log(postId)
    axios
      .get(`/post/${postId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  //clear errors
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // delete Post 
  export const deletePost = (postId) => (dispatch) => {
    axios
      .delete(`/post/${postId}`)
      .then(() => {
        dispatch({ 
          type: DELETE_POST, 
          payload: postId });
      })
      .catch((err) => console.log(err));
  };

  // view (Get) one Post
export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/post/${postId}`)
      .then((res) => {
        dispatch({
          type: SET_POST,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };





  // Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};