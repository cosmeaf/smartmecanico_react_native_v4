import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Api from '../service/Api'

export default function ChangePassword({ navigation, route }) {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleRecoveryPassword = async (password, repeatPassword) => {
    if (password === '') {
      Alert.alert('Campo Senha não pode ser vázio')
    }
    if (password.length < 6) {
      Alert.alert('Senha deve ter no minimo 6 Caracteres')
    }
    if (repeatPassword === '') {
      Alert.alert('Campo Confirmar Senha não pode ser vázio')
    }
    if (repeatPassword.length < 6) {
      Alert.alert('Confirmar Senha deve ter no minimo 6 Caracteres')
    }
    if (password !== repeatPassword) {
      Alert.alert('Senhas não conferem')
    }
    const response = await Api.changePassword(password, route.params.code, route.params.token);
    if (response.code === 400) {
      Alert.alert('Atenção', `${response.message.error[0]} \nDeseja Solicitar novo código?`, [
        // {
        //   text: "Sim",
        //   onPress: async () => {
        //     navigation.navigate('ResetPasswordScreen');
        //   }
        // },
        // {
        //   text: "Não",
        //   onPress: async () => {
        //     navigation.replace('LoginScreen');
        //   }
        // }
      ])
    } else {
      Alert.alert('Sucesso', `${response.message}`)
      navigation.replace('LoginScreen');
    }
  }



  return (
    <Background>
      <Logo />
      <Header>Recuper sua Senha.</Header>
      <TextInput
        label="Senha"
        returnKeyType="done"
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Repetir Senha"
        returnKeyType="done"
        autoCapitalize="none"
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 10, marginBottom: 20 }}
        onPress={() => handleRecoveryPassword(password, repeatPassword)}>
        <Text style={{ color: '#FFF', fontSize: 22 }}>Nova Senha</Text>
      </TouchableOpacity>

    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: '500'
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
