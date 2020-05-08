import React from 'react';
import './not-found.sass';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

const NotFound = () => {
    return (
        <Paper className="not-found">
            <SearchIcon color="primary" fontSize='large'/>
            <Typography variant="h5">
                Oops - we've looked everywhere but couldn't find this.
            </Typography>
            <Typography variant="h6">
                <Link to='/activities/' color="primary">
                    Take me to the Activities page
                </Link>
            </Typography>
        </Paper>
    )
}

export default NotFound;
