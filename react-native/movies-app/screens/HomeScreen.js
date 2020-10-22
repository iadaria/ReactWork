; import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';
import MoviePoster from '../components/MoviePoster';
import Tag from '../components/Tag';

const FEED_QUERY = gql`
    query Feed($categoryId: ID) {
        feed(categoryId: $categoryId) {
            id
            title
            description
            imageUrl
            category {
                id
                title
            }
        }
    }
`;

const CATEGORY_QUERY = gql`
    query {
        categories {
            id
            title
        }
    }
`;

export default function HomeScreen(props) {
    const [categoryId, setCategoryId] = useState(1);
    const { data, refetch, error, loading } = useQuery(
        FEED_QUERY, {
            variables: categoryId ? { categoryId } : {},
            //fetchPolicy: 'cache-and-network'
        }
    );
    const { data: genres } = useQuery(CATEGORY_QUERY);
    console.log('data', data);


    const { navigation } = props;
    if (loading || !data || !data.feed) {
        return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />
    }

    return (
        <View style={styles.container}>
            {genres 
                ? <FlatList 
                    data={genres.categories} 
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    extraData={categoryId}
                    style={styles.bottomBorder}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        const selected = categoryId == item.id;
                        return (
                            <Tag key={index} selected={selected} title={item.title}
                                onPress={() => {
                                    if (selected) {
                                        setCategoryId(0);
                                        refetch();
                                    } else {
                                        setCategoryId(parseInt(item.id));
                                        refetch();
                                    }
                                }}
                            />
                        )
                    }}
                /> 
                : null
            }
            <FlatList
                data={data.feed}
                keyExtractor={(itemObj, index) => {
                    return `${index}`;
                }}
                numColumns={2}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                renderItem={({ item, index }) => (
                    <MoviePoster
                        movie={item}
                        onPress={() => navigation.navigate('MovieDetail', { movie: item })}
                    />
                )}
            />
        </View>
    );
}

HomeScreen.navigationOptions = {
    title: 'Now Playing',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingTop: 10,
    },
    bottomBorder: {
        borderBottomColor: "#d3d3d3", 
        borderBottomWidth: StyleSheet.hairlineWidth
      }
});

/* const movies = [
{
  "title": "Spider-Man: Far From Home",
  "description": "Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/lcq8dVxeeOqHvvgcte707K0KVx5.jpg",
  "category": {
    "title": "Action"
  }
},
{
  "title": "The Lion King",
  "description": "Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub's arrival. Scar, Mufasa's brother and a former heir to the throne has plans of his own.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
  "category": {
    "title": "Animation"
  }
},
{
  "title": "Ford v Ferrari",
  "description": "American car designer Carroll Shelby and the British-born driver Ken Miles work together to battle corporate interference, the laws of physics, and their own personal demons to build a revolutionary race car for Ford Motor Company.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
  "category": {
    "title": "Thriller"
  }
},
{
  "title": "Once Upon a Time... in Hollywood",
  "description": "A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
  "category": {
    "title": "Western"
  }
},
{
  "title": "Frozen II",
  "description": "Elsa, Anna, Kristoff and Olaf are going far in the forest to know the truth about an ancient mystery of their kingdom..",
  "imageUrl": "https://image.tmdb.org/t/p/w780/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg",
  "category": {
    "title": "Animation"
  }
},
{
  "title": "Joker",
  "description": "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  "category": {
    "title": "Horror"
  }
},
{
  "title": "Aladdin",
  "description": "A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.",
  "imageUrl": "https://image.tmdb.org/t/p/w780/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg",
  "category": {
    "title": "Animation"
  }
}
]; */