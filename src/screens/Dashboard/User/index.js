import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from 'react-native-masked-text';
import { MaskedTextInput } from 'react-native-mask-text';
import Modal from "react-native-modal";
import Moment, { utc } from 'moment';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalContext from '../../../Contexts/Context';
import TabOneLine from '../../../componentes/TabOneLine';
import Api from '../../../service/Api';


export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { authentication, isLoading, signout } = useContext(GlobalContext);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isModalVisibleFirstName, setIsModalVisibleFirstName] = useState(false);
  const [isModalVisibleLastName, setIsModalVisibleLastName] = useState(false);

  const [isModalVisiblePhone, setIsModalVisiblePhone] = useState(false);
  const [isModalVisibleBrithday, setIsModalVisibleBirthday] = useState(false);

  const handleModalFirstName = () => setIsModalVisibleFirstName(() => !isModalVisibleFirstName);
  const handleModalLastName = () => setIsModalVisibleLastName(() => !isModalVisibleLastName);
  const handleModalPhone = () => setIsModalVisiblePhone(() => !isModalVisiblePhone);
  const handleModalBrithday = () => setIsModalVisibleBirthday(() => !isModalVisibleBrithday);

  if (!authentication) {
    signout();
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getProfile()
    getUser()
  }, [authentication, navigation]);

  const getProfile = async () => {
    setProfile('')
    let res = await Api.getProfile();

    if (res.code !== 200) {
      try {
        Alert.alert('Atenção', `${res.message.detail ? res.message.detail : ''}\n Faça login novamente`, [
          {
            text: "Continnuar",
            onPress: () => {
              signout()
            }
          },
        ])
        signout();
      } catch (error) {

      }
    }
    res.map((item) => {
      setProfile(item)
    });
  }

  const getUser = async () => {
    setUser('')
    let res = await Api.getUser();
    if (res.code !== 200) {
      try {
        Alert.alert('Atenção', `${res.message.detail ? res.message.detail : ''}\n Faça login novamente`, [
          {
            text: "Continnuar",
            onPress: () => {
              signout()
            }
          },
        ])
        signout();
      } catch (error) {

      }
    }
    res.map((item) => {
      setUser(item)
    });

  }

  // Validation by First Name
  const firstNmaeValidation = async (id, firstName,) => {
    setRefreshing(true);
    if (firstName.length === 0 && user.first_name.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Nome')
      setRefreshing(false);
    } else if (firstName.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Nome')
      setRefreshing(false);
    } else {
      setRefreshing(true);
      let json = await Api.updateUser(id, firstName, lastName);
      Alert.alert('Updade Successfuly', 'Atualização realizada com sucesso')
      getUser();
      setRefreshing(false);
      if (json.code) {
        Alert.alert(`Atenção`, `${json.message.detail}, Código: ${json.code}`)
      }
    }
    setRefreshing(false);
  }
  // Validation by Last Name
  const lastNmaeValidation = async (id, lastName) => {
    setRefreshing(true);
    if (lastName.length === 0 && user.last_name.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Sobrenome')
      setRefreshing(false);
    } else if (lastName.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Sobrenome')
      setRefreshing(false);
    } else {
      setRefreshing(true);
      let json = await Api.updateUser(id, user.first_name, lastName);
      Alert.alert('Updade Successfuly', 'Atualização realizada com sucesso')
      getUser();
      setRefreshing(false);
      if (json.code) {
        Alert.alert(`Atenção`, `${json.message.detail}, Código: ${json.code}`)
      }
    }
    setRefreshing(false);
  }

  // Validation BirthDay
  const birthdayValidation = async (id, birthday) => {
    setRefreshing(true);
    if (birthday.length === 0 && profile.birthday === null) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Aniversário')
      setRefreshing(false);
    } else if (birthday.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Aniversário')
      setRefreshing(false);
    } else if (birthday.length <= 8) {
      Alert.alert('Atenção', 'Campo data deve ser no formato: \nDIA/MÊS/ANO ou 01/01/1921')
    } else {
      const date = birthday.split('/').reverse().join('-')
      setRefreshing(true);
      let json = await Api.updateProfile(id, date);
      Alert.alert('Updade Successfuly', 'Atualização realizada com sucesso')
      getProfile();
      setRefreshing(false);
      if (json.code) {
        Alert.alert(`Atenção`, `${json.message.detail}, Código: ${json.code}`)
      }
    }
    setRefreshing(false);
  }
  // Validation Phone number
  const phoneNumberValidation = async (id, phoneNumber) => {
    setRefreshing(true);
    if (phoneNumber.length === 0 && profile.phone_number === null) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Contato')
      setRefreshing(false);
    } else if (phoneNumber.length === 0) {
      Alert.alert('Atenção', 'Por Favor Preencher campo Contato')
      setRefreshing(false);
    } else {
      setRefreshing(true);
      let phone_number = phoneNumber.replace(/\D/g, '');
      let json = await Api.updateProfile(id, profile.birthday, phone_number);
      Alert.alert('Updade Successfuly', 'Atualização realizada com sucesso')
      getProfile();
      setRefreshing(false);
      if (json.code) {
        Alert.alert(`Atenção`, `${json.message.detail}, Código: ${json.code}`)
      }
    }
    setRefreshing(false);
  }

  // Exclude User Profile
  const deleteUser = async (id) => {
    if (id.length !== 0) {
      Alert.alert('EXCLUIR CONTA', 'Tem certeza que deseja excluir usuário do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setRefreshing(true);
            await Api.deleteUser(id);
            setRefreshing(false);
            signout();
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Ops! Usuário não encontrato');
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getUser();
    getProfile();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* System Information */}
        <View>
          <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 14, fontWeight: '500' }}>Sistema</Text>
          {/* Username */}
          <TabOneLine title='Username:' subTitle={user.username ? user.username : ''} />
          {/* E-mail */}
          <TabOneLine title='E-mail:' subTitle={user.email ? user.email : ''} />
          {/* First Name */}
          <TabOneLine title='Nome:'
            subTitle={user.first_name ? user.first_name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={() => handleModalFirstName()} />
          {/* Last Name */}
          <TabOneLine title='Sobrenome:'
            subTitle={user.last_name ? user.last_name : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={() => handleModalLastName()} />
        </View>

        {/* Profile Information */}
        <View style={{ marginTop: 30 }} >
          <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 14, fontWeight: '500' }}>Perfil</Text>
          {/* Birthday */}
          <TabOneLine title='Aniversário:'
            subTitle={profile.birthday ? profile.birthday.split('-').reverse().join('/') : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
            onPress={() => handleModalBrithday()}
          />
          {/* Mobile number */}
          <TabOneLine title='Contato:'
            subTitle={profile.phone_number ? profile.phone_number : <Ionicons name="ios-add-circle-outline" size={24} color="black" />}
            onPress={() => handleModalPhone()} />
        </View>

      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => deleteUser(user.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
      {/* MODAL PART BITHDAY */}
      <Modal isVisible={isModalVisibleBrithday} style={styles.modal}>
        <View style={styles.modalContainer}>
          <MaskedTextInput
            style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, marginBottom: 20 }}
            mask="99/99/9999"
            placeholder={birthday ? birthday : 'Formato da Data 01/01/2023'}
            placeholderTextColor='#54Af89'
            keyboardType="numeric"
            onChangeText={(text, rawText) => setBirthday(text)}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPressOut={() => setIsModalVisibleBirthday()}
              onPress={() => birthdayValidation(profile.id, birthday)}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalBrithday}>
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL PART PHONE NNUMBER */}
      <Modal isVisible={isModalVisiblePhone} style={styles.modal}>
        <View style={styles.modalContainer}>
          <MaskedTextInput
            style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, marginBottom: 20 }}
            mask="+99-99-99999-9999"
            placeholder={phoneNumber ? phoneNumber : '+55-31-98123-6745'}
            placeholderTextColor='#54Af89'
            onChangeText={(text, rawText) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPressOut={() => setIsModalVisiblePhone()}
              onPress={() => phoneNumberValidation(profile.id, phoneNumber)}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalPhone}>
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL PART FIRST_NAME */}
      <Modal isVisible={isModalVisibleFirstName} style={styles.modal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, marginBottom: 20 }}
            placeholder={user.first_name ? user.first_name : 'Digite seu Primeiro Nome'}
            placeholderTextColor='#54Af89'
            onChangeText={text => setFirstName(text)}
            value={firstName}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPressOut={() => setIsModalVisibleFirstName()}
              onPress={() => firstNmaeValidation(user.id, firstName)}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalFirstName}>
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL PART LAST_NAME */}
      <Modal isVisible={isModalVisibleLastName} style={styles.modal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, marginBottom: 20 }}
            placeholder={user.last_name ? user.last_name : 'Digite seu Sobrenome'}
            onChangeText={text => setLastName(text)}
            value={lastName}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPressOut={() => setIsModalVisibleLastName(false)}
              onPress={() => lastNmaeValidation(user.id, lastName)}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalLastName}>
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2', borderRadius: 10 },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10 },
  modalButtonText: { fontSize: 18, color: '#FFF' }
});