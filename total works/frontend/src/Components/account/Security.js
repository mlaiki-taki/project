import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { changePassword } from '../../Redux/Actions/user'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {}
}));

const Security = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [password, setPassword] = useState("")
  const [oldPass, setOldPass] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")


  const handleSubmit = async () => {
    await dispatch(changePassword(oldPass,password))
  }
  return (

    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Change Password" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >

            <TextField
              fullWidth
              label="Old Password"
              name="oldPass"
              onChange={(e) => setOldPass(e.target.value)}
              type="password"
              value={oldPass}
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Password Confirmation"
              name="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              value={passwordConfirm}
              variant="outlined"
            />
          </Grid>
        </Grid>

      </CardContent>
      <Divider />
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="secondary"
          disabled={(password !== passwordConfirm) || !oldPass || !password || !passwordConfirm}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Change Password
              </Button>
      </Box>
    </Card>

  );
};

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
