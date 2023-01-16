import React, { useState } from 'react'
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import { theme } from '../core/theme'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import Api from '../service/Api'


export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleRecoveryPassword = async (email) => {
    const json = await Api.recoveryPassword(email)
    if (json.code === 400) {
      Alert.alert('Atenção', `${json.message.message}`)
    }
  }

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      handleRecoveryPassword(email.value)
      navigation.navigate('OtpScreen', email)
      setIsLoading(false)
    }, 2000)
  }


  {
    return isLoading
      ?
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='green' />
        </View>
      )
      :
      (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Recuperar Senha</Header>
          <TextInput
            label="E-mail address"
            returnKeyType="done"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            description="Você irá receer um E-mail com código de Verificação"
          />
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 10, marginBottom: 20 }}
            onPress={() => sendResetPasswordEmail(email)}>
            <Text style={{ color: '#FFF', fontSize: 22 }}>Enviar</Text>
          </TouchableOpacity>
        </Background>
      )
  }


}
