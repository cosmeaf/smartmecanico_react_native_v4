import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIcon from '../../../componentes/LoadingIcon';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';
import TabOneLine from '../../../componentes/TabOneLine';


const Vehicle = ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  if (!authentication) {
    signout();
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getVehicle();
    navigation.addListener('focus', () => {
      setVehicles([]);
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
      getVehicle();
    });
  }, [authentication, navigation])


  const getVehicle = async () => {
    setRefreshing(true);
    setVehicles([]);
    let res = await Api.getVehicle();
    console.log(res)
    if (res) {
      setVehicles(res)
    }
    setRefreshing(false);
  }

  const onRefresh = React.useCallback(() => {
    setVehicles([]);
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    getVehicle();
  }, [authentication]);

  if (vehicles.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 22 }}>Você não possui</Text>
          <Text style={{ fontSize: 22 }}>Itens Cadastrado</Text>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {
            vehicles.map((item, index) => (
              <TouchableOpacity key={index}
                style={styles.TouchableOpacityRender}
                onPress={() => navigation.navigate('VehicleDetails', item)}
              >
                <Image source={require('../../../assets/icons/car.png')} style={{ width: 30, height: 30 }} />
                <View>
                  <Text style={{ fontSize: 14 }}>Marca</Text>
                  <Text style={{ fontSize: 14 }}>{item.brand}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14 }}>Placa</Text>
                  <Text style={{ fontSize: 14 }}>{item.plate}</Text>
                </View>
                <Ionicons name='chevron-forward' size={30} />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    )
  }

}

export default Vehicle;

const styles = StyleSheet.create({
  container: { flex: 1 },
  TouchableOpacityRender: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    borderWidth: 0.1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingEnd: 20,
    paddingStart: 20,
    marginBottom: 10,
    borderRadius: 25,
    marginLeft: 14,
    marginRight: 14,
  },
  renderImage: { width: 35, height: 35, marginTop: 10, marginBottom: 10 },
})