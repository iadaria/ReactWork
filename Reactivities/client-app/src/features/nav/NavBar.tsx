import React from 'react'
import { AppBar, Button, MenuItem, Toolbar, makeStyles, Container } from '@material-ui/core';

import green from '@material-ui/core/colors/green';

interface IProps {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className="menu">
            <Container>
                <Toolbar>
                    <MenuItem>
                        <img className="menu-item-img" src="/assets/logo.png" alt="logo" 
                             style={{marginRight: '10px'}}/>
                        Reactivities
                    </MenuItem>
                    <MenuItem>
                        Activiteis
                    </MenuItem>
                    <Button 
                        onClick={openCreateForm} 
                        color="inherit" className={classes.successButton}
                    >
                        Create Activity
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const useStyles = makeStyles({
    successButton: {
        backgroundColor: green[500],
        textTransform: "none",
        whiteSpace: "nowrap",
    }
});