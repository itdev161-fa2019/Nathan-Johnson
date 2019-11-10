import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

class App extends React.Component {
    state = {
      data: null,
      token: null,
      user: null
    }

componentDidMount() {
  axios.get('http://localhost:5000')
  .then((response) => {
    this.setState ({
      data: response.data
    })
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error}`);
  })

  this.authenticateUser();

}

authenticateUser = () => {
  const token = localStorage.getItem('token');
  if(!token) {
    localStorage.removeItem('user')
    this.setState({ user: null })
  }
  if(token){
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    axios.get('http://localhost:5000/api/auth', config)
    .then((response) => {
      localStorage.setItem('user', response.data.name)
      this.setState({ user: response.data.name })
    })
    .catch((error)=> {
      localStorage.removeItem('user');
      this.setState({ user: null });
      console.error(`Error logging in: ${error}`);
    })
  }
}

logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user');
  this.setState({ user: null, token: null });
}
  
render() {
  let { user, data } = this.state;
  const authProps = {
    authenticateUser: this.authenticateUser
  }
  return (
    <Router>
    <div className="App">
      <header className="App-header">
         <h4>SmuggleBook</h4>
         <ul>
           <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="" onClick={this.logOut}>Log out</Link>
            <Link to="/Login"> Log in</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

         </ul>
      </header>
      <main>
        <Route exact path="/">
          {user ?
          <React.Fragment>
            <div>Hello {user}!</div>
            <div> {data} </div>
            <Link to="/profile"> Go to Your Profile</Link>
          </React.Fragment> :
        <React.Fragment>
          Please Register or Login
        </React.Fragment>  
        
        }

   
   
        </Route>

        <Switch>
       <Route 
        exact path="/register"
        render={() => <Register {...authProps} />} />

        <Route 
        exact path="/login" 
        render={() => <Login {...authProps} />} />

        
        </Switch>



        <Route 
        exact path="/profile" 
        render={() => <Profile {...authProps} />} />

        </main>
      
    </div>
    </Router>
  );
}
}

export default App;
