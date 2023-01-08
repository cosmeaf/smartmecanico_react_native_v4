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


const AddCalibrateTire = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [libra, setLibra] = useState('');


  const [isModalVisibleDate, setIsModalVisibleDate] = useState(false);
  const [isModalVisibleLibra, setIsModalVisibleLibra] = useState(false);

  const handleModalDate = () => setIsModalVisibleDate(() => !isModalVisibleDate);
  const handleModalLibra = () => setIsModalVisibleLibra(() => !isModalVisibleLibra);



  const handleSaveClick = (date, libra) => {
    console.debug('Save Calibragem Page ', date, libra)
    setIsLoading(true)
    if (date.length === 0) {
      Alert.alert('Campo Data não pode ser vázio')
    }
    else if (libra.length === 0) {
      Alert.alert('Campo Libra não pode ser vázio')
    } else {
      createCalibrateTire(date, libra)
    }
    setIsLoading(false)
  }


  const createCalibrateTire = async (date, libra) => {
    let newDate = date.split('/').reverse().join('-')
    let json = await Api.createCalibrateTire(newDate, libra)
    if (json.id) {
      navigation.navigate('CalibrateTire')
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
        <Text style={styles.headerTitle}>Entre com dados de Calibragem</Text>
        {/* Date */}
        <TabOneLine
          title='Data:'
          subTitle={date ? date : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalDate}
        />
        {/* Libra */}
        <TabOneLine
          title='Libras:'
          subTitle={libra ? libra : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalLibra}
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
        {/* Modal Libra */}
        <Modal isVisible={isModalVisibleLibra} style={styles.modal}>
          <View style={styles.modalContainer}>
            <TextInput
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              mode='outlined'
              keyboardType='numeric'
              maxLength={2}
              placeholder={libra ? libra : 'Quantidade em Libra'}
              value={libra}
              onChangeText={(text, rawText) => setLibra(text, rawText)}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleLibra(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleLibra(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.areaButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSaveClick(date, libra)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddCalibrateTire;

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