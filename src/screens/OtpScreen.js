import React, { useState } from 'react'
import {
  StyleSheet, Text, View,
  KeyboardAvoidingView, TouchableWithoutFeedback,
  Keyboard, Platform, TouchableOpacity, Alert,
  Dimensions
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import Api from '../service/Api'
import OtpInputComponent from '../componentes/OtpInputComponent';

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const OtpScreen = ({ navigation, route }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(0);
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 4

  const startTimer = () => {
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (customInterval) {
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
  };

  const changeTime = () => {
    setSeconds((prevState) => {
      if (prevState + 1 === 60) {
        setMinutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };




  const handleValidation = async (code) => {
    const data = String(code)
    const response = await Api.codeVerify(data)
    if (response.code && response.token) {
      navigation.navigate({
        name: 'ResetPassword',
        params: { code: response.code, token: response.token },
        merge: true,
      });
    } else {
      console.log(response.message.message)
      Alert.alert('Atenção', `${response.message.message}`)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={styles.headerIcon}>
            <StatusBar style='dark' />
            <Octicons name='lock' size={orientation.width > 500 ? 100 : 80} color='#60d3A4' />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Código de Verificação</Text>
            <Text style={styles.headerSubtitle}>Por Favor entre com 4 Digitos </Text>
            <Text style={styles.headerSubtitle}>enviado para o e-mail:</Text>
            <Text style={styles.headerEmail}>{route.params.value ? route.params.value : ''}</Text>
          </View>

          <View style={styles.inputNumber}>
            <OtpInputComponent
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxlength={MAX_CODE_LENGTH}
            />
          </View>

          <View style={styles.buttumArea}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={(pinReady) ? false : true}
              onPress={() => handleValidation(code)}
              style={{ height: orientation.width > 500 ? 70 : 50, alignItems: 'center', backgroundColor: pinReady ? '#60d3A4' : '#66BBB0', padding: 10, marginTop: 10, borderRadius: 10 }}>
              <Text style={styles.buttumText}>Verificar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 100 }}>
            <TouchableOpacity
              onPress={startTimer}
              style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text style={{ fontSize: orientation.width > 500 ? 24 : 16, marginRight: 10 }}>Solicitar novo Código</Text>
              <Text style={{ fontSize: orientation.width > 500 ? 24 : 16 }}>
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>

  )
}

export default OtpScreen

const styles = StyleSheet.create({
  headerIcon: { justifyContent: orientation.width > 500 ? 'center' : null, alignItems: 'center', marginBottom: 10, marginTop: orientation.width > 500 ? 200 : 50 },
  headerTitle: { fontSize: orientation.width > 500 ? 40 : 22, fontWeight: '500', marginBottom: 10 },
  headerSubtitle: { fontSize: orientation.width > 500 ? 28 : 16 },
  headerEmail: { fontSize: orientation.width > 500 ? 28 : 16, fontWeight: 'bold' },
  buttumArea: { marginHorizontal: orientation.width > 500 ? orientation.width / 5 : 28 },
  inputNumber: { marginHorizontal: orientation.width > 500 ? orientation.width * 0.3 : 20 },
  buttumText: { fontSize: orientation.width > 500 ? 34 : 22, color: '#FFF', fontWeight: 'bold' },
})