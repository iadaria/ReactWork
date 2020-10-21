import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/RoundedButton';

const { width } = Dimensions.get('window');

function MovieDetail({ route, navigation }) {
  const { params } = route;
  const { movie } = params;
  const {
    id,
    title,
    description,
    imageUrl,
    category
  } = movie;
  const isFavorite = false; 
  const primaryColor = isFavorite ? "rgba(75, 148, 214, 1)" : "#fff";
  const secondaryColor = isFavorite ? "#fff" : "rgba(75, 148, 214, 1)";
  const saveString = isFavorite ? 'Remove Vote' : 'Add Vote';
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Text numberOfLines={2} style={[styles.text, {textAlign: 'center'}]}>{title}</Text>
        <RoundedButton
          text={saveString}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          onPress={() => {
            if (isFavorite) {
              console.log("pressed");
            } else {
              console.log("pressed");
            }
          }}
          icon={<Ionicons name="md-checkmark-circle" size={20} color={primaryColor} style={styles.saveIcon} />}
        />
        <View style={styles.statRow}>
          <Text style={styles.stat} numberOfLines={1}>Category</Text>
          <Text style={styles.stat} numberOfLines={1}>{category.title}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  );

}

MovieDetail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("movie").title
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 32,
    color: '#161616',
    paddingBottom: 15,
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'center',
  },
  statRow: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '500',
  },
  saveIcon: {
    position: 'relative',
    left: 20,
    zIndex: 8
  },
  contentContainer: {
    paddingTop: 10
  },
});

export default MovieDetail;