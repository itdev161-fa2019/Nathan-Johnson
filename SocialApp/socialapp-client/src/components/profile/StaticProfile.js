import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
      },
      card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
      padding: 25,
        minWidth: 150,
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
    
    }
});



const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, whatsapp, imageUrl, bio, location }
  } = props;
  
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <MuiLink
        component={Link}
        to={`/`}
        color="primary"
        variant="h5"
      >
        <Tooltip title="Back to Home" placement="top">
        <KeyboardReturn  color="primary">home</KeyboardReturn>
        </Tooltip>
        </MuiLink>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
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
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);