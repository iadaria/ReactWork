import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";

export const AboutScreen = ({ navigation }) => {
    navigation.setOptions({
        headerTitle: "О приложении",
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
        <View style={styles.center}>
            <Text>Приложения для создания постов</Text>
            <Text>
                Версия приложения <Text style={{fontWeight: 'bold'}}>1.0</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
