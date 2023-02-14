import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native'
import { GlobalProvider } from './src/Contexts/Context';
import Route from './src/Routes';

export default function App() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Route />
      </GlobalProvider>
    </NavigationContainer>
  );
}