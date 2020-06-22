import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import { THEME } from '../../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = React.useState("");

    const pressHandler = () => {
        //console.log(`type=${typeof value} of value = '${value}'`);
        if (value && value.trim()) {
            onSubmit(value);
            setValue("");
            Keyboard.dismiss();
        } else {
            Alert.alert('Название не должно быть пустым');
        }
    };

    return (
        <View style={styles.block} testID="addtodo-component">
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setValue(text);
                }}
                value={value}
                placeholder="Введите название дела..."
                testID="addtodo-input"
            />
            <AntDesign.Button
                onPress={pressHandler}
                name='pluscircleo'
            >
                Добавить
            </AntDesign.Button>
        </View>
    );
};

AddTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    testID: PropTypes.string
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});
  
