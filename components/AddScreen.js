// import React, { useEffect, useState } from 'react';
// import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// // Test with this instead of Add.js
// //
// //

// const db = SQLite.openDatabase('movies.db');

// function AddScreen() {
//     const [newMovie, setNewMovie] = useState({
//         id: '',
//         name: '',
//     });
//     const [newMovies, setNewMovies] = useState([]);

//     useEffect(() => {
//         db.transaction(tx => {
//             tx.executeSql('create table if not exists movies (id integer primary key not null, name text);');
//         }, (error) => console.error("Error when creating Database: ", error), updateList);
//     }, []);

//     const addMovie = () => {
//         if (newMovie.id && newMovie.name) {
//             db.transaction(tx => {
//                 tx.executeSql('insert into movies (id, name) values (?, ?);', [parseInt(newMovie.id, 10), newMovie.name]);
//             }, (error) => console.error("Error when inserting: ", error), updateList);
//         }
//         // Clear the id and name fields after adding a new movie
//         newMovie.id = ''; 
//         newMovie.name = '';
//     };

//     const updateList = () => {
//         db.transaction(tx => {
//             tx.executeSql('select * from movies;', [], (_, { rows }) =>
//                 setNewMovies(rows._array)
//             );
//         });
//     };

//     const deleteMovie = (id) => {
//         db.transaction(tx => {
//             tx.executeSql('delete from movies where id = ?;', [id]);
//         }, (error) => console.error("Error when deleting: ", error), updateList);
//     };

//     // const addBarCode = () => {

//     // }

//     return (
//         <View style={styles.textStyle}>
//             <TextInput 
//                 placeholder="ID"
//                 onChangeText={(id) => setNewMovie(prevState => ({...prevState, id}))} // Correctly update newMovie state
//                 value={newMovie.id}
//                 keyboardType='numeric'
//             />
//             <TextInput 
//                 placeholder="Movie Name"
//                 onChangeText={(name) => setNewMovie(prevState => ({...prevState, name}))} // Correctly update newMovie state
//                 value={newMovie.name}
//             />
//             <Button title="Add" onPress={addMovie} />
//             <FlatList
//                 data={newMovies}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({item}) => 
//                     <View>
//                         <Text>{item.id}:{item.name}</Text>
//                         <Text onPress={() => deleteMovie(item.id)}>Delete</Text>
//                     </View>
//                 }
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//      flex: 1,
//      backgroundColor: '#fff',
//      alignItems: 'center',
//      justifyContent: 'center',
//     },
//     listcontainer: {
//      flexDirection: 'row',
//      backgroundColor: '#fff',
//      alignItems: 'center'
//     },
//    });

// export default AddScreen;



// // import React, { useEffect, useState } from 'react';
// // import { FlatList, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
// // import * as SQLite from 'expo-sqlite';
// // import { BarCodeScanner } from 'expo-barcode-scanner';
// // import { ThemeProvider, Button, createTheme  } from '@rneui/themed';

// // const db = SQLite.openDatabase('movies.db');

// // function AddScreen() {
// //     const [newMovie, setNewMovie] = useState({
// //         id: '',
// //         name: '',
// //         type: '',
// //         movieStatus: '',
// //     });
// //     const [newMovies, setNewMovies] = useState([]);
// //     const [hasPermission, setHasPermission] = useState(null);
// //     const [scanning, setScanning] = useState(false);

// //     useEffect(() => {
// //         db.transaction(tx => {
// //             tx.executeSql('create table if not exists movies (id integer primary key not null, name text, type text, movieStatus text);');
// //         }, (error) => console.error("Error when creating Database: ", error), updateList);        

// //         (async () => {
// //             const { status } = await BarCodeScanner.requestPermissionsAsync();
// //             setHasPermission(status === 'granted');
// //         })();
// //     }, []);

// //     const handleBarCodeScanned = ({ type, data }) => {
// //         setScanning(false);
// //         setNewMovie(prevState => ({ ...prevState, id: data }));
// //         Alert.alert("Barcode Scanned", `Barcode type ${type} and data ${data} have been scanned!`);
// //     };

// //     const addMovie = () => {
// //         if (newMovie.id && newMovie.name) {
// //             db.transaction(tx => {
// //                 tx.executeSql('insert into movies (id, name, type, movieStatus) values (?, ?, ?, ?);', 
// //                     [parseInt(newMovie.id, 10), newMovie.name, newMovie.type, newMovie.movieStatus]);
// //             }, (error) => console.error("Error when inserting: ", error), updateList);
// //             setNewMovie({ id: '', name: '', type: '', movieStatus: '' }); // Clear the fields after adding a new movie
// //         }
// //     };
    

// //     const updateList = () => {
// //         db.transaction(tx => {
// //             tx.executeSql('select * from movies;', [], (_, { rows }) =>
// //                 setNewMovies(rows._array)
// //             );
// //         });
// //     };

// //     const deleteMovie = (id) => {
// //         db.transaction(tx => {
// //             tx.executeSql('delete from movies where id = ?;', [id]);
// //         }, (error) => console.error("Error when deleting: ", error), updateList);
// //     };

// //     return (
// //         <View style={styles.container}>
// //             {scanning ? (
// //                 <BarCodeScanner
// //                     onBarCodeScanned={handleBarCodeScanned}
// //                     style={StyleSheet.absoluteFillObject}
// //                 />
// //             ) : (
// //                 <>
// //                     <TextInput 
// //                         placeholder="ID (Scan or Type)"
// //                         onChangeText={(id) => setNewMovie(prevState => ({...prevState, id}))}
// //                         value={newMovie.id}
// //                         keyboardType='numeric'
// //                     />
// //                     <TextInput 
// //                         placeholder="Movie Name"
// //                         onChangeText={(name) => setNewMovie(prevState => ({...prevState, name}))}
// //                         value={newMovie.name}
// //                     />
// //                     <TextInput 
// //                         placeholder="Type"
// //                         onChangeText={(type) => setNewMovie(prevState => ({...prevState, type}))}
// //                         value={newMovie.type}
// //                     />
// //                     <TextInput 
// //                         placeholder="Status"
// //                         onChangeText={(movieStatus) => setNewMovie(prevState => ({...prevState, movieStatus}))}
// //                         value={newMovie.movieStatus}
// //                     />

// //                     <Button onPress={() => setScanning(true)} title="Solid">
// //                         Scan Barcode
// //                     </Button
// //                     <Button onPress={addMovie} title="Solid">
// //                         Add
// //                     </Button>
// //                     <FlatList
// //                         data={newMovies}
// //                         keyExtractor={item => item.id.toString()}
// //                         renderItem={({item}) => 
// //                             <View style={styles.listcontainer}>
// //                                 <Text>{item.name}{"\n"}Type: {item.type}{"\n"}Status: {item.movieStatus}{"\n"}Bar Code:{item.id}</Text>
// //                                 <Button onPress={() => deleteMovie(item.id)} title="Solid">
// //                                     Delete
// //                                 </Button>
// //                                 {/* <Text onPress={() => deleteMovie(item.id)}>Delete</Text> */}
// //                             </View>
// //                         }

// //                     />
// //                 </>
// //             )}
// //         </View>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //      flex: 1,
// //      backgroundColor: '#fff',
// //      alignItems: 'center',
// //      justifyContent: 'center',
// //     },
// //     listcontainer: {
// //      flexDirection: 'row',
// //      backgroundColor: '#fff',
// //      alignItems: 'center'
// //     },
// // });

// // export default AddScreen;