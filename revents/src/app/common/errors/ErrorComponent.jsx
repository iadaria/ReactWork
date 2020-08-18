import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function ErrorComponent() {
    const { error } = useSelector(state => state.async);
    return (
        <Paper style={{ padding: 15, textAlign: 'center'}}>
            <h2 style={{textAlign: 'center'}}>
                {error?.message || "Oops - we have an error"}
            </h2>
            <Button
                style={{ margin: 20}}
                component={Link} to="/events"
                color="primary"
                variant="contained"
            >
                Return to events page
            </Button>
        </Paper>
    );
}
