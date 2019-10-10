import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
state = {
  data: null
}

componentDidMount () {
  axios.get('http://localhost:5000')
    .then((response) => {
      this.setState({data: response.data})
    })
    

    .catch((error) => {
      console.error('Error fetching data ${error}');
    })
}

  render() {
  return (
    <div className="App">
      <header>
        <div className="App-header">
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        <img src={logo}  className="App-logo" alt="logo"/>
        </div>
      Good Things 
      </header>

      <div className="local" >
      {this.state.data}
      </div>

    </div>
  );
  }

}




export default App;
