import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

interface IProps {
    fbCallback: (response: any) => void;
    loading: boolean;
}

const SocialLogin: React.FC<IProps> = ({ fbCallback, loading }) => {
    return (
        <FacebookLogin
            appId="691009778138662"
            fields="name,email,picture"
            callback={fbCallback}
            render={(renderProps: any) => (
                [<Button
                    startIcon={<FacebookIcon fontSize="small"/>}
                    onClick={renderProps.onClick}
                    type="button"
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    { loading && <CircularProgress size="1.3rem" /> }
                    { !loading && 'Login with Facebook'}
                </Button>]
            )}
        />
    );
};

export default observer(SocialLogin);