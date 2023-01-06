import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import LoadingIcon from '../../../componentes/LoadingIcon';
import Api from '../../../service/Api';
import TabOneLine from '../../../componentes/TabOneLine';



const AddSupply = ({navigation}) => {
  const [kilometer, setKilometer] = useState('');
  const [date, setDate] = useState('');
  const [liter, setLiter] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const [isModalVisibleDate, setIsModalVisibleDate] = useState(false);
  const [isModalVisibleLiter, setIsModalVisibleLiter] = useState(false);
  const [isModalVisiblePrice, setIsModalVisiblePrice] = useState(false);
  const [isModalVisibleKilometer, setIsModalVisibleKilometer] = useState(false);

  const handleModalDate = () => setIsModalVisibleDate(() => !isModalVisibleDate);
  const handleModalLiter = () => setIsModalVisibleLiter(() => !isModalVisibleLiter);
  const handleModalPrice = () => setIsModalVisiblePrice(() => !isModalVisiblePrice);
  const handleModalKilometer = () => setIsModalVisibleKilometer(() => !isModalVisibleKilometer);


  const handleSaveClick = (date, liter, price, kilometer) =>{
    setIsLoading(true)
    if(date.length === 0){
      Alert.alert('Campo Data não pode ser vázio')   
    }
    else if(liter.length === 0){
      Alert.alert('Campo Litro não pode ser vázio')
    }
    else if(price.length === 0){
      Alert.alert('Campo Preço não pode ser vázio')
    }
    else if(kilometer.length === 0){
      Alert.alert('Campo Kilometragem não pode ser vázio')
    }else{
      createSupply(date, liter, price, kilometer)
    }
    setIsLoading(false)
  }

  const createSupply = async (date, liter, price, kilometer) => {
    let newDate =  date.split('/').reverse().join('-')
    let newPrice =  price.split('R$').splice(1, 1).toString()
    let json = await Api.createSupply(newDate, liter, newPrice, kilometer)   
    if(json.id){
      navigation.navigate('Supply')
    }else{
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
        subTitle={date ? date : <Ionicons name="ios-add-circle-outline" size={24} color="black" /> } 
        onPress={handleModalDate} 
        />
        {/* Liter */}
        <TabOneLine 
        title='Litros:'
        subTitle={liter ? liter : <Ionicons name="ios-add-circle-outline" size={24} color="black" /> } 
        onPress={handleModalLiter} 
        />
        {/* Price */}
        <TabOneLine 
        title='Preço:'
        subTitle={price ? price : <Ionicons name="ios-add-circle-outline" size={24} color="black" /> } 
        onPress={handleModalPrice} 
        />
        {/* kilometer */}
        <TabOneLine 
        title='Kilometragem:' 
        subTitle={kilometer ? kilometer : <Ionicons name="ios-add-circle-outline" size={24} color="black" /> } 
        onPress={handleModalKilometer} />

        {/* Modal Date */}
        <Modal isVisible={isModalVisibleDate} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth:0.5, borderRadius:10, paddingLeft:10}}
              mask="99/99/9999"
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              onChangeText={(text, rawText) => setDate(text, rawText) }
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
        {/* Modal Liter */}
        <Modal isVisible={isModalVisibleLiter} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth:0.5, borderRadius:10, paddingLeft:10}}
              type="currency"
              keyboardType="numeric"
              options={{
                decimalSeparator: '.',
                groupSeparator: ',',
                precision: 1,
              }}
              onChangeText={(text, rawText) => setLiter(text, rawText) }
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleLiter(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleLiter(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Price */}
        <Modal isVisible={isModalVisiblePrice} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth:0.5, borderRadius:10, paddingLeft:10}}
              type="currency"
              keyboardType="numeric"
              options={{
                prefix: 'R$',
                decimalSeparator: '.',
                groupSeparator: ',',
                precision: 2,
              }}
              onChangeText={(text, rawText) => setPrice(text, rawText) }
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
        {/* Kilometer */}
        <Modal isVisible={isModalVisibleKilometer} style={styles.modal}>
          <View style={styles.modalContainer}>
            <TextInput
              style={{ height: 40, }}
              mode='outlined'
              keyboardType='numeric'
              placeholder={kilometer ? kilometer : 'Digite Kilometragem'}
              value={kilometer}
              onChangeText={text => setKilometer(text)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleKilometer(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleKilometer(false)}>
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
        onPress={()=>handleSaveClick(date, liter, price, kilometer)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddSupply

const styles = StyleSheet.create({
  headerTitle:{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' },
  areaButton:{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  button: {width: '94%', backgroundColor: '#54Af89',
  marginRight: 10, marginLeft: 10, 
  marginTop: 10, marginBottom: 20, 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: 10, 
  borderRadius: 10, 
  borderWidth: 0.5 
},
  textButton:{ fontSize: 18, fontWeight: '500', color: '#FFF' },
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2' },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10 },
  modalButtonText: { fontSize: 18, color: '#FFF' },
})