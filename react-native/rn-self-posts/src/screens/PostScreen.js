import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Platform, ScrollView } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const PostScreen = ({ navigation, route}) => {
    const { postId, date } = route.params;
    //console.log('navigation -> ', navigation);
    //console.log('route -> ', route);

    const post = DATA.find(post => post.id === postId);

    navigation.setOptions({
        ...defaultOptions,
        headerTitle: `Пост от ${new Date(date).toLocaleDateString()}`,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="Take photo"
                    iconName={post.booked ? 'ios-star' : 'ios-star-outline'}
                    onPress={() => console.log("press star")}
                />
            </HeaderButtons>
        ),
    });

    return (
        <ScrollView> 
            <Image style={styles.image} source={{uri: post.img}}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text.repeat(100)}</Text>
            </View>
            <Button title="Удалить" color={THEME.DANGER_COLOR}/>
        </ScrollView>
    );
};

const defaultOptions = {
};


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
        //fontFamily: 'OpenSans_400Regular'//Platform.OS === 'android' ? 'OpenRegular' : 'open-regular'
    }
});
