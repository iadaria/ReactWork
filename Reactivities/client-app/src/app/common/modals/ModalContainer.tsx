import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
/* import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions'; */
import DialogContent from '@material-ui/core/DialogContent';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
/* import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
 */
const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const { modal: {open, body}, closeModal } = rootStore.modalStore;
    //const [open, setOpen] = React.useState(false);

    /* const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }; */
    return (
        <div>
            <Dialog 
                open={open} 
                onClose={closeModal} 
                scroll='body' 
                maxWidth='xs'
            >
                <DialogContent style={{paddingBottom: 20}}>
                    {body}
                </DialogContent>
            </Dialog>
            {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            </Dialog> */}
        </div>
    );
};

export default observer(ModalContainer);
