import React from 'react';
//import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { openModal } from '../../app/common/modals/modalReducer';

export default function SignedOutMenu() {
    const dispatch = useDispatch();

    return (
        <MenuItem className="btn-user-action">
            <Button
                variant="outlined"
                onClick={ () => dispatch(openModal({ modalType: 'LoginForm' })) }
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
