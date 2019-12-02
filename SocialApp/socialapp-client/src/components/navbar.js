import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../App.css';
// Material UI imports
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class navbar extends Component {
    render() {
        return (
            <div>
                <AppBar>
                    <ToolBar>
                    <h3>SmuggleBook</h3>
                        <div className="nav-container" >
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                        </div>
                    </ToolBar>
                </AppBar>
            </div>
        )
    }
}

export default navbar
