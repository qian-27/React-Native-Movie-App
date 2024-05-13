import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Add from './Add';
// import MovieList from './MovieList';

function HomeScreen() {
    return (
        <View>
            <Text>Home</Text>
            <Add />
            {/* <MovieList /> */}
        </View>
    )
}

const styles = StyleSheet.create({});

export default HomeScreen;









// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, Alert } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// // Function to drop all tables (simulate deleting the database)
// const resetDatabase = async () => {
//     try {
//         const db = SQLite.openDatabase('movies.db');
//         db.transaction(tx => {
//             tx.executeSql(
//                 "DROP TABLE IF EXISTS movies;",
//                 [],
//                 (_, result) => {
//                     console.log('Table dropped successfully');
//                     Alert.alert("Success", "Database reset successfully.");
//                 },
//                 (_, error) => {
//                     console.error('Error dropping the table:', error);
//                     Alert.alert("Error", "Failed to reset the database.");
//                     return true;  // To stop the transaction on an error.
//                 }
//             );
//         });
//     } catch (error) {
//         console.error('Failed to reset the database:', error);
//         Alert.alert("Error", "Failed to reset the database.");
//     }
// };

// function HomeScreen() {
//     return (
//         <View style={styles.container}>
//             <Text>Home</Text>
//             <Button title="Reset Database" onPress={resetDatabase} />
//             <StatusBar style="auto" />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     }
// });

// export default HomeScreen;

