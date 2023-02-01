import React, { createContext, useState, useEffect, useReducer } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from '../service/Api';
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [authentication, setAuthentication] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    tokenVerify();
    getToken();
    getRefreshToken();
  }, [accessToken, refreshToken]);

  // Sign-In
  const signin = async (username, password) => {
    try {
      const response = await Api.signIn(username, password)
      if (response.access && response.refresh) {
        setAuthentication(true)
        await AsyncStorage.setItem("@accessToken", JSON.stringify(response.access));
        await AsyncStorage.setItem("@refreshToken", JSON.stringify(response.refresh));
        setIsLoading(false)
        return
      } else if (response.message.detail) {
        Alert.alert('Atenção', `${response.message.detail}`)
        setIsLoading(false)
        return false
      } else {
        Alert.alert('Atenção', `${response}`)
        setIsLoading(false)
        return false
      }
    } catch (error) {
      if (error.name) {
        Alert.alert('Atenção', 'Falha de conexão ao sistema')
        setIsLoading(false)
        return false
      }
    }
  }

  // Sign-Up
  const signup = async (username, email, password, password2) => {
    try {
      let data = await Api.signUp(username, email, password, password2)
      if (data.id) {
        Alert.alert('Created Succesfully', '\nUsuário criado com sucesso', [
          {
            text: "Continnuar",
            onPress: () => {
              setIsLoading(true)
              navigation.navigate('LoginScreen');
              setIsLoading(false)
            }
          },
        ])
      } else if (data.code !== 200) {
        const email = data.message.email;
        const username = data.message.username
        if (email) {
          Alert.alert('Atenção', `${email}`)
          setIsLoading(false)
        } else if (username) {
          Alert.alert('Atenção', `${username}`)
          setIsLoading(false)
        }
      }
    } catch (error) {
      if (error.name) {
        setIsLoading(false)
        Alert.alert('Atenção', 'Falha de conexão ao sistema')
        setIsLoading(true)
      }
    }
  }

  //Sign-Out
  const signout = async () => {
    try {
      setIsLoading(true)
      await AsyncStorage.removeItem('@accessToken')
      await AsyncStorage.removeItem('@refreshToken')
      await AsyncStorage.clear();
      setAuthentication(false)
    } catch (e) {
      return null
    }
    setAuthentication(false)
    setIsLoading(false)
  }


  const getRefreshToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@refreshToken')
      const refresh = JSON.parse(value);
      setRefreshToken(refresh)
    } catch (e) {
      return null
    }
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@accessToken')
      const token = JSON.parse(value);
      setAccessToken(token)
    } catch (e) {
      return null
    }
  }

  // Data Persiste, Validation Token and Refresh new Token 
  const tokenVerify = async () => {
    try {
      setIsLoading(true)
      // Verify if Token and RefreshToken stored on useState
      if (!accessToken && !refreshToken) {
        setAuthentication(false)
      } else {
        const tokenValidate = await Api.tokenkVerify(accessToken)
        // Verify Token Is Not Valide and to Refresh Token
        if (tokenValidate.code === 401 && tokenValidate.message.code == "token_not_valid") {
          const refresh = await Api.tokenkRefresh(refreshToken)
          // Verify if RefreshToken is not Valid
          if (refresh.code === 401 && refresh.message.code === "token_not_valid") {
            setAuthentication(false)
          }
        } else {
          setAuthentication(true)
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
      return null
    }
    setIsLoading(false)
  }


  return (
    <GlobalContext.Provider value={{ authentication, isLoading, signin, signup, signout, tokenVerify }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext;