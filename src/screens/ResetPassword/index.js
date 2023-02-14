import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text, View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback, Image, ActivityIndicator, Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { passwordValidator } from '../../helpers/passwordValidator'
import { repeatPasswordValidator } from '../../helpers/repeatPasswordValidator'
import Api from '../../service/Api'

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState({ value: 'qweasd32', error: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: 'qweasd32', error: '' })

  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handledIsVisble = () => setIsVisible(() => !isVisible)

  const handleRecoveryPassword = async () => {
    const passwordError = passwordValidator(password.value)
    const repeatPasswordError = repeatPasswordValidator(repeatPassword.value)

    if (passwordError || repeatPasswordError) {
      setPassword({ ...password, error: passwordError })
      setRepeatPassword({ ...repeatPassword, error: repeatPasswordError })
      return
    }
    if (password.value !== repeatPassword.value) {
      setPassword({ ...password, error: 'Senha diferente de repetir senha' })
      setRepeatPassword({ ...repeatPassword, error: 'Repetir Senha diferente de senha' })
    }
    const response = await Api.changePassword(password.value, route.params.code, route.params.token);

    if (response.code === 500) {
      Alert.alert('Atenção', `${response.message.error[0]} \nDeseja Solicitar novo código?`, [
        {
          text: "Sim",
          onPress: async () => {
            setIsLoading(true)
            navigation.navigate('ResetPassword');
            setTimeout(() => setIsLoading(false), 2000)
          }
        },
        {
          text: "Não",
          onPress: async () => {
            setIsLoading(true)
            navigation.replace('SignIn');
            setTimeout(() => setIsLoading(false), 2000)
          }
        }
      ])
    } else {
      Alert.alert('Sucesso', `${response.message}`)
      setIsLoading(true)
      navigation.replace('SignIn');
      setTimeout(() => setIsLoading(false), 2000)
    }
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
                <Text style={{ color: '#AB2101' }}>{password.error}</Text>
                <TextInput
                  style={orientation.width > 500 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  placeholder='Nova Senha'
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

                <Text style={{ color: '#AB2101' }}>{repeatPassword.error}</Text>
                <TextInput
                  style={orientation.width > 500 ? styles.inputTablet : styles.input}
                  theme={theme}
                  textColor={theme.colors.primary}
                  placeholderTextColor={theme.colors.second}
                  placeholder='Repetir Nova Senha'
                  mode={orientation.width > 500 ? 'flat' : 'outlined'}
                  autoCapitalize="none"
                  returnKeyType="done"
                  autoCorrect={false}
                  value={repeatPassword.value}
                  onChangeText={(text) => setRepeatPassword({ value: text, error: '' })}
                  error={!!repeatPassword.error}
                  errorText={repeatPassword.error}
                  secureTextEntry={isVisible ? false : true}
                  left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} size={orientation.width > 500 ? 30 : 20} />}
                  right={<TextInput.Icon
                    color={theme.colors.primary}
                    size={orientation.width > 500 ? 30 : 20}
                    icon={isVisible ? "eye-outline" : "eye-off-outline"}
                    error={!!repeatPassword.error}
                    onPress={() => handledIsVisble()}
                  />}
                />
                <TouchableOpacity
                  onPress={() => handleRecoveryPassword(password.value, repeatPassword.value)}
                  activeOpacity={0.8}
                  style={styles.buttomSign}>
                  <Text style={styles.buttomTextSign}>Nova Senha</Text>
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

export default ResetPassword

const styles = StyleSheet.create({
  containerForm: { paddingHorizontal: orientation.width > 500 ? orientation.width / 5 : 30 },
  imageArea: {
    flex: 1,
    height: orientation.width > 500 ? 200 : null,
    justifyContent: 'center', alignItems: 'center',
    marginTop: orientation.width > 500 ? 100 : 50, marginBottom: orientation.width > 500 ? 100 : 30
  },
  image: { width: orientation.width > 500 ? 500 : 200, height: orientation.width > 500 ? 200 : 100 },
  buttomSign: { height: orientation.width > 500 ? 70 : 50, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'green', marginVertical: 20, borderRadius: 8 },
  buttomTextSign: { color: '#FFF', fontSize: orientation.width > 500 ? 34 : 18, fontWeight: 'bold', letterSpacing: 2 },
  input: { marginBottom: 20 },
  inputTablet: { height: 70, backgroundColor: '#FFF', marginBottom: 20, borderWidth: 1, borderRadius: 10 },
  textRegisterArea: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  textRegister: { fontSize: orientation.width > 500 ? 22 : 14, marginRight: 20 },
  textRegisterRigth: { fontSize: orientation.width > 500 ? 22 : 14, fontWeight: 'bold', color: 'green' },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }
})