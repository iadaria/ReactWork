import React from 'react';
import { 
    View, 
    Text,
    StyleSheet } from "react-native";

const Navbar = (props) => {
    return (
        <View style={styles.root}>
            {props.children}
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        borderWidth: 2,
        borderColor: 'orange'
    }
});

export default Navbar;
