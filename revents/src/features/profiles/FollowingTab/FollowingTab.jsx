import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getFollowersCollection, getFollowingsCollection } from '../../../app/firestore/firestoreService';
import { listenToFollowers, listenToFollowings } from '../profileActions';

export default function FollowingTab({ profile, activeTab }) {
    const dispatch = useDispatch();
    const { followings, followers } = useSelector(state => state.profile);
    const loading = false;

    useFirestoreCollection({
        query: 
            activeTab === 4 
                ? () => getFollowersCollection(profile.id)
                : () => getFollowingsCollection(profile.id),
        data: data => 
            activeTab === 4 
                ? dispatch(listenToFollowers(data)) 
                : dispatch(listenToFollowings(data)),
        deps: [activeTab, dispatch]
    });

    return (
        <>
            {loading && <CircularProgress />}
            {!loading &&
                <Grid container spacing={3} >

                    <Grid item xs={12}>
                        <Typography variant="h5" align="left">
                            {activeTab === 4
                                ? `People following ${profile.displayName}`
                                : `People ${profile.displayName} is following`
                            }
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3} direction="row">
                            {activeTab === 4 && followers.map((_profile) =>
                                (
                                    <Grid item lg={2} md={2} sm={4} xs={6} key={_profile.id}>
                                        <ProfileCard profile={_profile} key={_profile.id}/>
                                    </Grid>
                                )
                            )}
                            {activeTab === 5 && followings.map((_profile, index) =>
                                (
                                    <Grid item lg={2} md={2} sm={4} xs={6} key={_profile.id}>
                                        <ProfileCard profile={_profile} key={_profile.id}/>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>

                </Grid>
            }
        </>
    );
}
