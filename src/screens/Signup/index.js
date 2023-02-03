import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  StyleSheet,
  Text, View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, Image, ActivityIndicator, Dimensions, Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { nameValidator } from '../../helpers/nameValidator'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import GlobalContext from '../../Contexts/Context'
import Api from '../../service/Api'


const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const SignUp = ({ navigation }) => {

  const { signup } = useContext(GlobalContext);
  const [username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handledIsVisble = () => setIsVisible(() => !isVisible)

  const handleSignUp = async (username, email, password, password2) => {
    const response = await Api.signUp(username, email, password, password2)
    if (response.id) {
      Alert.alert('Sucesso', 'Sua conta foi criada com sucesso \nAgora Falta pouco para seu acesso', [
        {
          text: "Continuar",
          onPress: () => {
            navigation.replace('SignIn')
          }
        },
      ])
    } else if (response.code === 500 && response.message.username && response.message.email) {
      Alert.alert('Atenção',
        `${response.message.username ? response.message.username : ''} \n& \n${response.message.email ? response.message.email : ''}`)
    } else if (response.code === 500 && response.message.email) {
      Alert.alert('Atenção', `${response.message.email ? response.message.email : ''}`)
    } else if (response.code === 500 && response.message.username) {
      Alert.alert('Atenção', `${response.message.username ? response.message.username : ''}`)
    } else {
      Alert.alert('Ops!', `Estamos com dificuldades para acessar nosso servidores \nPor Favor tente mais tarde`)
    }
  }

  const onSignUpPressed = () => {
    const nameError = nameValidator(username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setUsername({ ...username, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setIsLoading(true)
    handleSignUp(username.value, email.value, password.value, password.value)
    setTimeout(() => setIsLoading(false), 2000)
    return
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
                <Text style={{ fontSize: 12, color: 'red' }}>{username.error}</Text>
                <TextInput
                  style={orientation.width > 500 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  label="Usuário"
                  returnKeyType="next"
                  autoCompleteType="default"
                  textContentType="name"
                  keyboardType="default"
                  placeholder='Usuário'
                  mode={orientation.width > 500 ? 'flat' : 'outlined'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={username.value}
                  onChangeText={(text) => setUsername({ value: text, error: '' })}
                  error={!!username.error}
                  errorText={username.error}
                  left={<TextInput.Icon icon="account-circle-outline" color={theme.colors.primary} size={orientation.width > 500 ? 30 : 20} />}
                />

                <TextInput
                  style={orientation.width > 500 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  label="E-mail"
                  returnKeyType="next"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder='E-mail'
                  mode={orientation.width > 500 ? 'flat' : 'outlined'}
                  underlineColor='transparent'
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
                  left={<TextInput.Icon icon="email-outline" color={theme.colors.primary} size={orientation.width > 500 ? 30 : 20} />}
                />
                <TextInput
                  style={orientation.width > 500 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  placeholder='Senha'
                  mode={orientation.width > 500 ? 'flat' : 'outlined'}
                  autoCapitalize="none"
                  returnKeyType="done"
                  autoCorrect={false}
                  value={password.value}
                  onChangeText={(text) => setPassword({ value: text, error: '' })}
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry={isVisible ? false : true}
                  left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} size={orientation.width > 500 ? 30 : 20} />}
                  right={<TextInput.Icon
                    color={theme.colors.primary}
                    size={orientation.width > 500 ? 30 : 20}
                    icon={isVisible ? "eye-outline" : "eye-off-outline"}
                    error={!!password.error}
                    onPress={() => handledIsVisble()}
                  />}
                />
                <TouchableOpacity
                  onPress={() => onSignUpPressed(username.value, email.value, password.value)}
                  activeOpacity={0.8}
                  style={styles.buttomSign}>
                  <Text style={styles.buttomTextSign}>Entrar</Text>
                </TouchableOpacity>
                <View style={styles.textRegisterArea}>
                  <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
                    <Text style={styles.textRegisterRigth}>Recuperar Senha</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.textRegisterRigth}>Entrar</Text>
                  </TouchableOpacity>
                </View>
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

export default SignUp

const styles = StyleSheet.create({
  containerForm: { paddingHorizontal: orientation.width > 500 ? orientation.width / 5 : 30 },
  imageArea: {
    flex: 1,
    height: orientation.width > 500 ? 200 : null,
    justifyContent: 'center', alignItems: 'center',
    marginTop: orientation.width > 500 ? 100 : 50, marginBottom: orientation.width > 500 ? 100 : 30
  },
  image: { width: orientation.width > 500 ? 500 : 200, height: orientation.width > 500 ? 200 : 100 },
  buttomSign: { height: orientation.width > 500 ? 70 : 50, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'green', marginVertical: 20, borderRadius: 5 },
  buttomTextSign: { color: '#FFF', fontSize: orientation.width > 500 ? 34 : 18, fontWeight: 'bold', letterSpacing: 2 },
  input: { marginBottom: 20 },
  inputTablet: { height: 70, backgroundColor: '#FFF', marginBottom: 20, borderWidth: 1, borderRadius: 10 },
  textRegisterArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  textRegister: { fontSize: orientation.width > 500 ? 22 : 14 },
  textRegisterRigth: { fontSize: orientation.width > 500 ? 22 : 14, fontWeight: 'bold', color: 'green' },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }
})