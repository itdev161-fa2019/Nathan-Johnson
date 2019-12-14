import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ProfileSkeleton from '../utilties/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/userActions';


class user extends Component {
  state = {
    profile: null,
    postIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
  
    return (
      <Grid container spacing={10}>
        <Grid item sm={4} xs={10}>
          
        </Grid>
        <Grid item sm={4} xs={10}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
            
          )}
        </Grid>
      </Grid>
      
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);