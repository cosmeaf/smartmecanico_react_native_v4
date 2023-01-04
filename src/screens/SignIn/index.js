import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
// expo install expo-linear-gradient (For Expo Users)
// Alternate: npm i react-native-linear-gradient (For non-expo users)
import { LinearGradient } from 'expo-linear-gradient';

// npm install react-native-elements
import { Icon } from 'react-native-elements';

// https://fonts.google.com/specimen/Nunito+Sans
import GlobalContext from '../../Contexts/Context';
import { styles } from './styles';


export default () => {
  const [activeTab, setActiveTab] = useState('Login');
  useEffect(function () {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  function switchTab() {
    if (activeTab === 'Login') {
      setActiveTab('Register');
    } else {
      setActiveTab('Login');
    }
  }

  function Login() {
    const { signin } = useContext(GlobalContext);
    const [username, setUsername] = useState('fulano');
    const [password, setPassword] = useState('qweasd32');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const startLoading = () => {
      setIsLoading(true);
      setTimeout(() => {
        signin(username, password);
        setActiveTab('Login');
        setIsLoading(false);
      }, 1000);
    };

    const hundleSignIn = (username, password) => {
      if (username == '' && password == '') {
        alert('Campos não podem ser vazios')
      } else {
        startLoading();
      }
    }

    if (isloading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89' }}>
          <ActivityIndicator size='large' color="#FFF" />
        </View>
      )
    }
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4 }}
            name='user'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Usuário'
            placeholderTextColor='#f1f2f6'
            keyboardType='default'
            textContentType='name'
            autoCapitalize='none'
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            returnKeyType='next'
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={{ paddingHorizontal: 4 }} name='key' type='font-awesome-5' color='#fff' size={22} />
          <TextInput
            style={styles.input}
            placeholder='Senha'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showLoginPassword}
            textContentType='password'
            autoCapitalize='none'
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            returnKeyType='done'
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={{ paddingVertical: 4 }} onPress={() => { setShowLoginPassword(!showLoginPassword); }}>
            <Icon style={{ paddingHorizontal: 4 }} name='eye' type='font-awesome' color='#fff' size={22} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => hundleSignIn(username, password)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginView}>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='google' type='font-awesome' color='#60d3A4' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='facebook' type='font-awesome' color='#60d3A4' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='apple' type='font-awesome' color='#60d3A4' />
          </TouchableOpacity>
        </View>
      </View>
    );


  }

  function Register() {
    const { signup } = useContext(GlobalContext);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRegisterPassword2, setShowRegisterPassword2] = useState(false);
    const [username, setUsername] = useState('fulano');
    const [email, setEmail] = useState('fulano@gmail.com');
    const [password, setPassword] = useState('qweasd32');
    const [password2, setPassword2] = useState('qweasd32');
    const [isloading, setIsLoading] = useState(false);

    const startLoading = () => {
      setIsLoading(true);
      setTimeout(() => {
        signup(username, email, password, password2)
        setActiveTab('Login')
        setIsLoading(false);
      }, 800);
    };

    const handleSignUp = (username, email, password, password2) => {
      if (username == '' && email == '' && password == '' && password2 == '') {
        Alert.alert('Error', 'Ops! Você não preencheu nenhum campo. Desta forma não consiguirá realizar seu cadastro, vamos lá, falta só um pouco')
      }
      if (username == '' || email == '' || password == '' || password2 == '') {
        Alert.alert('Error', 'Ops! Acho que algum campo ficou sem preencher, Verifique en tente novamente')
      }
      if (password != password2) {
        Alert.alert('Error', 'Ops! Acho que a senha que digitou não são iguais... Verifique se digitou algo errado e tente novamente!')
      }
      startLoading();
    }

    if (isloading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89' }}>
          <ActivityIndicator size='large' color="#FFF" />
        </View>
      );
    }
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='user'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            placeholder='Nome'
            placeholderTextColor='#f1f2f6'
            textContentType='name'
            autoCompleteType='name'
            autoCapitalize='none'
            returnKeyType='next'
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='envelope'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            placeholder='E-mail'
            placeholderTextColor='#f1f2f6'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            autoCompleteType='email'
            returnKeyType='next'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            placeholder='Senha'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showRegisterPassword}
            textContentType='password'
            keyboardType='default'
            returnKeyType='next'
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowRegisterPassword(!showRegisterPassword);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>

        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Confirmar Senha'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showRegisterPassword2}
            textContentType='password'
            returnKeyType='done'
            value={password2}
            onChangeText={text => setPassword2(text)}
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowRegisterPassword2(!showRegisterPassword2);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp(username, email, password, password2)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 30,
              fontSize: 18,
              color: '#fff',
            }}
          >
            Ou Acesse:
          </Text>
          <View
            style={[
              styles.socialLoginView,
              { marginTop: 14, justifyContent: 'flex-start' },
            ]}
          >
            <TouchableOpacity
              style={[styles.socialLoginTouchable, { marginLeft: 0 }]}
            >
              <Icon name='google' type='font-awesome' color='#60d3A4' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginTouchable}>
              <Icon name='facebook' type='font-awesome' color='#60d3A4' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginTouchable}>
              <Icon name='apple' type='font-awesome' color='#60d3A4' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient colors={['#54Af89', '#60d3A4']} style={styles.container}>
        <Text style={styles.welcomeText}>
          {activeTab === 'Login' ? 'Bem Vindo' : 'Registrar Agora'}
        </Text>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Login' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Register' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Login' ? <Login /> : <Register />}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

