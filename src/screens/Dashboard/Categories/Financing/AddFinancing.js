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


const AddFinancing = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');


  const [isModalVisibleDate, setIsModalVisibleDate] = useState(false);
  const [isModalVisibleName, setIsModalVisibleName] = useState(false);
  const [isModalVisiblePrice, setIsModalVisiblePrice] = useState(false);

  const handleModalDate = () => setIsModalVisibleDate(() => !isModalVisibleDate);
  const handleModalName = () => setIsModalVisibleName(() => !isModalVisibleName);
  const handleModalPrice = () => setIsModalVisiblePrice(() => !isModalVisiblePrice);



  const handleSaveClick = (date, price) => {
    setIsLoading(true)
    if (name.length === 0) {
      Alert.alert('Campo Data não pode ser vázio')
    }
    else if (price.length === 0) {
      Alert.alert('Campo Serviço não pode ser vázio')
    } else {
      createFinancing(name, price)
    }
    setIsLoading(false)
  }


  const createFinancing = async (name, pricer) => {
    let newPrice = price.split('R$').splice(1, 1).toString()
    let json = await Api.createFinancing(name, newPrice)
    if (json.id) {
      navigation.navigate('Financing')
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
        <Text style={styles.headerTitle}>Entre com dados de Financiamento</Text>
        {/* name */}
        <TabOneLine
          title='Financeira:'
          subTitle={name ? name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalName}
        />
        {/* Price */}
        <TabOneLine
          title='Preço:'
          subTitle={price ? price : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPrice}
        />


        {/* Modal Name */}
        <Modal isVisible={isModalVisibleName} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                mode='outlined'
                keyboardType='default'
                placeholder={name ? name : 'Nome da Financeira'}
                value={name}
                onChangeText={text => setName(text)}
              />
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
        {/* Modal Price */}
        <Modal isVisible={isModalVisiblePrice} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              type="currency"
              keyboardType="numeric"
              options={{
                prefix: 'R$ ',
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
      </ScrollView>

      {/* Save Button */}
      <View style={styles.areaButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSaveClick(date, price)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddFinancing;

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