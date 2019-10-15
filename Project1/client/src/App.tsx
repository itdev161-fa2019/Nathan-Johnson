import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Todos from './components/Todos';

class App extends React.Component {
state = {
  data: null,

  todos: [
    {
    id: 1,
    title: 'Take out the trash',
    completed: false
    },
    {
      id: 2,
      title: 'Learn Programming',
      completed: false
      },
      {
        id: 3,
        title: 'Change the World',
        completed: false
        }
  ]
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
    console.log(this.state.todos)
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
      The Beginning
      </header>



      <div className="local" >
      {this.state.data}
      </div>

      <div className="App">
        <Todos todos={this.state.todos}/>
      </div>


    </div>

  );

  
  
      
    
  


  }

}






export default App;
