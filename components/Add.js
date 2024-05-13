import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text, Alert, ScrollView } from 'react-native'; 
import * as SQLite from 'expo-sqlite/legacy';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { requestPermissionsAsync } from 'expo-barcode-scanner';

// sqlite database
const db = SQLite.openDatabase('movies.db');

function Add() {
    const [newMovie, setNewMovie] = useState({
        id: '', // bar code
        name: '', // movie name
        type: '', // DVD, Blu-ray, or 4K
        movieStatus: '', // borrow to others, at home, or lost
    });
    const [newMovies, setNewMovies] = useState([]);

    const [hasPermission, setHasPermission] = useState(null);
    const [showScanner, setShowScanner] = useState(false);

    const handleScannedData = ({ data }) => {
        setShowScanner(false);
        setNewMovie(prevState => ({ ...prevState, id: data }));
        Alert.alert("Barcode Scanned", `Data: ${data}`);
    };

    useEffect(() => {
        // get permission to use the camera
        (async () => {
            const { status } = await requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Camera access is required to scan barcodes.");
            }
        })();

        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists movies (id integer primary key not null, name text, type text, movieStatus text);'
            );
        }, (error) => console.error("Error when creating Database: ", error), updateList);
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from movies;', [], (_, { rows }) =>
                setNewMovies(rows._array)
            );
        });
    };

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
            alert(`Movie Added: ${newMovie.name}`);
            // Clear the id and name fields after adding a new movie
            setNewMovie({ id: '', name: '', type: '', movieStatus: '' });
        } else {
            Alert.alert('Error', 'Please enter a valid ID and name');
        }
    };

    const deleteMovie = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from movies where id = ?;', [id]);
        }, (error) => console.error("Error when deleting: ", error), updateList);
    };

    return (
        <ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    onChangeText={(id) => setNewMovie(prevState => ({ ...prevState, id }))}
                    value={newMovie.id}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Movie Name"
                    onChangeText={(name) => setNewMovie(prevState => ({ ...prevState, name }))}
                    value={newMovie.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    onChangeText={(type) => setNewMovie(prevState => ({ ...prevState, type }))}
                    value={newMovie.type}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Status"
                    onChangeText={(movieStatus) => setNewMovie(prevState => ({ ...prevState, movieStatus }))}
                    value={newMovie.movieStatus}
                />
                <Button title="Scan Barcode" onPress={() => setShowScanner(true)} />
                {showScanner && hasPermission && (
                    <BarCodeScanner
                        onBarCodeScanned={handleScannedData}
                        style={StyleSheet.absoluteFillObject}
                    />
                )}
                <Button title="Add Movie" onPress={addMovie} />
            </View>
            <FlatList
                style={styles.listContainer}
                data={newMovies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Text>{item.name}{'\n'}{item.type}{'\n'}{item.movieStatus}{'\n'}{item.id}{'\n'}</Text>
                        <Text onPress={() => deleteMovie(item.id)}>Delete</Text>
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 2, // Takes 2/3 of the space
        backgroundColor: '#FFFAE6', 
        padding: 40, 
    },
    listContainer: {
        flex: 1, // Takes 1/3 of the space
        backgroundColor: '#FF9F66', 
        padding: 40, 
    },
    input: {
        height: 50, 
        borderColor: '#FF5F00', 
        borderWidth: 1, 
        marginBottom: 10, 
        paddingHorizontal: 10, 
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: '#FF9F66', 
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFAE6',
    },
});

export default Add;