import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign-In' }} />
    </Stack.Navigator>
  );
}

export default AuthStack;