import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../../Contexts/Context';


export default ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [colorTheme, setColorTheme] = useState(true);

  const toggleIsEnable = () => setIsEnabled(previousState => !previousState);
  const toggleIsNotification = () => setIsNotification(previousState => !previousState);
  const toggleIsMessage = () => setIsMessage(previousState => !previousState);
  const toggleColorTheme = () => setColorTheme(previousState => !previousState);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorTheme ? '#FFF' : '#242C40' }]}>
      <StatusBar />
      <Text style={styles.title}>SEGURANÇA:</Text>
      {/* Notification */}
      <View style={[styles.onTabe, { backgroundColor: colorTheme ? '#FFF' : '#242C40', borderWidth: 0.5, borderColor: '#FFF' }]}>
        <Text style={[styles.onTabText, { color: colorTheme ? '#242C40' : '#FFF' }]}>Permitir notifações</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={isNotification ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleIsNotification}
          value={isNotification}
        />
      </View>
      {/* Messages */}
      <View style={[styles.onTabe, { backgroundColor: colorTheme ? '#FFF' : '#242C40', borderWidth: 0.5, borderColor: '#FFF' }]}>
        <Text style={[styles.onTabText, { color: colorTheme ? '#242C40' : '#FFF' }]}>Mensagens</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={isMessage ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleIsMessage}
          value={isMessage}
        />
      </View>
      {/* Theme Color */}
      <Text style={styles.title}>COR TEMA:</Text>
      <View style={[styles.onTabe, { backgroundColor: colorTheme ? '#FFF' : '#242C40', borderWidth: 0.5, borderColor: '#FFF' }]}>
        <Text style={[styles.onTabText, { color: colorTheme ? '#242C40' : '#FFF' }]}>Noite / Dia</Text>
        <Switch
          trackColor={{ false: '#D2D2D2', true: '#12b76a' }}
          thumbColor={colorTheme ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#D2D2D2"
          onValueChange={toggleColorTheme}
          value={colorTheme}
        />
      </View>
      <View style={styles.buttonContent}>
        <TouchableOpacity style={[styles.buttonSave, { backgroundColor: colorTheme ? '#FFF' : '#242C40', borderWidth: 0.5, borderColor: '#FFF' }]}>
          <Text style={[styles.buttomText, { color: colorTheme ? '#242C40' : '#FFF' }]}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 16, color: '#b2b2b2', marginBottom: 10, paddingHorizontal: 10 },
  onTabe: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, backgroundColor: '#F2F2F2', paddingHorizontal: 10, marginBottom: 10 },
  onTabText: { fontSize: 16 },
  buttonContent: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 },
  buttonSave: { width: '90%', height: 50, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  buttomText: { fontSize: 18, fontWeight: '500' },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#FFF',
  },
});