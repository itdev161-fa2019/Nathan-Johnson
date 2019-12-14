import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


import { connect } from 'react-redux';
import { getPosts, getComments } from '../redux/actions/dataActions';
import { getAllUsers } from '../redux/actions/userActions';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

// icons 
import LocationOn from '@material-ui/icons/LocationOn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CalendarToday from '@material-ui/icons/CalendarToday';

//mui
import TextField from '@material-ui/core/TextField';

//styles
const styles = (theme) => ({
   
    paper: {
        paddingTop: 10,
        paddingBottom: 10,
        margin: '1%',
        float: 'left',
        width: '30%',
    height: '410px',
      },
      profile: {

        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
       
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 150,
            height:150,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            
          },
          '& a': {
            color: '#a8601a',
            fontWeight: 600,
            letterSpacing: 3
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
      card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
      padding: 25,
        maxWidth: 150,
        maxHeight: 160,

    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    commentImage: {
      maxWidth: '100%',
      height: 50,
      objectFit: 'cover',
      borderRadius: '50%'
    },
    commentData: {
      marginLeft: 10
    },
    body: {
    
    },
    
    profileImage: {
        width: 100
    },
    textField: {
        width: '78%',
        margin: 20
    },
    SearchIcon:{
        display: 'none'
    }
});
let usersArray=[]
let searchArray= [];


class smugglers extends Component {

    state = {
        body: '',
        errors: {}
      };
        componentDidMount(){
            this.props.getPosts();
            this.props.getComments();
            this.props.getAllUsers()
        };

          handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
       
        Search = (searchInput) => {
            var i;
            for (i = 0; i < usersArray.length; i++) { 
                if(usersArray[i].userHandle.includes(searchInput)){
                
                    searchArray.push(usersArray[i])
                    console.log(searchArray[0].userHandle)
                    window.location.replace(`/users/${searchArray[0].userHandle}`)
                }
            }
          
        };


        handleSubmit = (event) => {
    event.preventDefault();
    this.Search(this.state.body);
    console.log(this.state.body)
    const lower = this.state.body;
    const upper = lower.charAt(0).toUpperCase() + lower.substring(1);
    console.log(upper)
    this.Search(upper)

  };
        
        render() {

            const {
                classes,
                
              } = this.props;
        
           

            if (this.props.users) {
                
                usersArray= this.props.users

            };

       

           
            return (

              <Grid container spacing={10}>
           
              <Grid item sm={1}></Grid>
                <Grid item sm={10} xs={10}>
                
                <div className={classes.TextField}>
                <form onSubmit={this.handleSubmit}>
                <TextField
                name="body"
                type="text"
                label="Search For A Smuggler"
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
                >
                </TextField> 
                </form>
                
                </div>
           

                
                {usersArray.map((user, index) => {
                    
                    const {  userHandle, createdAt, whatsapp, userImage, bio, location } = user;
                    return (
                        <Paper key={createdAt} className={classes.paper}>
                        <div className={classes.profile}>
                          <div className="image-wrapper">
                            <img src={userImage} alt="profile" className="profile-image" />
                          </div>
                          <MuiLink
                          component={Link}
                          to={`/`}
                          color="primary"
                          variant="h5"
                        >
                       <div></div>
                          </MuiLink>
                          <hr />
                          <div className="profile-details">
                            <MuiLink
                              component={Link}
                              to={`/users/${userHandle}`}
                              color="primary"
                              variant="h5"
                            >
                              @{userHandle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {location && (
                              <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr />
                              </Fragment>
                            )}
                            {whatsapp && (
                              <Fragment>
                                <WhatsAppIcon color="primary" />
                                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                                  {whatsapp}
                                </a>
                                <hr />
                              </Fragment>
                            )}
                            <CalendarToday color="primary" />{' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                          </div>
                        </div>
                      </Paper>
                   
                  
                                
                    );
                  })}
             
                </Grid>
             
              </Grid>
            );
        }
    }
    
    smugglers.propTypes = {
        classes: PropTypes.object.isRequired,
      getAllUsers: PropTypes.func.isRequired,
          data: PropTypes.object.isRequired,
    
      };
      
      const mapStateToProps = (state) => ({
     
        data: state.data,
        users: state.user.users,
   
      });
      
    
      export default connect(
        mapStateToProps,
        { getPosts, getComments, getAllUsers }
      )(withStyles(styles)(smugglers));