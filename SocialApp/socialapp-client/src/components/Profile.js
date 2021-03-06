import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from '../components/EditDetails';

//MUI 
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import { getUserData } from '../redux/actions/userActions';
// icons 
import LocationOn from '@material-ui/icons/LocationOn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


//styles
const styles = (theme) => ({
    paper: {
        padding: 20
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
          width: 225,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
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
      }
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
      };
      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
      
      handleLogout = () => {
          this.props.logoutUser()
      };

  
      
    render() {
        const {classes, user: {credentials: { handle, createdAt, imageUrl, bio, location, whatsapp }, 
        
        authenticated
            }
        } = this.props;


        let profileMarkup = 
            authenticated ? (
            <Paper className ={classes.paper}>
                <div className={classes.profile}>
                <div  className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile" />
                    <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                  />
                  <Tooltip title="Edit Profile Picture" placement="top">
                  <IconButton onClick={this.handleEditPicture} className="button">
                    <EditIcon color="primary"/>
                  </IconButton>
                  </Tooltip>
                </div>
                    <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                       <div>{handle}</div> 
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">"{bio}"</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                        <LocationOn color="primary"/><span>{location}</span>
                        <hr/>
                        </Fragment>
                    )}
                    
                       {whatsapp && (
                        <Fragment>
                            <WhatsAppIcon color="primary"/>
                            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                                {''}{whatsapp}
                            </a> 
                          
                            <hr/>
                        </Fragment>
                          )}

                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>

                    <Tooltip title="logout" placement='top'>
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip>
                        <EditDetails/>
                </div>
            </Paper>
            ):(
                <Paper className={classes.paper}>
                <div className={classes.profile}>
                <div  className="image-wrapper">
                <img className="profile-image" src="https://firebasestorage.googleapis.com/v0/b/social-media-app-f4e13.appspot.com/o/defaultProfile.jpg?alt=media" alt="profile" />
            </div>
                <Typography variant="body2" align='center'>
                "The Social Network for Smugglers"
                </Typography>
                <div className={classes.buttons}>
                <Button variant='contained' color="primary" component={Link} to='/login'>
                Login
                </Button>
                
                <Button variant='contained' color="secondary"  component={Link} to='/signup'>
                Signup
                </Button>
                </div>
                </div>
                </Paper>
            )
       

        return profileMarkup;
    }
}

const mapStateToProps = (state) =>  ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage, getUserData };
 
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
