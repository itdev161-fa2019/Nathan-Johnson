import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

import MyButton from '../utilties/MyButton';
// Material UI imports
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
//component import
import PostPost from '../components/post/PostPost';
import Notifications from './notifications';


// Icons
import HomeIcon from '@material-ui/icons/Home';


class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <div>
                <AppBar>
                    <ToolBar >
                    <h3>SmuggleBook</h3>

                    {authenticated ? (
                        <Fragment>
                        <div className="nav-container" >
                          <Link to="/">
                          <PostPost />
                            <MyButton tip="Home">
                              <HomeIcon />
                            </MyButton>
                          </Link>
                          <Link to="/smugglers">
                            <MyButton tip="Find A Smuggler">
                              <HowToRegIcon />
                            </MyButton>
                          </Link>
                        
                          <Notifications />
                          </div>
                        </Fragment>
                      )
                
                    :(
                        <Fragment>
                        <div className="nav-container" >
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                        </div>
                        </Fragment>

                        )}



                    </ToolBar>
                </AppBar>
            </div>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });
  
  export default connect(mapStateToProps)(Navbar);