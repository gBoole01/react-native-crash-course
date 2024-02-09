import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from './components/DetailScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}
