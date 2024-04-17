import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native'; // Import Text here
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('movies.db');

function Add() {
    const [newMovie, setNewMovie] = useState({
        id: '',
        name: '',
    });
    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists movies (id integer primary key not null, name text);');
        }, (error) => console.error("Error when creating Database: ", error), updateList);
    }, []);

    const addMovie = () => {
        if (newMovie.id && newMovie.name) {
            db.transaction(tx => {
                tx.executeSql('insert into movies (id, name) values (?, ?);', [parseInt(newMovie.id, 10), newMovie.name]);
            }, (error) => console.error("Error when inserting: ", error), updateList);
        }
        // Clear the id and name fields after adding a new movie
        newMovie.id = ''; 
        newMovie.name = '';
    };

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from movies;', [], (_, { rows }) =>
                setNewMovies(rows._array)
            );
        });
    };

    const deleteMovie = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from movies where id = ?;', [id]);
        }, (error) => console.error("Error when deleting: ", error), updateList);
    };

    return (
        <View style={styles.textStyle}>
            <TextInput 
                placeholder="ID"
                onChangeText={(id) => setNewMovie(prevState => ({...prevState, id}))} // Correctly update newMovie state
                value={newMovie.id}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder="Movie Name"
                onChangeText={(name) => setNewMovie(prevState => ({...prevState, name}))} // Correctly update newMovie state
                value={newMovie.name}
            />
            <Button title="Add" onPress={addMovie} />
            <FlatList
                data={newMovies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => 
                    <View>
                        <Text>{item.id}:{item.name}</Text>
                        <Text onPress={() => deleteMovie(item.id)}>Delete</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
    },
    listcontainer: {
     flexDirection: 'row',
     backgroundColor: '#fff',
     alignItems: 'center'
    },
   });

export default Add;
