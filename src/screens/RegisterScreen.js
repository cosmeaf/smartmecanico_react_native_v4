import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import LoadingIcon from '../componentes/LoadingIcon'
import Api from '../service/Api'



export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const handleSignUp = async (username, email, password, password2) => {
    const response = await Api.signUp(username, email, password, password2)
    if (response.id) {
      Alert.alert('Sucesso', 'Sua conta foi criada com sucesso \nAgora Falta pouco para seu acesso', [
        {
          text: "Continuar",
          onPress: () => {
            setIsLoading(true)
            setTimeout(() => {
              navigation.replace('LoginScreen')
              setIsLoading(false)
            }, 1000)
          }
        },
      ])
    } else if (response.code === 400 && response.message.username && response.message.email) {
      Alert.alert('Atenção',
        `${response.message.username ? response.message.username : ''} \n& \n${response.message.email ? response.message.email : ''}`)
    } else if (response.code === 400 && response.message.email) {
      Alert.alert('Atenção', `${response.message.email ? response.message.email : ''}`)
    } else if (response.code === 400 && response.message.username) {
      Alert.alert('Atenção', `${response.message.username ? response.message.username : ''}`)
    } else {
      Alert.alert('Ops!', `Estamos com dificuldades para acessar nosso servidores \nPor Favor tente mais tarde`)
    }
  }

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    handleSignUp(name.value, email.value, password.value, password.value)
    return
  }

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='#green' />
    </View>
  )
    : (
      <Background>
        <Logo />
        <Header> Criar uma Conta</Header>
        <TextInput
          label="Usuário"
          returnKeyType="next"
          autoCapitalize="none"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="E-mail"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          returnKeyType="done"
          autoCapitalize="none"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 20, marginBottom: 20 }}
          onPress={onSignUpPressed}>
          <Text style={{ color: '#FFF', fontSize: 22 }}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </Background>
    )




}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
