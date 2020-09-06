import './unauth-modal.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { openModal } from '../../../app/common/modals/modalReducer';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

export default function UnauthModal({ history, setModalOpen }) {
    const [open, setOpen] = useState(true);
    const { prevLocation } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function handleClose() {
        if (!history) {
            setOpen(false);
            setModalOpen(false);
            return;
        }
        if (history && prevLocation)  {
            history.push(prevLocation.pathname);
        } else {
            history.push('/events');
        }
        setOpen(false);
        //history.goBack();
    }

    function handleOpenLoginModal(modalType) {
        dispatch(openModal({ modalType }));
        setOpen(false);
        setModalOpen(false);
    }

    return (
        <Dialog className="unauth-modal" open={open} onClose={handleClose}>
            <DialogTitle>You need to be signed in to do that</DialogTitle>
            <DialogContent>
                <DialogContentText>Please either login or register to see this content</DialogContentText>
            </DialogContent>
            <DialogActions className="buttons">
                <Button
                    className="btn-login"
                    variant="outlined"
                    //onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
                    onClick={() => handleOpenLoginModal('LoginForm')}
                >
                    Login
                    </Button>

                <Button
                    className="btn-register"
                    variant="outlined"
                    //onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
                    onClick={() => handleOpenLoginModal('RegisterForm')}
                >
                    Register
                    </Button>

            </DialogActions>
            <Divider />
            <div className="guest">
                <p>Or click cancel to continue as a guest</p>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </div>
        </Dialog>
    );
}
