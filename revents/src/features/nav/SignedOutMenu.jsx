import React from 'react';
//import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

export default function SignedOutMenu({ setAuthenticated }) {
    return (
        <MenuItem className="btn-user-action">
            <Button
                variant="outlined"
                //component={NavLink} to='/createActivity'
                //onClick={openCreateForm}
                onClick={ () => setAuthenticated(true) }
            >
                Login
        </Button>
        
        <Button
            variant="outlined"
            //omponent={NavLink} to='/createActivity'
            //onClick={openCreateForm}
            >
                Register
        </Button>
        </MenuItem>
    );
}
