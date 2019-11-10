import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Profile = ({ authenticateUser }) => {
    let history = useHistory();

var user = localStorage.getItem('user');
console.log(user )

    return (
        <div>
        <h2>Your Profile</h2>
        <div>
        <div> 
        Username: <span> {user} </span>
        </div>
    
            <button>Log Out</button>
            </div>
            </div>
    )
    
    }
    
export default Profile;