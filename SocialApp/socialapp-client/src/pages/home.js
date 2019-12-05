import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Post from '../components/post'

export class home extends Component {
    state = {
        posts: null
    };
    componentDidMount(){
        axios
        .get('/posts')
            .then((res) =>{
                this.setState({
                    posts: res.data
                });
            })
            .catch((err) => 
                console.log(err))
    }
    render() {
        let recentPosts = this.state.posts ? (
            this.state.posts.map(
                (post) => <Post key={post.postsId} post={post}/>)
        ) : (<h4>Loading.....</h4>);
             
        return (
          <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
            <span>{recentPosts}</span>
            </Grid>
            <Grid item sm={4} xs={12}>
            <p> Profile </p>
            </Grid>
          </Grid>
        )
    }
}

export default home
