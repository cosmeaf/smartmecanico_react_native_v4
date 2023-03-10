import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import Api from '../../../../service/Api';
import TabOneLine from '../../../../componentes/TabOneLine';


const data = [
  { label: 'Troca de Óleo', value: '1' },
  { label: 'Filtro de Óleo', value: '2' },
  { label: 'Filtro de Combustível', value: '3' },
  { label: 'Filtro de Ar', value: '4' },
  { label: 'Filtro Ar Condicionado', value: '5' },
  { label: 'Disco de Freio', value: '6' },
  { label: 'Pastilhas de Freios', value: '7' },
  { label: 'Outros', value: '8' },
];


const AddMaintenance = ({ navigation }) => {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [startKilometer, setStartKilometer] = useState('');
  const [endKilometer, setEndKilometer] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [hasDateError, setHasDateError] = useState(false);

  const [isModalVisibleDate, setIsModalVisibleDate] = useState(false);
  const [isModalVisibleName, setIsModalVisibleName] = useState(false);
  const [isModalVisibleStartKilometer, setIsModalVisibleStartKilometer] = useState(false);
  const [isModalVisibleEndKilometer, setIsModalVisibleEndKilometer] = useState(false);

  const handleModalDate = () => setIsModalVisibleDate(() => !isModalVisibleDate);
  const handleModalName = () => setIsModalVisibleName(() => !isModalVisibleName);
  const handleModalStartKilometer = () => setIsModalVisibleStartKilometer(() => !isModalVisibleStartKilometer);
  const handleModalEndKilometer = () => setIsModalVisibleEndKilometer(() => !isModalVisibleEndKilometer);

  const handleSaveClick = (date, name, startKilometer, endKilometer) => {
    setRefreshing(true)
    if (date.length === 0) {
      Alert.alert('Campo Data não pode ser vázio')
      return
    }
    else if (date.length === 8 || date.length < 9) {
      Alert.alert('Atenção', 'Data deve conter ano completo \n\nDIA/MÊS/ANO(2023)')
      return
    }
    else if (name.length === 0) {
      Alert.alert('Atenção', 'Campo Serviço não pode ser vázio')
      return
    }
    else if (startKilometer.length === 0) {
      Alert.alert('Atenção', 'Campo KM Início não pode ser vázio')
      return
    }
    else if (endKilometer.length === 0) {
      Alert.alert('Atenção', 'Campo KM Final não pode ser vázio')
      return
    } else {
      createMaintenance(date, name, startKilometer, endKilometer)
    }
    setRefreshing(false)
  }

  const createMaintenance = async (date, name, startKilometer, endKilometer) => {
    let newDate = date.split('/').reverse().join('-')
    let json = await Api.createMaintenance(newDate, name, startKilometer, endKilometer)
    if (json.id) {
      navigation.navigate('Maintenance')
    } else if (json.code !== 200) {
      Alert.alert('Atenção', `${json.message.date ? json.message.date : 'Verifique se todos os camps foram preenchidos Corretamente'}`)
    } else {
      Alert.alert('Atenção', 'Verifique se todos os camps foram preenchidos Corretamente')
    }
  }

  useEffect(() => {
    setValue(null)
  }, [isModalVisibleName])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.headerTitle}>Entre com dados de abastecimento</Text>
        {/* Date */}
        <TabOneLine
          title='Data:'
          subTitle={date ? date : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalDate}
        />
        {/* name */}
        <TabOneLine
          title='Serviço:'
          subTitle={name ? name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalName}
        />
        {/* Begin Kilometer */}
        <TabOneLine
          title='Km Saída:'
          subTitle={startKilometer ? startKilometer : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalStartKilometer}
        />
        {/* End Kilometer */}
        <TabOneLine
          title='Km Retorno:'
          subTitle={endKilometer ? endKilometer : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalEndKilometer}
        />

        {/* Modal Date */}
        <Modal isVisible={isModalVisibleDate} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth: 1, borderRadius: 8, paddingLeft: 10, borderColor: isFocus ? 'red' : 'green' }}
              mask="99/99/9999"
              placeholder={`Ano deve Conter 4 Dígitos ${new Date().getFullYear()}`}
              placeholderTextColor="green"
              keyboardType="numeric"
              error={!!hasDateError}
              errorText={hasDateError}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChangeText={(text, rawText) => {
                setDate(text, rawText)
                setIsFocus(false)
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPressOut={() => setIsModalVisibleDate(false)}
                onPress={() => setIsModalVisibleDate(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPressOut={() => setIsModalVisibleDate(false)}
                onPress={() => setIsModalVisibleDate(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Service Name */}
        <Modal isVisible={isModalVisibleName} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              {value < 7 ?
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: '#54Af89' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Selecione um Serviço' : ''}
                  searchPlaceholder="Buscar..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    setName(item.label);
                  }}
                  renderLeftIcon={() => (
                    <Ionicons name="ios-search" size={20} color={isFocus ? '#54Af89' : 'black'} />
                  )}
                />
                :
                <View>
                  <TextInput
                    style={{ borderWidth: 1, marginTop: 20, height: 50, paddingLeft: 10, borderRadius: 10 }}
                    placeholder={!isFocus ? 'Campo Editável' : 'Campo Editável'}
                    placeholderTextColor='#54Af89'
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={name}
                    onChangeText={(text) => {
                      setName(text)
                      setIsFocus(false)
                    }}
                  />
                </View>
              }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleName(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleName(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* KM BEGIN */}
        <Modal isVisible={isModalVisibleStartKilometer} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              type="currency"
              maxLength={7}
              options={{
                decimalSeparator: '.',
                precision: 3,
              }}
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              keyboardType='numeric'
              placeholder={startKilometer ? startKilometer : 'Digite Kilometragem Inícial'}
              onChangeText={(text, rawText) => setStartKilometer(text, rawText)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleStartKilometer(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleStartKilometer(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* KM END */}
        <Modal isVisible={isModalVisibleEndKilometer} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              type="currency"
              maxLength={7}
              options={{
                decimalSeparator: '.',
                precision: 3,
              }}
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              keyboardType='numeric'
              placeholder={endKilometer ? endKilometer : 'Digite Kilometragem Final'}
              onChangeText={(text, rawText) => setEndKilometer(text, rawText)}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleEndKilometer(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleEndKilometer(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.areaButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSaveClick(date, name, startKilometer, endKilometer)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddMaintenance;

const styles = StyleSheet.create({
  headerTitle: { marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' },
  areaButton: { justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  button: {
    width: '94%', backgroundColor: '#54Af89',
    marginRight: 10, marginLeft: 10,
    marginTop: 10, marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5
  },
  textButton: { fontSize: 18, fontWeight: '500', color: '#FFF' },
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2' },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10 },
  modalButtonText: { fontSize: 18, color: '#FFF' },
  dropdown: {
    height: 50,
    borderColor: '#54Af89',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})