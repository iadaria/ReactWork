import React, { useEffect, useCallback } from 'react';
import { Text, View, Dimensions, ScrollView, Image, StyleSheet } from "react-native";

import Swiper from 'react-native-swiper';
import TutofoxService from './services/tutofox-service';

let { height, width } = Dimensions.get("window");

export default function App() {
    const [dataBanner, setDataBanner] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const tutofoxService = new TutofoxService();
    const loadBanners = useCallback(async () => {
        const banners = await tutofoxService.getAllBanners();
        console.log(banners);
        setDataBanner(banners);
    }, []);

    useEffect(() => {
        loadBanners();
    }, []);

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image style={styles.imageLogo} resizeMode="contain" source={require("../assets/img/foodapp_logo3.png")} />
                <Swiper style={styles.bannerContainer} showsButtons={true} autoplay={true} autoplayTimeout={2}>
                    {
                        dataBanner.map((banner, index) => (
                            <Image key={index} style={styles.imageBanner} source={{ uri: banner }} />
                        ))
                    }
                </Swiper>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',

        borderWidth: 3,
        borderColor: 'red'
    },

    imageLogo: {
        height: 80,
        width: width / 2,
        margin: 10
    },
    bannerContainer: {
        //backgroundColor: 'blue',
        //width: '100%',
        height: width / 2
        /* borderWidth: 1,
        borderColor: 'green',
        width: height / 2, */
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        alignSelf: 'center'
    },
});