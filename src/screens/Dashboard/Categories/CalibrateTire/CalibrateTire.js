import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import GlobalContext from '../../../../Contexts/Context';
import Api from '../../../../service/Api';


const CalibrateTire = ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [calibrateTire, setCalibrateTire] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getCalibrateTire();
    navigation.addListener('focus', () => {
      setCalibrateTire([]);
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
      getCalibrateTire();
    });
  }, [authentication, navigation])

  if (!authentication) {
    signout();
  }

  const getCalibrateTire = async () => {
    setRefreshing(true);
    setCalibrateTire([]);
    let res = await Api.getCalibrateTire();
    if (res) {
      setCalibrateTire(res)
    }
    setRefreshing(false);
  }

  const onRefresh = React.useCallback(() => {
    setCalibrateTire([]);
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    getCalibrateTire();
  }, []);

  if (calibrateTire.length === 0) {
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
          {calibrateTire.map((item, index) => (
            <TouchableOpacity key={index}
              style={styles.TouchableOpacityRender}
              onPress={() => navigation.navigate('CalibrateTireDetails', item)}
            >
              <Image source={require('../../../../assets/icons/pneu.png')} style={{ width: 30, height: 30 }} />
              <View>
                <Text style={{ fontSize: 14 }}> Data </Text>
                <Text style={{ fontSize: 14 }}>{item.date.split('-').reverse().join('/')}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}> Libras</Text>
                <Text style={{ fontSize: 14 }}>{item.libra}</Text>
              </View>
              <Ionicons name='chevron-forward' size={30} />
            </TouchableOpacity>

          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }



}

export default CalibrateTire;

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