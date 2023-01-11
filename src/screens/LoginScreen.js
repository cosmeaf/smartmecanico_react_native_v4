import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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
import GlobalContext from '../Contexts/Context'

export default function LoginScreen({ navigation }) {
  const { signin } = useContext(GlobalContext);
  const [email, setEmail] = useState({ value: 'demo@gmail.com', error: '' })
  const [password, setPassword] = useState({ value: 'qweasd32', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    signin(email.value, password.value)
  }

  return (
    <Background>
      <Logo />
      <Header>Bem Vindo.</Header>
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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Esqueceu sua Senha?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 20, marginBottom: 20 }}
        onPress={onLoginPressed}>
        <Text style={{ color: '#FFF', fontSize: 22 }}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text>Ainda não tem uma Conta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Registre-se</Text>
        </TouchableOpacity>
      </View>
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
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})