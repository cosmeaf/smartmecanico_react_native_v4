import React, { useState, useEffect, useRef } from 'react'
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
import Api from '../../service/Api'


const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const RecoveryPassword = ({ navigation }) => {
  const [email, setEmail] = useState({ value: 'cosme.alex@gmail.com', error: '' })
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handledIsVisble = () => setIsVisible(() => !isVisible)

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

                <View style={styles.textRegisterArea}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.textRegisterRigth}>Tenho Registro!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.textRegisterRigth}>Registrar -se?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => sendResetPasswordEmail(email.value)}
                  activeOpacity={0.8}
                  style={styles.buttomSign}>
                  <Text style={styles.buttomTextSign}>Enviar</Text>
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

export default RecoveryPassword

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
  textRegisterArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  textRegister: { fontSize: orientation.width > 400 ? 22 : 14, marginRight: 20 },
  textRegisterRigth: { fontSize: orientation.width > 400 ? 22 : 14, fontWeight: 'bold', color: 'green' },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }
})