import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProfileCard from './ProfileCard';
import { RootStoreContext } from '../../app/stores/rootStore';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProfileFollowings = () => {
    const rootStore = React.useContext(RootStoreContext);
    const {
        profile,
        followings,
        loading,
        //loadFollowings
        activeTab
    } = rootStore.profileStore;

    /* React.useEffect(() => {
        loadFollowings('following');
    }, [loadFollowings]); */

    return (
        <>
            { loading && <CircularProgress /> }
            {!loading &&
                <Grid container spacing={3} >

                    <Grid item xs={12}>
                        <Typography variant="h5" align="left">
                            {   activeTab === 3
                                ? `People following ${profile!.displayName}`
                                : `People ${profile!.displayName} is following`
                            }
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3} direction="row">
                            {followings.map(profile =>
                                (
                                    <Grid key={profile.username} item lg={2} md={2} sm={4} xs={6}>
                                        <ProfileCard profile={profile} />
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>

            </Grid >}
        </>
    );
};

export default ProfileFollowings;
