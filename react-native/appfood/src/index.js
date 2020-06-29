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
            {/* <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            > */}
                <View style={styles.top}>
                    <Image style={styles.imageLogo} resizeMode="contain" source={require("../assets/img/foodapp_logo3.png")} />
                    <Swiper style={styles.bannerContainer} showsButtons={false} autoplay={true} autoplayTimeout={10}>
                        {
                            dataBanner.map(banner => (
                                <Image style={styles.imageBanner} resizeMode="contain" source={{uri: banner}}/>
                            ))
                        }
                    </Swiper>
                    
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f2f2',

        borderWidth: 3,
        borderColor: 'red'
    },  
    top: {
        width: width,
        alignItems: 'center'
    },  
    imageLogo: {
        //borderWidth: 1,
        //borderColor: 'blue',
        height: 80,
        width: width / 2,
        margin: 10
    },
    bannerContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: height / 2,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
    }, 
  });