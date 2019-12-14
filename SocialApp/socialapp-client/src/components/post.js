import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
// date formatter
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Mui card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


//redux
import { connect } from 'react-redux';


//componets
import {likePost, unlikePost } from '../redux/actions/dataActions';
import DeletePost from './post/DeletePost';
import LikeButton from './LikeButton';
import PostDialog from './post/postDialog';

const styles ={
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
}

export class Post extends Component {
  
      render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            comments,
            post: {
              body,
              createdAt,
              userImage,
              userHandle,
              postId,
              likeCount,
              commentCount
            },
            user: {
              authenticated,
              credentials: { handle }
            },
            
          
          
          } =  this.props;
      
          const deleteButton =
          authenticated && userHandle === handle ? (
            <DeletePost postId={postId} />
          ) : null;
 let obj = []

if (comments){
findObjectByKey(comments, 'postId' , postId);

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
          obj.push(array[i]);
      }
  }
  return null;
}
}
        return (
           <Card className={classes.card}>
            <CardMedia
            image={userImage}
            title="Profile Image" 
            className={classes.image}/> 
                <CardContent className={classes.content}>
                
                    <Typography
                        variant="h5"
                        color="primary" 
                        component= {Link}
                        to={`/users/${userHandle}`}
                        key={userHandle}>
                     
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary"> 
                    {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant="body1">{body}</Typography>

                    <LikeButton postId={postId} />

                    <span>{likeCount} Likes</span>

                    <PostDialog
                    postId={postId} 
                    userHandle={userHandle}
                    ></PostDialog>

                    
                   <span>{commentCount} Comments</span>
            
           
                  {obj.map((comment, index) => {
                    const { body, createdAt,  userImage, userHandle } = comment;
                    return (
                      <Fragment key={createdAt}>
                        <Grid item sm={12}>
                          <Grid container>
                            <Grid item sm={2}>
                            <img
                            src={userImage}
                            alt="comment"
                            className={classes.commentImage}
                          />
                            </Grid>
                            <Grid item sm={9}>
                              <div className={classes.commentData}>
                                <Typography
                                  variant="h5"
                                  component={Link}
                                  to={`/users/${userHandle}`}
                                  color="primary"
                                >
                                  {userHandle}
                                </Typography>
                                <Typography variabnt="body1" className={classes.body}>{body}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                                <hr className={classes.invisibleSeparator} />
                               
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        {index !== comments.length - 1 && (
                          <hr className={classes.visibleSeparator} />
                        )}
                      </Fragment>
                    );
                  })}

                    </CardContent>
                
           </Card>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });

  const mapActionsToProps = {
      likePost,
      unlikePost

  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
