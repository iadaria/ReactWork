import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Button } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = React.useState("");

    const pressHandler = () => {
        console.log(`type=${typeof value} of value = '${value}'`);
        if (value && value.trim()) {
            onSubmit(value);
            setValue("");
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
            <Button 
                title="Добавить"
                onPress={() => {
                    pressHandler();
                    console.log(`after onPress(setValue) current value = '${value}'`);
                }}
                testID="addtodo-button"
            />
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
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab'
    }
});
  
