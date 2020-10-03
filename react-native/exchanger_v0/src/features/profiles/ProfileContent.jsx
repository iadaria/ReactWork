import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileHeader from './profileComponents/ProfileHeader';

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
            <ProfileHeader text="Профиль"/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {}
});

