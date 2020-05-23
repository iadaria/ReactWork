import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
    return (
        <div>
            <h1>Profile page</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProfileHeader />
                    <ProfileContent />
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfilePage;
