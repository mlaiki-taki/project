import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import PostAdd from '../../../PostAdd';
import PostCard from '../../../PostCard';
import About from './About';
import {getPostsByGroupId} from '../../../../Redux/Actions/user'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {}
}));

const Timeline = ({ className, profile, group_id, ...rest }) => {
  const classes = useStyles();
  const posts = useSelector(state => state.user.posts)
  const dispatch = useDispatch()

 const  getPosts=()=>{
  dispatch(getPostsByGroupId(group_id)) 
 }
  useEffect(() => {
    dispatch(getPostsByGroupId(group_id))
  }, [profile]);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          {/* <About profile={profile} /> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={8}
        >
          <PostAdd group_id={group_id} getPosts={getPosts} />
          {posts.map((post) => (
            <Box
              mt={3}
              key={post.id}
            >
              <PostCard post={post} getPosts={getPosts} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

Timeline.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default Timeline;
