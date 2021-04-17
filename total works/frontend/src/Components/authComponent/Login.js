import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from '../../Redux/Actions/user'
import { Link } from 'react-router-dom'

import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
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
    }
}));


const login = () => {
    const classes = useStyles();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    // const loadContacts = useSelector(state => state.contactReducer.loadContacts)
    const dispatch = useDispatch()



    return (


        <div >
            <Container
                className={classes.cardContainer}
                maxWidth="xs"
            >
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Box
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between"
                            mb={3}
                        >
                            <div>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                >
                                    {"Sign in"}
                                </Typography>
                            </div>
                        </Box>
                        <Box
                            flexGrow={1}
                            mt={3}
                        >

                            <TextField
                                id="email_login"
                                fullWidth
                                autoFocus
                                label={"login"}
                                margin="normal"
                                name="email"
                                onChange={(e) => setLogin(e.target.value)}
                                value={login}
                                variant="outlined"
                            />
                            <TextField
                                id="password_login"
                                fullWidth
                                label={"password"}
                                margin="normal"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                value={password}
                                variant="outlined"
                            />

                            <Box mt={2}>
                                <Button
                                    id="login_button"
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={()=>dispatch(signIn(login,password))}
                                    disabled={!login || !password}
                                >
                                    {"signIn"}
                                </Button>
                            </Box>
                            <Box mt={2}>
                                <Button
                                    id="forgot_link"
                                    // component={RouterLink}
                                    to="/forgot-password"
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ padding: '4px' }}>
                                    {"forgot Password"}
                                </Button>
                            </Box>
                            <Link to="/Register">
                                sign up
                            </Link>


                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div >
    )
}

export default login
