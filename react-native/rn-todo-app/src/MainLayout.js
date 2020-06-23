import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { TodoScreen } from './screens/TodoScreen';
import { MainScreen } from './screens/MainScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const { todoId } = React.useContext(ScreenContext);

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container} testID="app">
                { todoId ? <TodoScreen /> : <MainScreen /> }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        /* borderColor: 'black',
        borderWidth: 2, */
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
