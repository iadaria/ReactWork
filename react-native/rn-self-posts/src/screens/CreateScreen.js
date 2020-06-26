import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const CreateScreen = ({ navigation }) => {

    navigation.setOptions({
        headerTitle: "Создать пост", 
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="main menu"
                    iconName="ios-menu"
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    });

    return (
        <View style={styles.wrapper}>
            <Text>CreateScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    }
});
