import { 
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    GET_USERS
} from '../types';
import axios from 'axios';

//Login Action
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/login', userData)
        .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
        })
        .catch(err => {
            dispatch ({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

//Signup Action
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/signup', newUserData)
        .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
        })
        .catch(err => {
            dispatch ({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}


// logout Action
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

// get user data
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/user')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  

  // get All Users
export const getAllUsers= () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/users')
      .then((res) => {
        dispatch({
          type: GET_USERS,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

// authorization helper function
const setAuthorizationHeader = (token) => {
    const FBIdToken =`Bearer ${token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
};

// image uploader action 

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err=> console.log(err));
};

// edit user details action 
export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user', userDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(`${err} the ship is sinking`));  
  };

  // Mark Notifications read 
  export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
      .post('/notifications', notificationIds)
      .then((res) => {
        dispatch({
          type: MARK_NOTIFICATIONS_READ
        });
      })
      .catch((err) => console.log(err));
  };