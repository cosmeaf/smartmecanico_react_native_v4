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


const AddFineTraffic = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [number, setNumber] = useState('');
  const [point, setPoint] = useState('');
  const [description, setDescription] = useState('');


  const [isModalVisibleDate, setIsModalVisibleDate] = useState(false);
  const [isModalVisiblePrice, setIsModalVisiblePrice] = useState(false);
  const [isModalVisibleNumber, setIsModalVisibleNumber] = useState(false);
  const [isModalVisiblePoint, setIsModalVisiblePoint] = useState(false);
  const [isModalVisibleDescription, setIsModalVisibleDescription] = useState(false);

  const handleModalDate = () => setIsModalVisibleDate(() => !isModalVisibleDate);
  const handleModalPrice = () => setIsModalVisiblePrice(() => !isModalVisiblePrice);
  const handleModalNumber = () => setIsModalVisibleNumber(() => !isModalVisibleNumber);
  const handleModalPoint = () => setIsModalVisiblePoint(() => !isModalVisiblePoint);
  const handleModalDescription = () => setIsModalVisibleDescription(() => !isModalVisibleDescription);



  const handleSaveClick = (date, price, number, point, description) => {
    console.debug('Save MULTA ', date, price, number, point, description)
    setIsLoading(true)
    if (date.length === 0) {
      Alert.alert('Campo Data não pode ser vázio')
    }
    else if (price.length === 0) {
      Alert.alert('Campo Preço não pode ser vázio')
    }
    else if (number.length === 0) {
      Alert.alert('Campo Código de infração não pode ser vázio')
    }
    else if (point.length === 0) {
      Alert.alert('Campo Pontuação não pode ser vázio')
    }
    else {
      createFineTraffic(date, price, number, point, description)
    }
    setIsLoading(false)
  }


  const createFineTraffic = async (date, price, number, point, description) => {
    let newDate = date.split('/').reverse().join('-')
    let newPrice = price.split('R$').splice(1, 1).toString()
    console.debug('Save MULTA ', newDate, newPrice, number, point, description)
    let json = await Api.createFineTraffic(newDate, newPrice, number, point, description)
    if (json.id) {
      navigation.navigate('FineTraffic')
    } else {
      Alert.alert('Ops! Algo errado aconteceu, tente mais tarde', `Error ${json}`)
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading &&
        <LoadingIcon size='large' color="#54Af89" />
      }
      <ScrollView>
        <Text style={styles.headerTitle}>Entre com dados de abastecimento</Text>
        {/* Date */}
        <TabOneLine
          title='Data:'
          subTitle={date ? date : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalDate}
        />
        {/* Price */}
        <TabOneLine
          title='Preço:'
          subTitle={price ? price : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPrice}
        />
        {/* Number */}
        <TabOneLine
          title='Cód Infração:'
          subTitle={number ? number : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalNumber}
        />
        {/* Point */}
        <TabOneLine
          title='Pontuação:'
          subTitle={point ? point : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPoint}
        />

        {/* Point */}
        <TabOneLine
          title='Observações:'
          subTitle={description ? description : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalDescription}
        />


        {/* Modal Date */}
        <Modal isVisible={isModalVisibleDate} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              mask="99/99/9999"
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              onChangeText={(text, rawText) => setDate(text, rawText)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDate(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDate(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Price */}
        <Modal isVisible={isModalVisiblePrice} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              type="currency"
              keyboardType="numeric"
              options={{
                prefix: 'R$',
                decimalSeparator: '.',
                groupSeparator: ',',
                precision: 2,
              }}
              onChangeText={(text, rawText) => setPrice(text, rawText)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePrice(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePrice(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Number */}
        <Modal isVisible={isModalVisibleNumber} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='numeric'
                textContentType='none'
                autoCapitalize='none'
                returnKeyType='next'
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={number ? number : 'Código da Infração'}
                value={number}
                onChangeText={text => setNumber(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleNumber(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleNumber(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Point */}
        <Modal isVisible={isModalVisiblePoint} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='numeric'
                textContentType='none'
                autoCapitalize='none'
                returnKeyType='next'
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={point ? point : 'Pontuação'}
                value={point}
                onChangeText={text => setPoint(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePoint(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePoint(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Description */}
        <Modal isVisible={isModalVisibleDescription} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='default'
                textContentType='none'
                autoCapitalize='none'
                returnKeyType='next'
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={description ? description : 'Observações'}
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDescription(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDescription(false)}>
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
          onPress={() => handleSaveClick(date, price, number, point, description)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddFineTraffic;

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