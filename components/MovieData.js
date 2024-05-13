// This is the movie data from the movies.js file.
// The movies.js file contains an array of movie objects.
// The movie objects have an id and a name.
// The list made from my partner's collection of movies.

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import movies from '../movies.js';

function MovieData() {
    console.log(movies);
    return (
        <FlatList style={styles.textStyle}
            data={movies}
            renderItem={({item}) => {
                return (
                    <View>
                        <Text>{item.id}: {item.name}{'\n'}</Text>
                    </View>
                )
            }}
            keyExtractor={item => item.id.toString()} // Added a key extractor for unique keys
        />

    )
}

const styles = StyleSheet.create({
    textStyle: {
      marginTop: 10,
      marginLeft: 15,
    }
});

export default MovieData;