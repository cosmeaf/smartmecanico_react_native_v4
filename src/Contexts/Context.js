import React, { createContext, useState, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from '../service/Api';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authentication, setAuthentication] = useState(false);


  useEffect(() => {
    signin();
  }, []);

// Sign-In
const signin = async (username, password) => {
  let json = await Api.signIn(username, password)
  // console.log('SIGN-IN REFRESH ===========> ' + json.refresh)
  // console.log('SIGN-IN ACCESS ===========> ' + json.access)
  if (json.access && json.refresh) {
    await AsyncStorage.setItem("accessToken", JSON.stringify(json.access));
    await AsyncStorage.setItem("refreshToken", JSON.stringify(json.refresh));
    setAuthentication(true)
  } else {
    setIsLoading(false);
    setAuthentication(false);
  }
  setIsLoading(false)
}

  return (
    <GlobalContext.Provider value={{ authentication, isLoading, signin}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext;