import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import Api from '../service/Api'
import OtpInputComponent from '../componentes/OtpInputComponent';

const OtpScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 4


  const handleValidation = async (code) => {
    const data = String(code)
    const response = await Api.codeVerify(data)
    if (response.code && response.token) {
      navigation.navigate({
        name: 'ChangePassword',
        params: { code: response.code, token: response.token },
        merge: true,
      });
    } else {
      console.log('OTP Screen ', response.message)
      Alert.alert('Atenção', `${response.message}`)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{ alignItems: 'center', marginBottom: 10, marginTop: 50 }}>
            <StatusBar style='dark' />
            <Octicons name='lock' size={80} color='#60d3A4' />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '500', marginBottom: 10 }}>Código de Verificação</Text>
            <Text>Por Favor entre com 4 Digitos </Text>
            <Text>enviado para o e-mail:</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{route.params.value ? route.params.value : ''}</Text>
          </View>

          <View style={{ marginHorizontal: 28 }}>
            <OtpInputComponent
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxlength={MAX_CODE_LENGTH}
            />
          </View>

          <View style={{ marginHorizontal: 28 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={(pinReady) ? false : true}
              onPress={() => handleValidation(code)}
              style={{ alignItems: 'center', backgroundColor: pinReady ? '#60d3A4' : '#66BBB0', padding: 10, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 22, color: '#FFF' }}>Verificar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>

  )
}

export default OtpScreen

const styles = StyleSheet.create({})