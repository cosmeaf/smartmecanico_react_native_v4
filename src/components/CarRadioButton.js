
import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export function CarRadioButton({ value: initialValue }) {
  const [value, setValue] = useState(initialValue || 'first');
  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
      <View >
        <Text>First</Text>
        <RadioButton value="first" />
      </View>
      <View>
        <Text>Second</Text>
        <RadioButton value="second" />
      </View>
      <View>
        <Text>Third</Text>
        <RadioButton value="third" />
      </View>
    </RadioButton.Group>
  );
}
