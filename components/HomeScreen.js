import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Add from './Add';

function HomeScreen() {
    return (
        <View>
            <Text>Home</Text>
            <Add />
        </View>
    )
}

const styles = StyleSheet.create({});

export default HomeScreen;