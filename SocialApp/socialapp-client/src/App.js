import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

// theme import
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/navbar'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#546E7A' },
      secondary: { main: '#0288D1', contrastText: '#000000' }
    },
    typography: {
      useNextVariants: true,
    },

 
})


class App extends Component {
render() {
  return (
   <MuiThemeProvider theme={theme}>
   <div className="App">
   <Router>
   <Navbar/>
   <div className='container'>
     <Switch> 
       <Route exact path="/" component={home}/> 
       <Route exact path="/login" component={login}/> 
       <Route exact path="/signup" component={signup}/> 

     </Switch>
   </div>
   </Router>
   </div>
   </MuiThemeProvider>
  );
}
}
export default App;
