import './profile-page.scss';
import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileHeader from '../ProfileHeader';
import ProfileContent from '../ProfileContent/ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { /* listenToCurrentUserProfile,  */listenToSelectedUserProfile } from '../profileActions';
import LoadingComponent from '../../../app/common/components/LoadingComponent';

export default function ProfilePage({ match }) {
    const dispatch = useDispatch();
    const { selectedUserProfile } = useSelector((state) => state.profile);
    const { currentUser } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.async);

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        //data: profile => dispatch(listenToCurrentUserProfile(profile)),
        data: profile => dispatch(listenToSelectedUserProfile(profile)),
        deps: [dispatch, match.params.id]
    });

    if (
        (loading && !selectedUserProfile) || (!selectedUserProfile && !error)
    ) return <LoadingComponent content="Loading profile..." />;

    const isCurrentUser = currentUser.uid === selectedUserProfile.id;

    return (
        <Grid container className="profile-page">
            <Grid item md={12}>
                <ProfileHeader profile={selectedUserProfile} isCurrentUser={isCurrentUser} />
                <ProfileContent profile={selectedUserProfile} isCurrentUser={isCurrentUser} />
            </Grid>
        </Grid>
    );
}