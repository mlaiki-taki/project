import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Box,
    Button,
    TextField,
    makeStyles,
    Card,
    CardContent,
    Container
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { signUp, getListRegion } from '../../Redux/Actions/user'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    banner: {
        backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    bannerChip: {
        marginRight: theme.spacing(2)
    },
    methodIcon: {
        height: 30,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    cardContainer: {
        paddingBottom: 80,
        paddingTop: 80,
    },
    cardContent: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        minHeight: 400
    },
    currentMethodIcon: {
        height: 40,
        '& > img': {
            width: 'auto',
            maxHeight: '100%'
        }
    },
    menuItem: {
        padding: 0,
        width: '100%',
        margin: 0
    },
}));

const Register = ({ className, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const regions = useSelector(state => state.user.regions)
    useEffect(() => {
        dispatch(getListRegion())
    }, [dispatch]);
    const handleInput = evt => {
        let newData = data
        newData[evt.target.name] = evt.target.value;
        setData(newData)
    };
    const handleRegiter = async () => {
         dispatch(signUp(data))
    }
    return (
        <Container
            className={classes.cardContainer}
            maxWidth="xs"
        >
            <Card>
                <CardContent className={classes.cardContent}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        name="name"
                        onChange={handleInput}
                        value={data.name}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onChange={handleInput}
                        type="email"
                        value={data.email}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={handleInput}
                        type="password"
                        value={data.password}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="mobilePhone"
                        margin="normal"
                        name="mobilePhone"
                        onChange={handleInput}
                        type="text"
                        value={data.mobilePhone}
                        variant="outlined"
                    />
                    <Autocomplete
                        getOptionLabel={(option) => option}
                        options={regions}
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                label="Region"
                                name="region"
                                onChange={handleInput}
                                variant="outlined"
                                {...params}
                            />
                        )}
                    />

                    <Box mt={2}>
                        <Button
                            color="secondary"
                            // disabled={}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleRegiter}
                        >
                            Register
                                 </Button>
                    </Box>
                </CardContent>
            </Card >
        </Container >
    );
};



export default Register;
