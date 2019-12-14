import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

// theme import
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utilties/theme'

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// jwt decoder
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/navbar';
import AuthRoute from './utilties/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import smugglers from './pages/smugglers'

import axios from 'axios';

const theme = createMuiTheme(themeFile)


axios.defaults.baseURL = 'https://us-central1-social-media-app-f4e13.cloudfunctions.net/api';


// go to login page if there is no token
const token = localStorage.FBIdToken;
 if(token) {
  const decodedToken = jwtDecode(token);
   if(decodedToken.exp*1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href ='/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization']= token;
    store.dispatch(getUserData());
  }
 }

class App extends Component {
render() {
  return (
   <MuiThemeProvider theme={theme}>
   <Provider store={store}>
    <Router>
    <Navbar/>
      <section className='container' key='container'>
        <Switch> 
          <Route exact path="/" key='home' component={home}/> 
          <AuthRoute exact path="/login" key='login' component={login}/> 
          <AuthRoute exact path="/signup" key='signup' component={signup}/> 
          <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/post/:postId"
                  component={user}
                />
            <Route exact path="/smugglers" key='smugglers' component={smugglers}/> 
        </Switch>
      </section>
    </Router>
   </Provider>

   </MuiThemeProvider>
     );
}
}
export default App;
