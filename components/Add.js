import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native'; // Import Text here
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('movies.db');


function Add() {
    const [newMovie, setNewMovie] = useState({
        id: '', // bar code
        name: '', // movie name
        type: '', // DVD, Blu-ray, or 4K
        movieStatus: '', // borrow to others, at home, or lost
    });
    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists movies (id integer primary key not null, name text, type text, movieStatus text);'
            );
        }, (error) => console.error("Error when creating Database: ", error), updateList);
    }, []);

    // const addMovie = () => {
    //     if (newMovie.id && newMovie.name) {
    //         db.transaction(tx => {
    //             tx.executeSql('insert into movies (id, name, type, movieStatus) values (?, ?, ?, ?);', 
    //             [parseInt(newMovie.id, 10), newMovie.name, newMovie.type, newMovie.movieStatus],
    //             );
    //         }, (error) => console.error("Error when inserting: ", error), updateList);
    //     }
    //     // Clear the id and name fields after adding a new movie
    //     // setNewMovie({ id: '', name: '', type: '', movieStatus: '' });
    // };

    const addMovie = () => {
        if (newMovie.id && newMovie.name) {
            db.transaction(tx => {
                tx.executeSql(
                    'insert into movies (id, name, type, movieStatus) values (?, ?, ?, ?);',
                    [parseInt(newMovie.id, 15), newMovie.name, newMovie.type, newMovie.movieStatus],
                    null, 
                    (_, error) => console.error("Error when inserting: ", error)
                );
            }, null, updateList);
            setNewMovie({ id: '', name: '', type: '', movieStatus: '' });
        }
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
                onChangeText={(id) => setNewMovie(prevState => ({...prevState, id}))} 
                value={newMovie.id}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder="Movie Name"
                onChangeText={(name) => setNewMovie(prevState => ({...prevState, name}))} 
                value={newMovie.name}
            />
            <TextInput
                placeholder="Type"
                onChangeText={(type) => setNewMovie(prevState => ({ ...prevState, type }))}
                value={newMovie.type}
            />
            <TextInput
                placeholder="Status"
                onChangeText={(movieStatus) => setNewMovie(prevState => ({ ...prevState, movieStatus }))}
                value={newMovie.movieStatus}
            />
            <Button title="Add" onPress={addMovie} />
            <FlatList
                data={newMovies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => 
                    <View style={styles.listcontainer}>
                        <Text>{item.name}{'\n'}{item.type}{'\n'}{item.movieStatus}{'\n'}{item.id}{'\n'}</Text>
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
