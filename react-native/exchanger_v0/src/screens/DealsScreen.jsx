import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import FocusAwareStatusBar from '../app/common/components/FocusAwareStatusBar';
import { THEME } from '../theme';

export default function DealsScreen() {
    return (
        <SafeAreaView style={styles.root}>
            {/* <StatusBar backgroundColor={THEME.MAIN_COLOR}/> */}
            <FocusAwareStatusBar barStyle="light-content" backgroundColor={THEME.MAIN_COLOR}/>
            <Text>
                DialsScreen
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});