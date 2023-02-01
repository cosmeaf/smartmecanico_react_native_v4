import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
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
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isVisible, setIsVisible] = useState(false);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      signin(email.value, password.value)
    }, 2000)
  }

  return isLoading ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='green' />
    </View>
    :
    (
      <Background>
        <Logo />
        <Header>Bem-vindo de volta.</Header>
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
          mode="outlined"
          returnKeyType="done"
          autoCapitalize="none"
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
          style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 10, marginBottom: 20 }}
          onPress={onLoginPressed}>
          <Text style={{ color: '#FFF', fontSize: 22 }}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={{ fontWeight: '500', marginRight: 10 }}>Ainda não tem uma Conta? </Text>
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
    fontWeight: '500'
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
