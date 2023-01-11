import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API = 'http://10.0.0.162/api'
// const BASE_API = 'http://127.0.0.1/api'
//const BASE_API = 'http://smartmecanico.duckdns.org:8001/api'


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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return { "message": error };
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return { "message": error };
    }
  },
  // SIGN-IN
  signIn: async (username, password) => {
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
        return json
      } else if (response.status !== 200) {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return { "message": error };
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
      return { "message": error };
    }
  },
  //-------------------------------------------------------------------------
  // API ACCESS USER
  //-------------------------------------------------------------------------
  getUser: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error;
    }
  },
  updateUser: async (id, first_name, last_name) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API ACCESS PROFILE
  //-------------------------------------------------------------------------
  getProfile: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      return error;
    }
  },
  updateProfile: async (id, birthday, phone_number) => {
    const value = await AsyncStorage.getItem('accessToken');
    const token = JSON.parse(value)
    const data = { id, birthday, phone_number }
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
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
        let json = await response.json();
        return json;
      } else {
        let json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error
    }
  },
  getAddress: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createAddress: async (cep, logradouro, complemento, bairro, localidade, uf) => {
    const data = { cep, logradouro, complemento, bairro, localidade, uf }
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  deleteAddress: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API VEHICLE
  //-------------------------------------------------------------------------
  getVehicle: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  createVehicle: async (brand, model, fuell, year, odomitter, plate) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  deleteVehicle: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API GET SERVICES
  //-------------------------------------------------------------------------
  getServices: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API GET HOUR SERVICE
  //-------------------------------------------------------------------------
  getHourService: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API SET SCHEDULE
  //-------------------------------------------------------------------------
  getSchedule: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createSchedule: async (day, address, vehicle, service, hour) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      return error;
    }
  },
  deleteSchedule: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API SUPPLY SECTION
  //-------------------------------------------------------------------------
  getSupply: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createSupply: async (date, liter, price, kilometer) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json };
      }
    } catch (error) {
      return error;
    }
  },
  deleteSupply: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API MAINTENANCE
  //-------------------------------------------------------------------------
  getMaintenance: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createMaintenance: async (date, name, end_kilometer, start_kilometer) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status;
      }
    } catch (error) {
      return error;
    }
  },
  deleteMaintenance: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // API IPVA
  //-------------------------------------------------------------------------
  getIpva: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createIpva: async (date, price) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status;
      }
    } catch (error) {
      return error;
    }
  },
  deleteIpva: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // FINANCING IPVA
  //-------------------------------------------------------------------------
  getFinancing: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createFinancing: async (name, price) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status;
      }
    } catch (error) {
      return error;
    }
  },
  deleteFinancinga: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO | INSURANCE
  //-------------------------------------------------------------------------
  getInsurance: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createInsurance: async (name, price, due_date, policy, broker_name, agent_name, phone_number, email, url) => {
    const data = { name, price, due_date, policy, broker_name, agent_name, phone_number, email, url }
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  deleteInsurance: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO FINE TRAFFIC
  //-------------------------------------------------------------------------
  getFineTraffic: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createFineTraffic: async (date, price, number, point, description) => {
    const data = { date, price, number, point, description }
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        const json = await response.json();
        return { "code": response.status, "message": json }
      }
    } catch (error) {
      return error;
    }
  },
  deleteFineTraffic: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  //-------------------------------------------------------------------------
  // END POINT API SMART MECANICO CALIBRATE TIRE | PNEU
  //-------------------------------------------------------------------------
  getCalibrateTire: async () => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
  createCalibrateTire: async (date, libra) => {
    const data = { date, libra }
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status;
      }
    } catch (error) {
      return error;
    }
  },
  deleteCalibrateTire: async (id) => {
    const value = await AsyncStorage.getItem('accessToken');
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
      } else {
        return response.status
      }
    } catch (error) {
      return error;
    }
  },
};