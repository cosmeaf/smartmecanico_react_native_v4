import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  StyleSheet,
  Text, View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, Image, ActivityIndicator, Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import GlobalContext from '../../Contexts/Context'

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const SignIn = ({ navigation }) => {

  const { signin } = useContext(GlobalContext);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handledIsVisble = () => setIsVisible(() => !isVisible)

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setIsLoading(true)
    signin(email.value, password.value)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const theme = {
    colors: {
      primary: 'green',
      second: 'grey',
      backgroundColor: 'white'
    },
  }

  return isLoading ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='green' />
    </View>
    :
    (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView enabled behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerForm}>
                <View style={styles.imageArea}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/image/logo.png')}
                    resizeMode='cover'
                  />
                </View>
                <TextInput
                  style={orientation.width > 400 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  label="E-mail"
                  returnKeyType="next"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder='E-mail'
                  mode={orientation.width > 400 ? 'flat' : 'outlined'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
                  left={<TextInput.Icon icon="email-outline" color={theme.colors.primary} size={orientation.width > 400 ? 30 : 20} />}
                />
                <TextInput
                  style={orientation.width > 400 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  placeholder='Senha'
                  mode={orientation.width > 400 ? 'flat' : 'outlined'}
                  autoCapitalize="none"
                  returnKeyType="done"
                  autoCorrect={false}
                  value={password.value}
                  onChangeText={(text) => setPassword({ value: text, error: '' })}
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry={isVisible ? false : true}
                  left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} size={orientation.width > 400 ? 30 : 20} />}
                  right={<TextInput.Icon
                    color={theme.colors.primary}
                    size={orientation.width > 400 ? 30 : 20}
                    icon={isVisible ? "eye-outline" : "eye-off-outline"}
                    error={!!password.error}
                    onPress={() => handledIsVisble()}
                  />}
                />
                <View style={styles.textRegisterArea}>
                  <Text style={styles.textRegister}>Ainda não tem Registro?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.textRegisterRigth}>Registrar</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => onLoginPressed(email.value, password.value)}
                  activeOpacity={0.8}
                  style={styles.buttomSign}>
                  <Text style={styles.buttomTextSign}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

        </ScrollView>
        <View style={styles.footer}>
          <Text>Versão: {Platform.Version}</Text>
          <Text>Plataforma: {Platform.OS}</Text>
        </View>
      </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
  containerForm: { paddingHorizontal: orientation.width > 400 ? orientation.width / 5 : 30 },
  imageArea: {
    flex: 1,
    height: orientation.width > 400 ? 200 : null,
    justifyContent: 'center', alignItems: 'center',
    marginTop: orientation.width > 400 ? 100 : 50, marginBottom: orientation.width > 400 ? 100 : 30
  },
  image: { width: orientation.width > 400 ? 400 : 200, height: orientation.width > 400 ? 200 : 100 },
  buttomSign: { height: orientation.width > 400 ? 70 : 50, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'green', marginVertical: 20, borderRadius: 5 },
  buttomTextSign: { color: '#FFF', fontSize: orientation.width > 400 ? 34 : 18, fontWeight: 'bold', letterSpacing: 2 },
  input: { marginBottom: 20 },
  inputTablet: { height: 70, backgroundColor: '#FFF', marginBottom: 20, borderWidth: 1, borderRadius: 10 },
  textRegisterArea: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  textRegister: { fontSize: orientation.width > 400 ? 22 : 14, marginRight: 20 },
  textRegisterRigth: { fontSize: orientation.width > 400 ? 22 : 14, fontWeight: 'bold', color: 'green' },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }
})