import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          email: '',
          password: '',
          users: []
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
                username: response.data[4].username
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
    
    
      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }
    
        console.log(user);
    
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data));
    
   window.location = '/';
      }
    
      render() {
        return (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                required
                placeholder ="username"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            </div>
            <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
          </div>

          <div className="form-group"> 
            <label>Password: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
          </div>
            
            <div className="form-group">
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
    }