import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, contentContainerStyle, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import TabOneLine from './TabOneLine';
import Api from '../service/Api';


const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];



const AppointmentModal = ({ isVisible, onPress, serviceId, serviceTitle }) => {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedHour, setSelectedHour] = useState('');
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);
  const [hourMarked, setHourMarked] = useState([]);
  const [hourService, setHourService] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    if (selectedDay > 0) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      // Format Month and Day 'day 9 to 09 | month 1 to 01  '
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      // Create new format date 'YYYY-MM-DD'
      let selDate = `${year}-${month}-${day}`;
      //
      const array1 = hourMarked.filter(({ day, hour }) => day == selDate).map(({ hour }) => hour)
      let array2 = hourService.map(({ hour }) => hour)
      setListHours(array2.filter(item => !array1.includes(item)))
    }

  }, [selectedDay, selectedHour])

  useEffect(() => {
    // Get Day in Month
    let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    let newListDays = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      let d = new Date(selectedYear, selectedMonth, i);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      // Format Month and Day 'day 9 to 09 | month 1 to 01  '
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      // Create new format date 'YYYY-MM-DD'
      let selDate = `${year}-${month}-${day}`;
      // Map verify if date exist in calendater API
      let dayAvailable = hourMarked.filter(({ day }) => day === selDate)

      // Push data on Array and get result fo calendar screen
      newListDays.push({
        status: dayAvailable.length > 0 ? true : false,
        weekday: days[d.getDay()],
        number: i
      })
    }

    setListDays(newListDays);
    setSelectedDay(0);
    setSelectedHour(0);
    setSelectedHour('');

  }, [selectedMonth, selectedYear, setHourMarked])

  useEffect(() => {
    let today = new Date();
    setSelectedDay(today.getDate());
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    getHourAvailibility();
    getHourService();
    getVehicle();
    getAddress();
  }, [])

  const handleRightClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  }
  const handleLeftClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  }

  const getHourAvailibility = async () => {
    setHourMarked([])
    let data = await Api.getHourAvailibility();
    setHourMarked(data);
  }

  const getVehicle = async () => {
    let res = await Api.getVehicle();
    if (res) {
      res.map((item, key) => (
        setVehicle(item)
      ));
    } else {
      console.warn('Ops! GET VEÍCULOS', `Error ${res.status}`)
    }
  }

  const getHourService = async () => {
    setHourService([])
    let data = await Api.getHourService();
    setHourService(data);
  }

  const getAddress = async () => {
    setAddress([])
    let res = await Api.getAddress();
    if (res) {
      res.map((item, key) => (
        setAddress(item)
      ));
    } else {
      console.log('Ops! Estamos com problema para carregar dados do CEP. Pro Favor Tente mais tarde', `Error ${res.status}`)
      signout();
    }
  }

  const handleSaveClick = async () => {
    let year = selectedYear;
    let month = selectedMonth + 1;
    let day = selectedDay
    const date = `${year}-${month}-${day}`
    if (date.length === 0) {
      Alert.alert('Atenção', 'Ops, Error ao carregar dados da data')
    } else if (address.id.length === 0) {
      Alert.alert('Atenção', 'Ops, Error ao carregar dados do endereço')
    } else if (vehicle.id.length === 0 || !vehicle.id) {
      Alert.alert('Atenção', 'Ops, Error ao carregar dados do veículo')
    } else if (serviceId.length === 0 || !serviceId) {
      Alert.alert('Atenção', 'Ops, Error ao carregar dados do serviço')
    } else if (!selectedHour || selectedHour.length === 0) {
      Alert.alert('Atenção', 'Por Favor, selecione um Horário')
    } else {
      let res = await Api.createSchedule(date, address.id, vehicle.id, serviceId, selectedHour);
      if (res.id) {
        Alert.alert('Successo', 'Seu Agendamento foi \nRealizado com Sucesso')
        navigation.navigate('Schedule')
      } else {
        Alert.alert('Falha', `${res ? res : ''}`)
      }

    }
  }

  console.log(vehicle)
  if (vehicle.length === 0) {
    return (
      <Modal isVisible={isVisible} animationIn='slideInUp' animationOut='slideOutDown' style={styles.modal}>
        <TouchableOpacity onPress={onPress} style={styles.modalButtomClose}>
          <Ionicons name="chevron-down" size={30} color="green" />
          <Text>Fechar</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
            <Text style={{ color: 'tomato', fontSize: 30, fontWeight: 'bold' }}>Atenção</Text>
          </View>
          <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, letterSpacing: 1, marginBottom: 10 }}>
              Estamos muito felizes em saber que gostária de realizar um agendamento com a Smart Mecânico.
            </Text>
            <Text style={{ fontSize: 18, letterSpacing: 1 }}>
              Idendificamos que você ainda não cadastrou um veículo em nosso sistema. Para realizar um agendamento, é necesário cadastrar um Veículo.
            </Text>
          </View>
          <TouchableOpacity
            onPressOut={onPress}
            onPress={() => navigation.navigate('AddVehicle')}
            style={{ padding: 10, backgroundColor: 'green', marginLeft: 14, marginRight: 14, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center' }}>Cadastrar Veículo</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  } else if (address.length === 0) {
    return (
      <Modal isVisible={isVisible} animationIn='slideInUp' animationOut='slideOutDown' style={styles.modal}>
        <TouchableOpacity onPress={onPress} style={styles.modalButtomClose}>
          <Ionicons name="chevron-down" size={30} color="green" />
          <Text>Fechar</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
            <Text style={{ color: 'tomato', fontSize: 30, fontWeight: 'bold' }}>Atenção</Text>
          </View>
          <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, letterSpacing: 1, marginBottom: 10 }}>
              Estamos muito felizes em saber que gostária de realizar um agendamento com a Smart Mecânico.
            </Text>
            <Text style={{ fontSize: 18, letterSpacing: 1 }}>
              Idendificamos que você ainda não cadastrou um Endereço em nosso sistema. Para realizar um agendamento, é necesário cadastrar um Endereço.
            </Text>
          </View>
          <TouchableOpacity
            onPressOut={onPress}
            onPress={() => navigation.navigate('Address')}
            style={{ padding: 10, backgroundColor: 'green', marginLeft: 14, marginRight: 14, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center' }}>Cadastrar Endereço</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  } else {
    return (
      <Modal isVisible={isVisible} animationIn='slideInUp' animationOut='slideOutDown' style={styles.modal}>
        {/* Modal header */}
        <TouchableOpacity onPress={onPress} style={styles.modalButtomClose}>
          <Ionicons name="chevron-down" size={30} color="green" />
          <Text>Fechar</Text>
        </TouchableOpacity>
        {/* Modal Body */}
        <View style={{ flex: 0.6, marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
          <TabOneLine title='Serviço:' subTitle={serviceTitle} />
          <TabOneLine title='Veículo:' subTitle={vehicle.plate} onPress={() => { }} />
          <View style={{ flexDirection: 'row', height: 40, backgroundColor: '#FFF', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 40 }} onPress={handleLeftClick}>
              <Ionicons name="ios-chevron-back-circle" size={30} color="green" />
            </TouchableOpacity>

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{month[selectedMonth]}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedYear}</Text>

            <TouchableOpacity style={{ marginRight: 40 }} onPress={handleRightClick}>
              <Ionicons name="ios-chevron-forward-circle" size={30} color="green" />
            </TouchableOpacity>

          </View>
        </View>
        <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {listDays.map((item, index) => (
              <TouchableOpacity key={index}
                onPress={() => item.number ? setSelectedDay(item.number) : null}
                style={{ height: 50, width: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 3, marginRight: 3, borderRadius: 10, backgroundColor: item.number === selectedDay ? 'green' : 'white' }}>
                <Text style={{ color: item.number === selectedDay ? '#FFF' : '#000' }}>{item.weekday}</Text>
                <Text style={{ color: item.number === selectedDay ? '#FFF' : '#000' }}>{item.number}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Modal ScrollView Hour */}
        <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {listHours.map((item, index) => (
              <TouchableOpacity key={index}
                onPress={() => item ? setSelectedHour(item) : null}
                style={{ height: 50, width: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 3, marginRight: 3, borderRadius: 10, backgroundColor: item === selectedHour ? 'green' : 'white' }}>
                <Text style={{ color: item === selectedHour ? '#FFF' : '#000' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Modal Button End Appointment */}
        <View style={{ flex: 0.9, justifyContent: 'flex-end', marginBottom: 30 }}>
          <TouchableOpacity
            onPress={() => handleSaveClick()}
            style={{ padding: 10, backgroundColor: 'green', marginLeft: 14, marginRight: 14, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center' }}>Finalizar Agendamento</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1', borderRadius: 20 },
  modalButtomClose: { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 20, marginBottom: 10 },
})

export default AppointmentModal;