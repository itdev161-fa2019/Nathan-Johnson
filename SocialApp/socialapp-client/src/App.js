import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

// theme import
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utilties/theme'

// jwt decoder
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/navbar';
import AuthRoute from './utilties/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile)

let authenticated;
// go to login page if there is no token
const token = localStorage.FBIdToken;
 if(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp*1000 < Date.now()) {
    window.location.href ='/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
 }

class App extends Component {
render() {
  return (
   <MuiThemeProvider theme={theme}>
   <div className="App">
   <Router>
   <Navbar/>
   <section className='container' key='container'>
     <Switch> 
       <AuthRoute exact path="/" key='home' component={home}/> 
       <AuthRoute exact path="/login" key='login' component={login} authenticated={authenticated}/> 
       <AuthRoute exact path="/signup" key='signup' component={signup} authenticated={authenticated}/> 
     </Switch>
   </section>
   </Router>
   </div>
   </MuiThemeProvider>
     );
}
}
export default App;
