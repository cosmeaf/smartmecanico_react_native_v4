import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../../Contexts/Context';


export default ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, color: '#b2b2b2', marginBottom: 10, paddingHorizontal: 10 }}>SEGURANÇA:</Text>
      {/* Notification */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, backgroundColor: '#FFF', paddingHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>Permitir notifações</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/* Messages */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, backgroundColor: '#FFF', paddingHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>Mensagens</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/* Theme Color */}
      <Text style={{ fontSize: 16, color: '#b2b2b2', marginBottom: 10, paddingHorizontal: 10 }}>COR TEMA:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, backgroundColor: '#FFF', paddingHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>Noite / Dia</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 }}>
        <TouchableOpacity style={{ width: '90%', height: 50, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}