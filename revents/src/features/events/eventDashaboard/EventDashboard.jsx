import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function EventDashboard() {
    return (
        <Grid container>
            <Grid style={{border: '1px solid black'}} item xs={8}>
                <h2>Left Column</h2>
            </Grid>
            <Grid style={{border: '1px solid black'}} item xs={4}>
                <h2>Right Column</h2>
            </Grid>
        </Grid>
    );

}