import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
 
export default function ModalContainer({ body }) {
    //const rootStore = useContext(RootS}toreContext);
    //const { modal: {open, body}, closeModal } = rootStore.modalStore;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <Dialog 
                open={open} 
                //onClose={closeModal} 
                onClose={handleClose}
                scroll='body' 
                maxWidth='xs'
            >
                <DialogContent style={{paddingBottom: 20}}>
                    {body}
                </DialogContent>
            </Dialog> */}
        </div>
    );
};
