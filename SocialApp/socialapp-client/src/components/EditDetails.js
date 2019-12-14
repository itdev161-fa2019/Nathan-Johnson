import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../utilties/MyButton';


//redux
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';

//Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    
    button: {
      float: 'right'
    }
  });
  
class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        whatsapp: '',
        open: false
    };
    mapUserDetailsToState = (credentials) => {
      this.setState({
        bio: credentials.bio ? credentials.bio : '',
        whatsapp: credentials.whatsapp ? credentials.whatsapp : '',
        location: credentials.location ? credentials.location : ''
      });
    };

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = () => {
        const userDetails = {
          bio: this.state.bio,
          whatsapp: this.state.whatsapp,
          location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
      };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
            <MyButton
            tip="Edit Details"
            onClick={this.handleOpen}
            btnClassName={classes.button}
          >
            <EditIcon color="primary" />
          </MyButton>

                <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="whatsapp"
                tpye="text"
                label="Whatsapp"
                placeholder="Your whatsapp"
                className={classes.textField}
                value={this.state.whatsapp}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you smuggle"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>


            </Fragment>
        )
    }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));