import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, getListRegion } from '../../../Redux/Actions/user'
const useStyles = makeStyles(() => ({
  root: {}
}));

const GeneralSettings = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const regions = useSelector(state => state.user.regions)
  const user = useSelector(state => state.user.user)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [mobilePhone, setMobilePhone] = useState(user.mobilePhone)
  const [region, setRegion] = useState(user.region)


  useEffect(() => {
    dispatch(getListRegion())
  }, [dispatch])

  const handleSubmit = async () => {
    await dispatch(updateUser({region,mobilePhone,email,name}))
  }
  const handleRegion = async (event, newvalue) => {
    setRegion(event.target.value)
  }
  return (

      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                defaultValue={name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                type="email"
                value={email}
                defaultValue={email}

                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="mobilePhone"
                onChange={(e)=>setMobilePhone(e.target.value)}
                value={mobilePhone}
                defaultValue={mobilePhone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                getOptionLabel={(option) => option}
                options={regions}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    label="Region"
                    name="region"
                    value={region}
                    defaultValue={region}
                    onChange={handleRegion}
                    variant="outlined"
                    {...params}
                  />
                )}
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
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Save Changes
              </Button>
        </Box>
      </Card>

  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
