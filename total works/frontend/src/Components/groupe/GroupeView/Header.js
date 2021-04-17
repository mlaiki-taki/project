import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux'
import {SetGroupConnection} from '../../../Redux/Actions/user'
const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: 'relative',
    height: 460,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute'
  },
  action: {
    marginLeft: theme.spacing(1)
  }
}));

const Header = ({ className, profile, ...rest }) => {
  const classes = useStyles();
  const dispatch=useDispatch()
  const user = useSelector(state => state.user.user)
  const intialStatus = user.connectedGroup.find(i => i?.groupe === profile._id) ? user.connectedGroup.find(i => i?.groupe === profile._id).connectedStatus : 'not_connected'
  const [connectedStatus, setConnectedStatus] = useState(intialStatus);
  useEffect(() => {
    setConnectedStatus(intialStatus)
  }, [user]);

  const handleConnectToggle = () => {
    switch (connectedStatus) {
      case 'not_connected':
        {
         dispatch(SetGroupConnection("pending",user._id,profile._id))
        }
        break;
      case 'pending':
        {
          dispatch(SetGroupConnection("not_connected",user._id,profile._id))

        }
        break;
      case 'connected':
        {
          dispatch(SetGroupConnection("not_connected",user._id,profile._id))
        }
        break;
        default : return null;
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${profile.avatar})` }}
      >
        <Button
          className={classes.changeButton}
          variant="contained"
          startIcon={<AddPhotoIcon />}
        >
          Change Cover
        </Button>
      </div>
      <Container maxWidth="lg">
        <Box
          position="relative"
          mt={1}
          display="flex"
          alignItems="center"
        >
          <Typography
            variant="h4"
            color="textPrimary"
          >
            {profile.name}
          </Typography>
          {/* </Box> */}
          <Box flexGrow={1} />
          <Hidden smDown>
            {connectedStatus === 'not_connected' && (
              <Button
                onClick={handleConnectToggle}
                size="small"
                variant="outlined"
                className={classes.action}
              >
                join group
              </Button>
            )}
            {connectedStatus === 'pending' && (
              <Button
                onClick={handleConnectToggle}
                size="small"
                variant="outlined"
                className={classes.action}
              >
                cancel request
              </Button>
            )}
            {connectedStatus === 'connected' && (
              <Button
                onClick={handleConnectToggle}
                size="small"
                variant="outlined"
                className={classes.action}
              >
                quit groupe
              </Button>
            )}
          </Hidden>

          <Tooltip title="More options">
            <IconButton className={classes.action}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default Header;
