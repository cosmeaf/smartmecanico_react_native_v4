import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Dashboard/Home';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  )
}

export default DrawerStack;