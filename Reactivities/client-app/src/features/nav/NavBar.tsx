import React, { useContext } from 'react'
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

import { AppBar, Button, MenuItem, Toolbar, makeStyles, Container} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {

    const classes = useStyles();
    const activityStore = useContext(ActivityStore);

    return (
        <AppBar position="fixed" className="menu">
            <Container>
                <Toolbar>
                    <MenuItem component={NavLink} exact to='/'>
                        <img className="menu-item-img" src="/assets/logo.png" alt="logo" 
                             style={{marginRight: '10px'}}/>
                        Reactivities
                    </MenuItem>
                    <MenuItem component={NavLink} to='/activities'>
                        Activiteis
                    </MenuItem>
                    <Button 
                        component={NavLink} to='/createActivity'
                        onClick={activityStore.openCreateForm} 
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

export default observer(NavBar);