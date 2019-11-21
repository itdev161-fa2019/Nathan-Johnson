import React, { } from 'react';
//import axios from 'axios';
//import { useHistory } from 'react-router-dom';

const Profile = ({ authenticateUser }) => {

var user = localStorage.getItem('user')
var email = localStorage.getItem('email')


return (
    <div>
    <h2> Your Profile </h2>
    <h5> Username: {user} </h5>
    <h5> Email: {email} </h5>
    <h5> Add a Profile Picture:</h5>
    <input 
    type='file' 
    name="Profile Picture"
       accept="image/png, image/jpeg"
    placeholder="Upload a Profile Picture"
    />

    <div>
    <h5> Add a Tagline:</h5>
    <section className="section">
              <form className="form" id="addItemForm">
               <input
                  type="text"
                  className="input"
                  id="addInput"
                  placeholder='"Anything For A Price"'
                  />
                 <button className="button is-info">
                    add
                    </button>
                  </form>
                </section>

    </div>

    </div>
    )
}

export default Profile;