import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import Modal from "react-native-modal";
import TabOneLine from '../../../componentes/TabOneLine';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';

export default ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [address, setAddress] = useState({});
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [isModalVisibleCep, setIsModalVisibleCep] = useState(false)
  const [isModalVisibleComplemento, setIsModalVisibleComplemento] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const handleModalCep = () => setIsModalVisibleCep(() => !isModalVisibleCep);
  const handleModalComplemento = () => setIsModalVisibleComplemento(() => !isModalVisibleComplemento);

  useEffect(() => {
    getAddress();
    navigation.addListener('focus', () => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
      getAddress();
    });
  }, [authentication, navigation])

  if (!authentication) {
    signout();
  }

  const viaCepApi = async (cep) => {
    let res = await Api.getCep(cep);
    if (res.erro === true) {
      Alert.alert('CEP ERROR.', 'O cep digitado não é válido')
    } else {
      setAddress(res);
      setIsModalVisibleCep(false);
    }
  }

  const getAddress = async () => {
    setRefreshing(true);
    let res = await Api.getAddress();
    if (res) {
      res.map((item, index) => {
        setAddress(item)
      })
    }
    setRefreshing(false);
  }

  const saveAddress = async (cep, logradouro, complemento, bairro, localidade, uf) => {
    if (cep.length === 0) {
      Alert.alert('Campo Cep não pode ser vázio')
    } else if (logradouro.length === 0) {
      Alert.alert('Campo Logradouro não pode ser vázio')
    } else if (bairro.length === 0) {
      Alert.alert('Campo Bairro não pode ser vázio')
    } else if (localidade.length === 0) {
      Alert.alert('Campo Cidade não pode ser vázio')
    } else if (uf.length === 0) {
      Alert.alert('Campo Estado não pode ser vázio')
    } else if (complemento.length === 0) {
      Alert.alert('Informe Algum Complemento')
    } else {
      setRefreshing(true);
      setIsModalVisibleComplemento(false);
      setIsModalVisibleCep(false);
      await Api.createAddress(cep, logradouro, complemento, bairro, localidade, uf);
      getAddress();
      setRefreshing(false);
    }
  }

  const deleteAddress = async (id) => {
    if (id) {
      Alert.alert('Excluir Endereço', 'Tem certeza que deseja excluir Endereço do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setRefreshing(true);
            await Api.deleteAddress(id);
            getAddress();
            navigation.navigate('Profile');
            setRefreshing(false);
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há endereço registrado para ser excluido!');
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    getAddress();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Address Data */}
        <View>
          <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 14, fontWeight: '500' }}>Informações de Endereço</Text>
          {/* CEP */}
          <TabOneLine title='Cep:'
            subTitle={address.cep ? address.cep : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={() => handleModalCep(cep)} />
          <TabOneLine title='Logradouro:'
            subTitle={address.logradouro ? address.logradouro : ''} />
          <TabOneLine
            title='Complemento:'
            subTitle={address.complemento ? address.complemento : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
            onPress={() => handleModalComplemento(cep, logradouro, complemento, bairro, localidade, uf)}
          />
          <TabOneLine title='Bairro:'
            subTitle={address.bairro ? address.bairro : ''} />
          <TabOneLine title='Cidade:'
            subTitle={address.localidade ? address.localidade : ''} />
          <TabOneLine title='Estado:'
            subTitle={address.uf ? address.uf : ''} />
        </View>
        {/* MODAL SET CEP DATA  */}
        <Modal isVisible={isModalVisibleCep} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              placeholder={cep ? cep : 'Digite seu CEP 99999-999'}
              placeholderTextColor='#54Af89'
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10 }}
              mask="99999-999"
              keyboardType="numeric"
              onChangeText={(text, rawText) => setCep(text, rawText)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPressOut={() => setIsModalVisibleCep(false)}
                onPress={() => viaCepApi(cep)}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleCep(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* MODAL SET COMPLEMENTO DATA*/}
        <Modal isVisible={isModalVisibleComplemento} style={styles.modal}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modaTextInput}
              placeholder={complemento ? complemento : 'Digite Complemento'}
              placeholderTextColor='#54Af89'
              onChangeText={text => setComplemento(text)}
              value={complemento}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPressOut={() => setIsModalVisibleComplemento(false)}
                onPress={() => saveAddress(address.cep, address.logradouro, complemento, address.bairro, address.localidade, address.uf)}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleComplemento(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.excludeButton}>
        <TouchableOpacity
          onPress={() => deleteAddress(address.id)}
        >
          <Text style={styles.excludeButtonText}>Excluir Endereço</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2', borderRadius: 10 },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10, marginTop: 20 },
  modalButtonText: { fontSize: 18, color: '#FFF' },
  excludeButton: { justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  excludeButtonText: { fontSize: 18, fontWeight: '500', color: 'red' },
})