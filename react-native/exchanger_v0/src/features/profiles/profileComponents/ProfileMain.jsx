import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SectionTitle from  '../../../app/common/components/ui/SectionTitle';
import SectionTextRow from  '../../../app/common/components/ui/SectionTextRow';
import AppText from  '../../../app/common/components/ui/AppText';
import { THEME } from '../../../theme';


export default function ProfileMain({ profile }) {
    return (
        <>
            <SectionTitle text="Профиль" />
            <SectionTextRow
                label={<AppText>Имя</AppText>}
                value={
                    <>
                        <AppText style={{ fontFamily: 'Montserrat-Bold' }}>
                            {profile.displayName}
                        </AppText>
                        <TouchableHighlight 
                            style={{marginLeft: 10 }}
                            onPress={() => console.log('Changing')}
                            underlayColor="#eee"
                        >
                            <MaterialCommunityIcons size={25} name="square-edit-outline" color={THEME.SUBMAIN_COLOR} />
                        </TouchableHighlight>
                    </>
                }
            />
            <SectionTextRow
                label={<AppText>Рейтинг</AppText>}
                value={
                    <>
                        {/* color="#900" solid */}
                        <MaterialCommunityIcons size={25} name="star" color={THEME.SECOND_COLOR} />
                        <AppText>110.8</AppText>
                    </>
                }
            />
            <SectionTextRow
                label={<AppText>Отзывы</AppText>}
                value={
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
        </>
    );
}

// @ts-ignore
const styles = StyleSheet.create({});
