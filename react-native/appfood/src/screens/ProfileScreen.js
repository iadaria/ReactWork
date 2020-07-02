import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { THEME } from '../theme';

var { width } = Dimensions.get("window");

export const ProfileScreen = () => {
    const [fbAccount, setFBAccount] = React.useState({
        id_facebook: null,
        picture: null,
        name: null,
        email: null,
        token: null,
    });

    function _authFB() {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            async function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    await _setDataFB()
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    async function _setDataFB() {
        // get token from facebook
        const tokenData = await AccessToken.getCurrentAccessToken().then(
            (data) => {
                return data.accessToken.toString()
            }
        )
        // get data about profile from api graph
        const datajson = await apiGraphFace(tokenData)

        if (datajson.success) {
            // variable para enviar post
            const data_fb = {
                id_facebook: datajson.data.id,
                email: datajson.data.email,
                name: datajson.data.name,
                picture: datajson.data.picture
            }
            setFBAccount({ ...fbAccount, ...data_fb });
        }
    }

    async function apiGraphFace(token) {

        const resface = await fetch('https://graph.facebook.com/v2.10/me?fields=id,name,email,picture.width(500)&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                const data = {
                    data: json,
                    success: true
                }
                return data;
            })
            .catch((error) => {
                const data = {
                    message: error,
                    success: false
                }
                return data;
            })

        return resface;
    }

    return (
        <View style={styles.root}>
            {
                fbAccount.id_facebook ?
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={{ uri: fbAccount.picture.data.url }} style={{ width: 200, height: 200 }} />
                        <View style={{ height: 20 }} />
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{fbAccount.name}</Text>
                        <Text style={{ fontSize: 20 }}>{fbAccount.email}</Text>
                        <View style={{ height: 20 }} />
                        <Text >facebook ID</Text>
                        <Text >{fbAccount.id_facebook}</Text>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={async () => await _authFB()}
                        style={{
                            backgroundColor: THEME.ACTIVE_COLOR,
                            width: width - 40,
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5
                        }}
                    >
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: "white"
                        }}>
                            Login facebook
                        </Text>
                    </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
