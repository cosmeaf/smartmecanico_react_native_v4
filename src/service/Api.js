import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_API = 'http://10.0.0.162/api'
// const BASE_API = 'http://127.0.0.1/api'
//const BASE_API = 'http://173.224.117.181:8002/api'
const BASE_API = 'https://smartmecanico.duckdns.org/api'


// Authentication
export default {
  //-------------------------------------------------------------------------
  // API AUTH USER
  //-------------------------------------------------------------------------
  tokenkVerify: async (token) => {
    try {
      const response = await fetch(`${BASE_API}/verify/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ token })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  tokenkRefresh: async (refresh) => {
    try {
      const response = await fetch(`${BASE_API}/refresh/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ refresh })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  // SIGN-IN
  signIn: async (username, password) => {
    const data = { username, password }
    try {
      const response = await fetch(`${BASE_API}/login/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }

  },
  // SIGN-UP
  signUp: async (username, email, password, password2, first_name, last_name) => {
    const data = { username, email, password, password2, first_name, last_name }
    try {
      const response = await fetch(`${BASE_API}/register/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  // RECOVERY PASSWORD
  recoveryPassword: async (email) => {
    const data = { email }
    try {
      const response = await fetch(`${BASE_API}/recovery-password/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ email })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  // CODE VERIFY
  codeVerify: async (code) => {
    const data = { code }
    try {
      const response = await fetch(`${BASE_API}/opt-code-verify/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  changePassword: async (password, code, token) => {
    const data = { password }
    try {
      const response = await fetch(`${BASE_API}/reset-password/${code}/${token}/`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return null
    }
  },
  //-------------------------------------------------------------------------
  // API ACCESS USER
  //-------------------------------------------------------------------------
  getUser: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/user/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  updateUser: async (id, first_name, last_name) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    const data = { id, first_name, last_name }
    try {
      const response = await fetch(`${BASE_API}/user/${id}/`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteUser: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/user/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API ACCESS PROFILE
  //-------------------------------------------------------------------------
  getProfile: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/profile/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },

  updateProfile: async (id, user, birthday, phone_number, image) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    const data = { id, user, birthday, phone_number, image }
    try {
      const response = await fetch(`${BASE_API}/profile/${id}/`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  updateImage: async (id, formData) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/profile/${id}/`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        redirect: 'follow'
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API VIA CEP
  //-------------------------------------------------------------------------
  getCep: async (cep) => {
    try {
      let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  getAddress: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/address/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createAddress: async (cep, logradouro, complemento, bairro, localidade, uf) => {
    const data = { cep, logradouro, complemento, bairro, localidade, uf }
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/address/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteAddress: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/address/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API VEHICLE
  //-------------------------------------------------------------------------
  getVehicle: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/vehicle/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createVehicle: async (brand, model, fuell, year, odomitter, plate) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    const data = { brand, model, fuell, year, odomitter, plate }
    try {
      const response = await fetch(`${BASE_API}/vehicle/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteVehicle: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/vehicle/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API GET SERVICES
  //-------------------------------------------------------------------------
  getServices: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/service/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API GET HOUR SERVICE
  //-------------------------------------------------------------------------
  getHourService: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/hour-service/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API GET HOUR AVAILABILITY
  //-------------------------------------------------------------------------
  getHourAvailibility: async () => {
    try {
      const response = await fetch(`${BASE_API}/hour-availability/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API SET SCHEDULE
  //-------------------------------------------------------------------------
  getSchedule: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/schedule/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createSchedule: async (day, address, vehicle, service, hour) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/schedule/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ day, address, vehicle, service, hour })
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteSchedule: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/schedule/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API SUPPLY SECTION
  //-------------------------------------------------------------------------
  getSupply: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/supply/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createSupply: async (date, liter, price, kilometer) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/supply/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, liter, price, kilometer })
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteSupply: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/supply/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API MAINTENANCE
  //-------------------------------------------------------------------------
  getMaintenance: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/maintenance/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createMaintenance: async (date, name, end_kilometer, start_kilometer) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/maintenance/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, name, end_kilometer, start_kilometer })
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteMaintenance: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/maintenance/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // API IPVA
  //-------------------------------------------------------------------------
  getIpva: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/ipva/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createIpva: async (date, price) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/ipva/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, price })
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteIpva: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/ipva/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // FINANCING IPVA
  //-------------------------------------------------------------------------
  getFinancing: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/financing/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status != 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createFinancing: async (name, price) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/financing/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price })
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteFinancinga: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/financing/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO | INSURANCE
  //-------------------------------------------------------------------------
  getInsurance: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/insurance/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createInsurance: async (name, price, due_date, policy, broker_name, agent_name, phone_number, email, url) => {
    const data = { name, price, due_date, policy, broker_name, agent_name, phone_number, email, url }
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/insurance/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteInsurance: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/insurance/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO FINE TRAFFIC
  //-------------------------------------------------------------------------
  getFineTraffic: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/fine-traffic/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createFineTraffic: async (date, price, number, point, description) => {
    const data = { date, price, number, point, description }
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/fine-traffic/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteFineTraffic: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/fine-traffic/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO CALIBRATE TIRE | PNEU
  //-------------------------------------------------------------------------
  getCalibrateTire: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/calibrate-tire/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createCalibrateTire: async (date, libra) => {
    const data = { date, libra }
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/calibrate-tire/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteCalibrateTire: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/calibrate-tire/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO EXPENSE TRACKER | BUDGET
  //-------------------------------------------------------------------------
  getBudget: async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/expense-tracker/`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  createBudget: async (name, amount) => {
    const data = { name, amount }
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/expense-tracker/`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        const json = await response.json();
        return json;
      } else if (response.status !== 201) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
  deleteBudget: async (id) => {
    const value = await AsyncStorage.getItem('@accessToken');
    const token = JSON.parse(value)
    try {
      const response = await fetch(`${BASE_API}/expense-tracker/${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.status === 200) {
        const json = await response.json();
        return json;
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error.TypeError
    }
  },
};