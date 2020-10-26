import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import MoviePoster from '../components/MoviePoster';
// import Profile from '../components/Profile';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const PROFILE_QUERY = gql`
  query {
    currentUser {
      id
      username
      email
      votes {
        movie {
          id
          title
          description
          imageUrl
          category {
            title
          }
        }
      }
    }
  }
`;

export default function ProfileScreen({ route, navigation }) {
    const { data } = useQuery(
        PROFILE_QUERY,
        { fetchPolicy: "no-cache" },
    );
    //console.log("profile screen", data);

    if (!data || !data.currentUser) {
        //console.log({data});
        return <ActivityIndicator color="#161616" style={{ ...StyleSheet.absoluteFillObject }} />
    }
    const { currentUser } = data;
    const { username, email, votes } = currentUser;
    return (
        <View style={styles.container}>
            {/* <Profile currentUser={currentUser} /> */}
            {votes && votes.length
                ? <FlatList
                    data={votes}
                    keyExtractor={(item, index) => {
                        return `${index}`;
                    }}
                    numColumns={2}
                    decelerationRate="fast"
                    renderItem={({ item, index }) => {
                        const { movie } = item;
                        return (
                            <MoviePoster movie={movie} onPress={() =>
                                navigation.navigate('MovieDetail', { movie })
                            } />
                        )
                    }}
                />
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    saveIcon: {
        position: 'relative',
        right: 20,
        zIndex: 8
    },
});

//{"username": "alice", "password": "password", "email": "alice@gmail.com"}
