import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Post from '../components/post';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getPosts, getComments } from '../redux/actions/dataActions';
import { getUserData } from '../redux/actions/userActions';



export class home extends Component {
    componentDidMount(){
        this.props.getPosts();
        this.props.getComments();
    
    }
    render() {
        const {posts, comments, loading} =this.props.data;
        let recentPosts = !loading ? (
    
          
            posts.map((post) => <Post key={post.postId} post={post} comments={comments}/>
            
               
            )
        ) : (<h4>Loading.....</h4>);
        return (
          <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
            <span>{recentPosts}</span>
         
            </Grid>
            <Grid item sm={4} xs={12}>
            <Profile/>
            </Grid>
          </Grid>
        );
    }
}

home.propTypes = {
  getComments: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  

  export default connect(
    mapStateToProps,
    { getPosts, getComments, getUserData}
  )(home);