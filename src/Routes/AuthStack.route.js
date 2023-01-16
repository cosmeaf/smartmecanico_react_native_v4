import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import ChangePassword from '../screens/ChangePassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Sign-In' }} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ title: 'Sign-Ip' }} />
      <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} options={{ title: 'Recovery Password' }} />
      <Stack.Screen name='OtpScreen' component={OtpScreen} options={{ title: 'OPT Verify' }} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ title: 'Change Passowrd' }} />
    </Stack.Navigator>
  );
}

export default AuthStack;