import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
import GlobalContext from '../Contexts/Context'
import LoadingIcon from '../componentes/LoadingIcon'

export default function RegisterScreen({ navigation }) {
  const { signup, isLoading } = useContext(GlobalContext);
  const [name, setName] = useState({ value: 'fulano', error: '' })
  const [email, setEmail] = useState({ value: 'fulano@gmail.com', error: '' })
  const [password, setPassword] = useState({ value: 'qweasd32', error: '' })

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
    signup(name.value, email.value, password.value, password.value)
  }

  {
    return (<LoadingIcon /> &&
      <Background>
        <Logo />
        <Header>Criar uma Conta</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
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
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: theme.colors.primary, height: 50, borderRadius: 20, marginBottom: 20 }}
          onPress={onSignUpPressed}>
          <Text style={{ color: '#FFF', fontSize: 22 }}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    )
  }

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
