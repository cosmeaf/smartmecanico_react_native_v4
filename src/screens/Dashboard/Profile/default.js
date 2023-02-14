import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, Text, View, Image, Dimensions, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissinos from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';


const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const imageUrl = 'https://smartmecanico.duckdns.org/media/default.png'


export default ({ navigation, route }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [avatar, setAvatar] = useState({});
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!authentication) {
    navigation.navigate('SignIn');
    signout();
    return
  }

  useEffect(() => {
    setIsLoading(true)
    getProfile();
    getUser();
    setTimeout(() => setIsLoading(false), 1000)
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

    if (result.assets[0].width > 3088 || result.assets[0].height > 3088) {
      Alert.alert('Atenção', 'Imagem não pode ter resolução superior 3088 x 3088')
      return
    }

    if (result.canceled) {
      Alert.alert("Você se recusou a permitir que este aplicativo acesse suas fotos!");
      return;
    }

    if (result?.assets !== null) {
      setAvatar(result.assets[0]);
      updateProfile();
    }
    return result.assets[0].canceled

  }

  const updateProfile = async () => {
    const formData = new FormData()
    formData.append('image', {
      uri: avatar.uri,
      type: avatar.type,
      name: avatar.fileName,
    })
    const response = await Api.updateImageProfile(profile.id, formData);
    if (!response.image) {
      Alert.alert('Ops', 'Formato de imagem inválido')
      return
    }

    if (response.image.split('/').pop() !== profile.image.split('/').pop()) {
      Alert.alert('Succeso', 'Imagem atualizada com sucesso')
      return
    }
    Alert.alert('Ops', 'Algo deu errado para atualizar imagem')
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
      setAvatar(result.assets[0].uri);
      return
    }

  }

  const handleUpdateImage = async () => {
    Alert.alert('Smart Mecânico" Deseja Ter Acesso às Suas Fotos',
      `Allow access to your camera roll to \nupload photos and videos. You can use these in profile image, on your profile, and mode`, [
      {
        text: 'Galeria',
        onPress: () => showImagePicker(),
        style: 'default'
      },
      {
        text: 'Cancelar',
        onPress: () => Alert.alert("Antenção", "Você se recusou a permitir que este aplicativo acesse suas fotos!"),
        style: 'default'
      },
      {
        cancelable: true,
        onDisminn: () => Alert.alert('Tratar depois Android')
      }
    ])
  }




  return isLoading ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='green' />
    </View>
    : (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* IMAGE */}
          <View style={styles.contentAvatar}>
            <TouchableOpacity onPress={() => handleUpdateImage()}>
              {avatar
                ?
                <Image style={styles.avatar} source={{ uri: avatar.uri ? avatar.uri : profile.image }} resizeMode={'cover'} />
                :
                <Image style={styles.avatar} source={{ uri: profile.image ? profile.image : imageUrl }} resizeMode={'cover'} />
              }

              <MaterialIcons name="add-a-photo" size={orientation.width > 500 ? 50 : 30} color="#DFDFDF" style={styles.addPhoto} />
            </TouchableOpacity>
            <Text style={styles.contentTitle}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.contetEmail}>{user.email}</Text>
          </View>
          {/* OPTIONS */}
          <View style={styles.profileData}>
            {/* Acocunt Information */}
            <TouchableOpacity style={styles.tabLine}
              onPress={() => navigation.navigate('User')}
            >
              <Ionicons name='person-circle-outline' color='#252525' size={30} />
              <Text style={styles.tabLineTitle}>Conta</Text>
              <Ionicons name='chevron-forward' color='#252525' size={20} />
            </TouchableOpacity>
            {/* Address Informations */}
            <TouchableOpacity style={styles.tabLine}
              onPress={() => navigation.navigate('Address')}
            >
              <Ionicons name="location-outline" color="#252525" size={30} />
              <Text style={styles.tabLineTitle}>Endereço</Text>
              <Ionicons name='chevron-forward' color='#252525' size={20} />
            </TouchableOpacity>
            {/* Vehicle Informations */}
            <TouchableOpacity
              style={styles.tabLine}
              onPress={() => navigation.navigate('Vehicle')}
            >
              <Ionicons name='car-sport-outline' color='#252525' size={30} />
              <Text style={styles.tabLineTitle}> Veículos</Text>
              <Ionicons name='chevron-forward' color='#252525' size={20} />
            </TouchableOpacity>
            {/* System Config */}
            <TouchableOpacity style={styles.tabLine} onPress={() => navigation.navigate('Settings')}>
              <Ionicons name='settings-outline' color='#252525' size={30} />
              <Text style={styles.tabLineTitle}> Ajustes </Text>
              <Ionicons name='chevron-forward' color='#252525' size={20} />
            </TouchableOpacity>
          </View>
          {/* SIGN-OUT OF SYSTEM */}
          <View style={styles.contentButtom}>
            <TouchableOpacity style={styles.buttonSignout} onPress={() => signout()}>
              <Text style={styles.buttonSignoutText}>Sair</Text>
              <Ionicons name="ios-log-out-outline" size={orientation.width > 500 ? 40 : 24} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollView: { marginHorizontal: orientation.width > 500 ? 200 : null },
  contentAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
    marginBottom: 30,
    marginHorizontal: orientation.width > 500 ? 20 : 20,
  },
  avatar: {
    width: orientation.width > 500 ? 200 : 100, height: orientation.width > 500 ? 200 : 100,
    borderRadius: orientation.width > 500 ? 100 : 50,
    borderWidth: 1, borderColor: '#AAA', marginBottom: 10,
    overflow: 'hidden',
  },
  contentTitle: { fontSize: 16, color: '#AAA' },
  contetEmail: { fontSize: 16, color: '#AAA', marginBottom: 10 },
  profileData: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  addPhoto: {
    position: 'absolute',
    paddingLeft: orientation.width > 500 ? 175 : 85,
    paddingTop: orientation.width > 500 ? 175 : 75
  },
  tabLine: {
    flexDirection: 'row', justifyContent: 'space-between',
    width: '100%', backgroundColor: '#F1F1F1',
    height: orientation.width > 500 ? 70 : null,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 4,
    marginBottom: 10,
    borderRadius: 10
  },
  tabLineTitle: { fontSize: orientation.width > 500 ? 22 : 18 },
  contentButtom: { marginHorizontal: 20, marginTop: 80 },
  buttonSignout: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF',
    padding: 8, marginBottom: 10, borderRadius: 10, borderWidth: 1,
  },
  buttonSignoutText: { fontSize: orientation.width > 500 ? 22 : 18, fontWeight: '500', marginRight: 10 }
})