import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MovieList = ({ movies, onDeleteMovie }) => {
    return (
        <FlatList
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.listcontainer}>
                    <Text>{item.name}</Text>
                    <Text>{item.type}</Text>
                    <Text>{item.movieStatus}</Text>
                    <Text>{item.id}</Text>
                    {/* <Text onPress={() => onDeleteMovie(item.id)}>Delete</Text> */}
                    <Button 
                        title="Delete" 
                        onPress={() => onDeleteMovie(item.id)} 
                    />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});

export default MovieList;
