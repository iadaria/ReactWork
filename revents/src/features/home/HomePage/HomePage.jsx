import React, { Fragment } from 'react';
import './home-page.sass';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
//import LoginForm from '../user/login-form';
//import RegisterForm from '../user/register-form';

export default function HomePage({ history }) {
    const isLoggedIn = false;
    const user = null;
    const token = null;

    return (
        <Box className="home-page">
            <Box className="logo-wrapper">
                <img width="70" src="/assets/logo.png" alt="logo" />
                <Typography component="h1">
                    Re-vents
                </Typography>
            </Box>

            <Button
                className="btn btn-start"
                onClick={() => history.push('/events')}  
                //endIcon={<ArrowForwardIcon />}
            >
                Get started
                <ArrowForwardIcon className="arrow" fontSize="small" />
            </Button>

            {isLoggedIn && user && token ? (
                <Fragment>
                    <Typography component="h2">
                        {`Welcome back ${user.displayName}`}
                    </Typography>
                    <Typography component="h3">
                        <Link to='/events'>
                            Go to eventss!
                        </Link>
                    </Typography>
                </Fragment>
            ) : (
                    <Fragment>
                        <Typography component="h2">
                            Welcome to Re-vents
                    </Typography>

                        <Button
                            className="btn"
                        //onClick={() => openModal(<LoginForm />)}
                        >
                            Login
                    </Button>

                    <Button
                            className="btn"
                        //onClick={() => openModal(<RegisterForm />)}
                        >
                            Register
                    </Button>
                        {/* <Typography className="btn" component="h3">
                        <Link to='/login'>
                            Login
                        </Link>
                    </Typography> */}
                        {/* <Typography component="h3">
                        <Link to='/register'>
                            Register
                        </Link> 
                    </Typography>*/}
                    </Fragment>
                )}

        </Box>
    );
}
