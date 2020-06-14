import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Button } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = React.useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue("");
        }
    };

    return (
        <View style={styles.block} testID="component-addtodo">
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Введите название дела..."
            />
            <Button 
                title="Добавить"
                onPress={pressHandler}
            />
        </View>
    );
};

AddTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired
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
  
