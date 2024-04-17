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
                        <Text>{item.id}: {item.name}</Text>
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