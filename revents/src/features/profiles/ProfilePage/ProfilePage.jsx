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
    const { selectedUserProfile, currentUserProfile } = useSelector((state) => state.profile);
    const { currentUser } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.async);
    let profile;

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        //data: profile => dispatch(listenToCurrentUserProfile(profile)),
        data: _profile => dispatch(listenToSelectedUserProfile(_profile)),
        deps: [dispatch, match.params.id],
        shouldExecute: match.params.id !== currentUser.uid
    });

    if (match.params.id === currentUser.uid) {
        profile = currentUserProfile;
    } else {
        profile = selectedUserProfile;
    }

    if (
        (loading && !profile) || (!profile && !error)
    ) return <LoadingComponent content="Loading profile..." />;

    const isCurrentUser = currentUser.uid === profile.id;

    return (
        <Grid container className="profile-page">
            <Grid item md={12}>
                <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
                <ProfileContent profile={profile} isCurrentUser={isCurrentUser} />
            </Grid>
        </Grid>
    );
}