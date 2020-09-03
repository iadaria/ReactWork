import './profile-header.sass';
import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { followUser, unfollowUser, getFollowingDoc } from '../../../app/firestore/firestoreService';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowUser, setUnfollowUser } from '../profileActions';
import { CLEAR_FOLLOWINGS } from '../profileConstants';

export default function ProfileHeader({ profile, isCurrentUser }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { followingUser } = useSelector(state => state.profile);

    useEffect(() => {
        if (isCurrentUser) return;
        setLoading(true);
        async function fetchFollowingDoc(){
            try {
                const followingDoc = await getFollowingDoc(profile.id);
                if (followingDoc && followingDoc.exists) {
                    dispatch(setFollowUser());
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchFollowingDoc().then(() => setLoading(false));
        return () => {
            dispatch({ type: CLEAR_FOLLOWINGS });
        }
    }, [dispatch, profile.id, isCurrentUser]);

    async function handleFollowUser() {
        setLoading(true);
        try {
            await followUser(profile);
            dispatch(setFollowUser());
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleUnfollowUser() {
        setLoading(true);
        try {
            await unfollowUser(profile);
            dispatch(setUnfollowUser());
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Grid className="profile-header" container direction="row">

            <Grid className="name" item md={8} xs={12}>
                <Avatar
                    style={{ minWidth: 90, minHeight: 90 }}
                    alt={profile.displayName || "user's avatar"}
                    src={profile.photoURL || `/assets/user.png`}
                />
                <Typography variant="h3">
                    {profile.displayName}
                </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
                <Grid className="follow" container direction="row" justify="space-around">
                    <Grid item>
                        <Typography variant="h5">
                            {profile.followerCount ||  0}
                        </Typography>
                        <Typography variant="h5">
                            Followers
                            </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            {profile.followingCount || 0}
                        </Typography>
                        <Typography variant="h5">
                            Following
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {!isCurrentUser &&
                            <Button
                                className="btn"
                                onClick={followingUser ? () => handleUnfollowUser() : () => handleFollowUser()}
                                color={!followingUser ? "primary" : "secondary"}
                                variant={!followingUser ? "contained" : "outlined"}
                                fullWidth
                            >
                                {loading && <CircularProgress size='1.3rem' />}
                                {!loading && (!followingUser ? "Following" : "Unfollow")}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}