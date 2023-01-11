import React, { createContext, useState, useEffect, useReducer } from "react";
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
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    tokenVerify()
  }, []);

  // Sign-In
  const signin = async (username, password) => {
    setIsLoading(false)
    try {
      setIsLoading(true)
      let data = await Api.signIn(username, password)
      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", JSON.stringify(data.access));
        await AsyncStorage.setItem("refreshToken", JSON.stringify(data.refresh));
        setAuthentication(true)
        setIsLoading(false)
      } else if (data.code !== 200) {
        Alert.alert(`Atenção: \nFalha ao acessar Sistema \nTente mais tarde`)
        setAuthentication(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.warn(error)
    }
  }
  // Sign-Up
  const signup = async (username, email, password, password2) => {
    setIsLoading(false)
    try {
      let data = await Api.signUp(username, email, password, password2)
      if (data.id) {
        Alert.alert('Created Succesfully', '\nUsuário criado com sucesso', [
          {
            text: "Continnuar",
            onPress: () => {
              navigation.navigate('LoginScreen');
            }
          },
        ])
      } else if (data.code !== 200) {
        const email = data.message.email;
        const username = data.message.username
        Alert.alert('Atenção', `\n${email} \ne/ou \n${username}`)
      }
    } catch (error) {
      console.warn(error)
    }
    setIsLoading(false)
  }

  //Sign-Out
  const signout = () => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.clear();
    setIsLoading(false)
    setAuthentication(false);
  }

  // Data Persiste, Validation Token and Refresh new Token 
  const tokenVerify = async (token_verify, token_refresh) => {
    const value = await AsyncStorage.getItem('accessToken');
    const token = JSON.parse(value)
    let verify = await Api.tokenkVerify(token)
    if (Object.keys(verify).length == 0) {
      setAuthentication(true)
    } else {
      try {
        const value = await AsyncStorage.getItem('refreshToken');
        const refresh = JSON.parse(value)
        let data = await Api.tokenkRefresh(refresh)
        // console.log('RENEW REFRESH ===========> ' + json.refresh)
        // console.log('RENEW ACCESS ===========> ' + json.access)
        if (data.access && data.refresh) {
          await AsyncStorage.setItem("accessToken", JSON.stringify(data.access));
          await AsyncStorage.setItem("refreshToken", JSON.stringify(data.refresh));
          setAuthentication(true)
        } else {
          signout();
          console.log('TOKEN VERIFY ', data)
          setAuthentication(false);
          setIsLoading(false)
        }
      } catch (error) {
        console.warn(error)
      }
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