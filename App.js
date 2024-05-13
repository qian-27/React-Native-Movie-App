import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import MovieData from './components/MovieData';
// import Scanner from './components/Scanner';
import { PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Movies' component={MovieData} />
        {/* <Tab.Screen name='Scanner' component={Scanner} /> */}
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
