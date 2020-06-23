import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const MainScreen = () => {
    const { todos, addTodo, removeTodo } = React.useContext(TodoContext);
    const { changeScreen } = React.useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = React.useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );

    useEffect(() => {
        console.log('useEffect was executed');

        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        }
        //привязываем вызов функции при изменение размера экрана
        Dimensions.addEventListener('change', update); 

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    }, []);

    let items = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={todos}
                renderItem={({ item }) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
                )}
            />
        </View>
    );

    const image = (
        <View style={styles.imgWrap}>
            <Image style={styles.image} source={require("../../assets/no-items.png")}/>
        </View>
    )

    let content = todos.length ? items : image;

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            { content }
        </View>
    );
};

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});
