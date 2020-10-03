import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileMain from './profileComponents/ProfileMain';

export default function ProfileContent() {
    const { currentUserProfile } = useSelector(state => state.profile);
    const { loading, error } = useSelector(state => state.auth);

    let profile = currentUserProfile;

    if (
        (loading && !profile) || (!profile && !error)
    ) return null;

    return (
        //ProfileInfo / ProfileMain
        <View style={styles.root}>
            <ProfileMain profile={profile}/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
    }
});

