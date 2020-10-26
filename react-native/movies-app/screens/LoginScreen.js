import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { useMutation } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('window');

// Mutations
const SIGNUP_MUTATION = gql`
  mutation SignUp($username:String!, $email:String!, $password:String!) {
    signUp(email:$email, username:$username,password:$password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
const SIGNIN_MUTATION = gql`
  mutation SignIn($username:String, $email:String, $password:String!) {
    signIn(email:$email, username:$username,password:$password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState(false);

    // Signing In 
    const [signIn] = useMutation(SIGNIN_MUTATION, {
        async onCompleted({ signIn }) {
            const { token } = signIn;
            //console.log('Login screen signIn', signIn);
            try {
                await AsyncStorage.setItem('token', token);
                navigation.replace('Profile');
                console.log({token});
            } catch (err) {
                console.log(err.message);
            }
        }
    });

    // Signing Up 
    const [signUp, { data: signedUp }] = useMutation(SIGNUP_MUTATION, {
        async onCompleted({ signUp }) {
            const { token } = signUp;
            try {
                console.log({token});
                await AsyncStorage.setItem('token', token);
                navigation.replace('Profile');
            } catch (err) {
                console.log(err.message);
            }
        }
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {login ? null
                        : <View>
                            <Text>Username</Text>
                            <TextInput
                                onChangeText={text => setUsername(text)}
                                value={username}
                                placeholder="Username"
                                autoCorrect={false}
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>}
                    <View>
                        <Text>{login ? "Email or Username" : "Email"}</Text>
                        <TextInput
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder={login ? "Email or Username" : "Email"}
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text>Password</Text>
                        <TextInput
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder="Password"
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                </View>

                <RoundedButton
                    text={login ? "Login" : "Sign Up"}
                    textColor="#fff"
                    backgroundColor="rgba(75, 148, 214, 1)"
                    onPress={() => {
                        // TextInput validation
                        let nullValues = [];
                        if (!email) {
                            nullValues.push("Email");
                        }
                        if (!username && !login) {
                            nullValues.push("Username");
                        }
                        if (!password) {
                            nullValues.push("Password");
                        }
                        if (nullValues.length) {
                            Alert.alert(`Please fill in ${nullValues.join(', ')}`);
                        } else {
                            if (login) {
                                // email validation
                                const isEmail = email.includes('@');
                                const res = isEmail ? signIn({ variables: { email, password } }) :
                                    signIn({ variables: { username: email, password } });
                            } else {
                                signUp({ variables: { email, username, password } })
                            }
                        }
                    }}
                    icon={<Ionicons name="md-checkmark-circle" size={20} color={"#fff"} style={styles.saveIcon} />}
                />
                <RoundedButton
                    text={login ? "Need an account? Sign Up" : "Have an account? Login"}
                    textColor="rgba(75, 148, 214, 1)"
                    backgroundColor="#fff"
                    onPress={() => {
                        setLogin(!login);
                    }}
                    icon={<Ionicons name="md-information-circle" size={20} color="rgba(75, 148, 214, 1)" style={styles.saveIcon} />}
                />
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    saveIcon: {
        position: 'relative',
        left: 20,
        zIndex: 8
    },
    inputContainer: {
        //flex: 0.40,
        justifyContent: 'space-around',
    },
    input: {
        width: width - 40,
        height: 40,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
    },
});