import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';
import styles from './styles';

export default ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState('');
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  if (!authentication) {
    navigation.navigate('LoginScreen')
  }

  useEffect(() => {
    getProfile();
    getUser();
  }, [authentication])

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

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Você se recusou a permitir que este aplicativo acesse suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (result?.assets !== null) {
      setPickedImagePath(result.assets[0].uri);
      return
    }

  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Você se recusou a permitir que este aplicativo acesse suas Câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result?.assets !== null) {
      setPickedImagePath(result.assets[0].uri);
      return
    }

  }

  const handleUpdateImage = async () => {
    Alert.alert('Selecione',
      'Como deseja pegar a foto?', [
      {
        text: 'Galeria',
        onPress: () => showImagePicker(),
        style: 'default'
      },
      {
        text: 'Câmera',
        onPress: () => openCamera(),
        style: 'default'
      },
      {
        cancelable: true,
        onDisminn: () => Alert.alert('Tratar depois Android')
      }
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, marginLeft: 14, marginRight: 14, backgroundColor: '#FFF' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {
          pickedImagePath ? <Image
            source={{ uri: pickedImagePath }}
            resizeMode='cover'
            style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 50, borderWidth: 0.5, backgroundColor: '#DDD' }}
          />
            :
            <Image
              source={{ uri: profile.image }}
              resizeMode='cover'
              style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 50 }}
            />
        }

        <TouchableOpacity style={styles.addPhoto} onPress={() => handleUpdateImage()}>
          <MaterialIcons name="add-a-photo" size={30} color="#888" />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 20 }}> {user.first_name} {user.last_name} </Text>
      <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 20, color: '#CCC' }}> {user.email} </Text>
      <View style={{ marginStart: 10, marginEnd: 10 }}>
        {/* Acocunt Information */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 4,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('User')}
        >
          <Ionicons name='person-circle-outline' color='#252525' size={30} />
          <Text style={{ fontSize: 18 }}>  Conta</Text>
          <Ionicons name='chevron-forward' color='#252525' size={20} />
        </TouchableOpacity>
        {/* Address Informations */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 4,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('Address')}
        >
          <Ionicons name='business-outline' color='#252525' size={30} />
          <Text style={{ fontSize: 18 }}> Endereço</Text>
          <Ionicons name='chevron-forward' color='#252525' size={20} />
        </TouchableOpacity>
        {/* Vehicle Informations */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 4,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('Vehicle')}
        >
          <Ionicons name='car-sport-outline' color='#252525' size={30} />
          <Text style={{ fontSize: 18 }}> Veículos</Text>
          <Ionicons name='chevron-forward' color='#252525' size={20} />
        </TouchableOpacity>
        {/* System Config */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 4,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name='settings-outline' color='#252525' size={30} />
          <Text style={{ fontSize: 18 }}> Ajustes </Text>
          <Ionicons name='chevron-forward' color='#252525' size={20} />
        </TouchableOpacity>
        {/* System Config */}
        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 4,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('TabOneScreen')}
        >
          <Ionicons name='cog' color='#252525' size={30} />
          <Text style={{ fontSize: 18 }}> Componentes </Text>
          <Ionicons name='chevron-forward' color='#252525' size={20} />
        </TouchableOpacity> */}
      </View>
      {/* SIGN-OUT OF SYSTEM */}
      <View style={{ marginStart: 10, marginEnd: 10, marginTop: 80 }}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: '#FFF',
          alignItems: 'center',
          padding: 8,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 1,
        }}
          onPress={() => signout()}
        >
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}