import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/Signup';
import RecoveryPassword from '../screens/RecoveryPassword';
import ResetPassword from '../screens/ResetPassword';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import ChangePassword from '../screens/ChangePassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign-In' }} />
      <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign-Ip' }} />
      <Stack.Screen name='RecoveryPassword' component={RecoveryPassword} options={{ title: 'Recovery Password' }} />
      <Stack.Screen name='OtpScreen' component={OtpScreen} options={{ title: 'OPT Verify' }} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ title: 'Reset Password' }} />
    </Stack.Navigator>
  );
}

export default AuthStack;