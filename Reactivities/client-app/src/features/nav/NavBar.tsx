import React from 'react'
import { AppBar, Button, MenuItem, Toolbar, makeStyles, Container } from '@material-ui/core';

import green from '@material-ui/core/colors/green';

const useStyles = makeStyles({
    successButton: {
        backgroundColor: green[500],
        textTransform: "none",
        whiteSpace: "nowrap"
    }
});

export const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" className="menu">
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
                    <Button color="inherit" className={classes.successButton}>Create Activity</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}