import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('movies.db');

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        updateList();
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from movies;', [], (_, { rows }) =>
                setMovies(rows._array)
            );
        });
    };

    const deleteMovie = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from movies where id = ?;', [id], 
            null, 
            (_, error) => console.error("Error when deleting: ", error)),
            updateList;
        });
    };

    return (
        <FlatList
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.listContainer}>
                    <Text>{item.name}{'\n'}{item.type}{'\n'}{item.movieStatus}{'\n'}{item.id}{'\n'}</Text>
                    {/* <Text onPress={() => deleteMovie(item.id)}>Delete</Text> */}
                    <Button
                        title="Delete"
                        onPress={() => deleteMovie(item.id)}
                    />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        backgroundColor: '#add8e6',
        alignItems: 'center',
        padding: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#00008b',
    },
});

export default MovieList;



// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';

// const MovieList = ({ movies, onDeleteMovie }) => {
//     return (
//         <FlatList
//             data={movies}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => (
//                 <View style={styles.listcontainer}>
//                     <Text>{item.name}</Text>
//                     <Text>{item.type}</Text>
//                     <Text>{item.movieStatus}</Text>
//                     <Text>{item.id}</Text>
//                     {/* <Text onPress={() => onDeleteMovie(item.id)}>Delete</Text> */}
//                     <Button 
//                         title="Delete" 
//                         onPress={() => onDeleteMovie(item.id)} 
//                     />
//                 </View>
//             )}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     listcontainer: {
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         alignItems: 'center'
//     },
// });

// export default MovieList;