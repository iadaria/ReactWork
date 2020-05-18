import React, { useContext, Fragment } from 'react';
import './home-page.sass';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/login-form';
import RegisterForm from '../user/register-form';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    return (
        <Box className="home-page">
            <Box className="logo-wrapper">
                <img width="70" src="/assets/logo.png" alt="logo" />
                <Typography component="h1">
                    Reactivities
                </Typography>
            </Box>

            {isLoggedIn && user ? (
                <Fragment>
                    <Typography component="h2">
                        {`Welcome back ${user.displayName}`}
                    </Typography>
                    <Typography className="btn" component="h3">
                        <Link to='/activities'>
                            Go to activities!
                        </Link>
                    </Typography>
                </Fragment>
            ) : (   
                <Fragment>
                    <Typography component="h2">
                        Welcome to Reactivities
                    </Typography>
                    <Button 
                        className="btn"
                        onClick={() => openModal(<LoginForm />)}
                    >
                        Login
                    </Button>
                    <Button 
                        className="btn"
                        onClick={() => openModal(<RegisterForm />)}
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
};


export default observer(HomePage);