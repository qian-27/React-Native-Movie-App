import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Add from './Add';
import MovieList from './MovieList';

function HomeScreen() {
    return (
        <View>
            <Add />
            {/* <MovieList /> */}
        </View>
    );
}

const styles = StyleSheet.create({});

export default HomeScreen;
