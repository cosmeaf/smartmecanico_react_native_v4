import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE_API = 'http://10.0.0.162/api'
const BASE_API = 'http://smartmecanico.duckdns.org:8001/api'


// Authentication
export default {
  // SIGN-IN
  signIn: async (username, password) => {
    //console.log('API SIGNIN ', username, password)
    try {
      const response = await fetch(`${BASE_API}/login/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ username, password })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      return error;
    }
  },
}