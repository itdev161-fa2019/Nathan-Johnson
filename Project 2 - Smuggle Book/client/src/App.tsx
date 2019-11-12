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
      user: null,
      email: null,
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
    this.setState({ user: null });
  }

  if (token) {
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    axios.get('http://localhost:5000/api/auth', config)
      .then((response) => {
        localStorage.setItem('user', response.data.name)
        localStorage.setItem('email', response.data.email)
        this.setState({ user: response.data.name })
        this.setState({ email: response.data.email })
      })
      .catch((error) => {
        localStorage.removeItem('user');
        this.setState({user: null});
        this.setState({email: null});
        console.error(`Error logging in: ${error}`);
      })
  }
}

logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  this.setState({ user:null, token: null})
}
  
render() {
  let { user, data } = this.state;
  let { email } = this.state;

  const authProps = {
    authenticateUser: this.authenticateUser
  }

  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Link className="webname" to="/">SmuggleBook</Link>
         <ul>
           <li>
            
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>

            {user ?
            <Link to="" onClick={this.logOut}>Log Out</Link> :
            <Link to="/login">Login</Link>
            }

          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

         </ul>
      </header>
      <main>
        <Route 
        exact path="/profile">
        {user ?
          <React.Fragment>
            <div> Hello {user} </div>
            <Profile {...authProps} />
          </React.Fragment> :
          <React.Fragment>
          <div> You must login to see your profile </div>
          </React.Fragment>      
        }
        </Route>
      
      

        <Switch>
       <Route 
          exact path="/register" 
          render={() => <Register {...authProps} />}/>

        <Route 
          exact path="/login"
           render={() => <Login {...authProps} />} />
        <Route 
          exact path="/">
           {user ?
            <React.Fragment>
              <div> Hello {user} </div>
              <div> Welcome to Smugglebook, the social network for smugglers </div>
            </React.Fragment> :
            <React.Fragment>
            <div> Welcome to smugglebook, login to search for a smuggler </div>
                        
            </React.Fragment>      
          }

          <React.Fragment>
          <img className="image" src="https://www.yourdictionary.com/images/definitions/lg/14467.smuggle.jpg" alt="Italian Trulli"></img>
              <img className="image" src="https://compote.slate.com/images/2b6fb34a-8047-4e17-b3d5-64987519657d.jpg"></img>
              <img className="image" src="https://images.ctfassets.net/7h71s48744nc/6tZcu7NTlCcAiwG4u08eYU/4d293d2bf232cfff5fc4e8bd3439d05f/war-dogs-large.jpeg"></img>
              <img className="image" src="data:image/jpeg;base64,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"></img>
              <img className="image" src="https://media.wired.com/photos/5932878126780e6c04d2c772/master/pass/ross-ulbricht.jpg"></img>
             
              
             <div>
            <section className="section">
              <form className="form" id="addItemForm">
               <input
                  type="text"
                  className="input"
                  id="addInput"
                  placeholder="Search for a smuggler..."
                  />
                 <button className="button is-info">
                    by name
                    </button>
                  </form>
                </section>
                </div>
          </React.Fragment>
           </Route>
            </Switch>
      </main>
      
    </div>
    </Router>
  );
}
}

export default App;
