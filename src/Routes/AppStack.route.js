import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Dashboard/Home';
import DetailsScreen from '../screens/Dashboard/Details';

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  return (
    // initialRouteName = "AddVehicle"
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Home', headerShown: true }} />
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

export default AppStack;