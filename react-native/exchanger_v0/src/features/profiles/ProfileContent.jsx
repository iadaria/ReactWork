import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../../app/common/components/ui/AppText';
import ProfileHeader from './profileComponents/ui/ProfileHeader';
import TextRowSection from './profileComponents/ui/TextRowSection';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { THEME } from '../../theme';


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
            <ProfileHeader text="Профиль" />
            <TextRowSection
                label={<AppText>Рейтинг</AppText>}
                value={<AppText>110.8</AppText>}
            />
            <TextRowSection
                label={<AppText>Рейтинг</AppText>}
                value={
                    <>
                        {/* color="#900" solid */}
                        <MaterialCommunityIcons size={25} name="star" color={THEME.SECOND_COLOR} />
                        <AppText>110.8</AppText>
                    </>
                }
            />
            <TextRowSection
                label={<AppText>Рейтинг</AppText>}
                value={
                    <>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <SimpleLineIcons size={20} name="like" color="gray" />
                            <AppText ml={3}>11</AppText>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: "flex-end", marginLeft: 10 }}>
                            <SimpleLineIcons size={20} name="dislike" color="gray" />
                            <AppText ml={3}>0</AppText>
                        </View>
                    </>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
    }
});

