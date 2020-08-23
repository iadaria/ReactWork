import './social-login.scss';
import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleLogo from './google.svg';
import Divider from '@material-ui/core/Divider';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../app/common/modals/modalReducer';
import { socialLogin } from '../../../app/firestore/firebaseService';


export default function SocialLogin() {
    const dispatch = useDispatch();

    function handleSocialLogin(provider) {
        dispatch(closeModal());
        socialLogin(provider);
    }
    
    return (
        <div className="social-login">

            <Divider className="divider"/>

            <Button
                onClick={() => handleSocialLogin("facebook")}
                size="medium"
                color="primary"
                variant="contained"
                startIcon={<FacebookIcon fontSize="large"/>}
            >
                Login with Facebook
            </Button>
            <Button
                onClick={() => handleSocialLogin("google")}
                className="btn-google-login"
            >
                <img style={{marginRight: 10}} width="20" height="20" src={GoogleLogo} alt="google login"/>
                Login with Google
            </Button>
        </div>
    );
}