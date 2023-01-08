import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import Api from '../../../../service/Api';
import TabOneLine from '../../../../componentes/TabOneLine';


const AddInsurance = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [due_date, setDue_date] = useState('');
  const [policy, setPolicy] = useState('');
  const [broker_name, setBroker_name] = useState('');
  const [agent_name, setAgent_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const [isModalVisibleName, setIsModalVisibleName] = useState(false);
  const [isModalVisiblePrice, setIsModalVisiblePrice] = useState(false);
  const [isModalVisibleDueDate, setIsModalVisibleDueDate] = useState(false);
  const [isModalVisiblePolicy, setIsModalVisiblePolicy] = useState(false);
  const [isModalVisibleBrokerName, setIsModalVisibleBrokerName] = useState(false);
  const [isModalVisibleAgentName, setIsModalVisibleAgentName] = useState(false);
  const [isModalVisiblePhoneNumber, setIsModalVisiblePhoneNumber] = useState(false);
  const [isModalVisibleEmail, setIsModalVisibleEmail] = useState(false);
  const [isModalVisibleUrl, setIsModalVisibleUrl] = useState(false);

  const handleModalName = () => setIsModalVisibleName(() => !isModalVisibleName);
  const handleModalPrice = () => setIsModalVisiblePrice(() => !isModalVisiblePrice);
  const handleModalDueDate = () => setIsModalVisibleDueDate(() => !isModalVisibleDueDate);
  const handleModalPolicy = () => setIsModalVisiblePolicy(() => !isModalVisiblePolicy);
  const handleModalBrokerName = () => setIsModalVisibleBrokerName(() => !isModalVisibleBrokerName);
  const handleModalAgentName = () => setIsModalVisibleAgentName(() => !isModalVisibleAgentName);
  const handleModalPhoneNumber = () => setIsModalVisiblePhoneNumber(() => !isModalVisiblePhoneNumber);
  const handleModalEmail = () => setIsModalVisibleEmail(() => !isModalVisibleEmail);
  const handleModalUrl = () => setIsModalVisibleUrl(() => !isModalVisibleUrl);



  const handleSaveClick = (name, price, due_date = '', policy = '', broker_name = '', agent_name = '', phone_number = '', email = '', url = '') => {
    setIsLoading(true)
    if (name.length === 0) {
      Alert.alert('Campo Nome Seguradora não pode ser vázio')
    }
    else if (price.length === 0) {
      Alert.alert('Campo Preço não pode ser vázio')
    } else {
      createInsurance(name, price, due_date, policy, broker_name, agent_name, phone_number, email, url)
    }
    setIsLoading(false)
  }


  const createInsurance = async (name, price, due_date, policy, broker_name, agent_name, phone_number, email, url) => {
    let newDate = due_date.split('/').reverse().join('-')
    let newPrice = price.split('R$').splice(1, 1).toString()
    let json = await Api.createInsurance(name, newPrice, newDate, policy, broker_name, agent_name, phone_number, email, url)
    if (json.id) {
      navigation.navigate('Insurance')
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
        <Text style={styles.headerTitle}>Entre com dados de Seguradora</Text>
        {/* name */}
        <TabOneLine
          title='Seguradora:'
          subTitle={name ? name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalName}
        />
        {/* Price */}
        <TabOneLine
          title='Preço:'
          subTitle={price ? price : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPrice}
        />
        {/* Due Date */}
        <TabOneLine
          title='Data Expiração:'
          subTitle={due_date ? due_date : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalDueDate}
        />
        {/* Policy Number */}
        <TabOneLine
          title='Numero Apólice:'
          subTitle={policy ? policy : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPolicy}
        />
        {/* Broker Name */}
        <TabOneLine
          title='Nome Corretora:'
          subTitle={broker_name ? broker_name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalBrokerName}
        />
        {/* Agent Name */}
        <TabOneLine
          title='Nome Agente:'
          subTitle={agent_name ? agent_name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalAgentName}
        />
        {/* Phone Number */}
        <TabOneLine
          title='Contato:'
          subTitle={phone_number ? phone_number : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalPhoneNumber}
        />
        {/* E-mail */}
        <TabOneLine
          title='E-mail:'
          subTitle={email ? email : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalEmail}
        />
        {/* Url */}
        <TabOneLine
          title='Site:'
          subTitle={url ? url : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
          onPress={handleModalUrl}
        />



        {/* Modal Name */}
        <Modal isVisible={isModalVisibleName} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholder={name ? name : 'Nome da Seguradora'}
                placeholderTextColor='#54Af89'
                keyboardType='default'
                textContentType='name'
                autoCapitalize='none'
                returnKeyType='next'
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={name ? name : 'Nome da Seguradora'}
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
              maxLength={11}
              options={{
                prefix: 'R$ ',
                decimalSeparator: '.',
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
        {/* Modal Date Due */}
        <Modal isVisible={isModalVisibleDueDate} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <MaskedTextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                mask="99/99/9999"
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
                onChangeText={(text, rawText) => setDue_date(text, rawText)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDueDate(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleDueDate(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Police Number */}
        <Modal isVisible={isModalVisiblePolicy} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='numeric'
                textContentType='none'
                autoCapitalize='none'
                returnKeyType='next'
                maxLength={20}
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={policy ? policy : 'Numero Apólice'}
                value={policy}
                onChangeText={text => setPolicy(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePolicy(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePolicy(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Broker Name */}
        <Modal isVisible={isModalVisibleBrokerName} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='default'
                textContentType='name'
                autoCapitalize='none'
                returnKeyType='next'
                maxLength={30}
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={broker_name ? broker_name : 'Nome da Corretora'}
                value={broker_name}
                onChangeText={text => setBroker_name(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleBrokerName(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleBrokerName(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Agent Name */}
        <Modal isVisible={isModalVisibleAgentName} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='default'
                textContentType='name'
                autoCapitalize='none'
                returnKeyType='next'
                maxLength={30}
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={agent_name ? agent_name : 'Nome Agente Corretor'}
                value={agent_name}
                onChangeText={text => setAgent_name(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleAgentName(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleAgentName(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Phone Number */}
        <Modal isVisible={isModalVisiblePhoneNumber} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <MaskedTextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                mask="+55(21)9-999-9999"
                type="number"
                keyboardType="numeric"
                maxLength={17}
                onChangeText={(text, rawText) => setPhone_number(text, rawText)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePhoneNumber(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePhoneNumber(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal E-mail */}
        <Modal isVisible={isModalVisibleEmail} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoCapitalize='none'
                returnKeyType='next'
                maxLength={100}
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={email ? email : 'E-mail Agente Corretor'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleEmail(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleEmail(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Url */}
        <Modal isVisible={isModalVisibleUrl} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: '#FFF', marginBottom: 5 }}>
              <TextInput
                style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
                placeholderTextColor='#54Af89'
                keyboardType='default'
                textContentType='URL'
                autoCapitalize='none'
                returnKeyType='next'
                maxLength={255}
                autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                placeholder={url ? url : 'Site da Seguradora'}
                value={url}
                onChangeText={text => setUrl(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleUrl(false)}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleUrl(false)}>
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
          onPress={() => handleSaveClick(name, price, due_date, policy, broker_name, agent_name, phone_number, email, url)}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddInsurance;

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