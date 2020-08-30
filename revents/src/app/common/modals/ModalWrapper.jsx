import './modal-wrapper.scss';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';

export default function ModalWrapper({ children, size, header }) {
    const dispatch = useDispatch();

    return (
        <Dialog
            className="modal-wrapper"
            open={true}
            onClose={() => dispatch(closeModal())}
            maxWidth={size}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            {header && <DialogTitle id="form-dialog-title">{header}</DialogTitle>}

            <DialogContent className="modal-wrapper__content">
                {children}
            </DialogContent>
        </Dialog>
    );
}