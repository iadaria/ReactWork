import './modal-wrapper.scss';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
//import Button from '@material-ui/core/Button';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';

export default function ModalWrapper({ children, size, header }) {
    const dispatch = useDispatch();
    //const [open, setOpen] = React.useState(false);

    /* const handleClickOpen = () => {
        setOpen(true);
    }; */

    /* const handleClose = () => {
        setOpen(false);
    }; */

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
                {/* <DialogContentText>
                    {children}
                </DialogContentText> */}
            </DialogContent>

            {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions> */}
        </Dialog>
    );
};

/* <Dialog
    open={open}
    //onClose={closeModal}
    onClose={handleClose}
    scroll='body'
    maxWidth='xs'
>
    <DialogContent style={{paddingBottom: 20}}>
        {body}
    </DialogContent>
</Dialog> */