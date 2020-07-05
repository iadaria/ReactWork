import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import ShopScreen from './screens/ShopScreen';
import MainScreen from './screens/MainScreen';
import { THEME } from './theme';



const App: () => React$Node = ()  => {
    const [deviceWidth, setDeviceWidth] = React.useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );
    const [isVertical, setVertical] = React.useState(true);
    const [module, setModule] = React.useState(0);

    useEffect(() => {
        const update = () => {
            const { width, height } = Dimensions.get('window');
            setVertical(width < height);
            const multiplier = width < height ? 2 : 3 * 2; console.log('multiply', multiplier);
            const _width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * multiplier;
            setDeviceWidth(_width);
        }
        //привязываем вызов функции при изменение размера экрана
        Dimensions.addEventListener('change', update); 

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    }, []);

    const screens = [
        <ShopScreen deviceWidth={deviceWidth}/>,
        <MainScreen />
    ];

    return (
        <View style={[
            styles.mainRoot,
            {padding: isVertical ? THEME.PADDING_HORIZONTAL : THEME.PADDING_HORIZONTAL * 3}
        ]}>
            {screens[module]}
        </View>
    );
};


const styles = StyleSheet.create({
    mainRoot: {
        flex: 1,
        
        //borderWidth: 2,
        //borderColor: 'yellow'
    }
});

export default App;
