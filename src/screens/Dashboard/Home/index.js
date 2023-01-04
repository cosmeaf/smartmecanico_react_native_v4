import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style='none' />
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

  export default HomeScreen;