import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import GlobalContext from '../../../../Contexts/Context';
import Api from '../../../../service/Api';


const FineTraffic = ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [fineTraffic, setFineTraffic] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  if (!authentication) {
    signout();
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getFineTraffic();
  }, [authentication])

  const getFineTraffic = async () => {
    setIsLoading(true);
    setFineTraffic([]);
    let res = await Api.getFineTraffic();
    if (res) {
      setFineTraffic(res)
    } else {
      signout();
    }
    setIsLoading(false);
  }

  const onRefresh = React.useCallback(() => {
    setFineTraffic([]);
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    getFineTraffic();
  }, []);

  if (fineTraffic.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading &&
          <LoadingIcon size='large' color="#54Af89" />
        }
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
          {fineTraffic.length === 0 && isLoading &&
            <LoadingIcon size='large' color="#54Af89" />
          }
          {fineTraffic.map((item, index) => (

            <TouchableOpacity key={index}
              style={styles.TouchableOpacityRender}
              onPress={() => navigation.navigate('FineTrafficDetails', item)}
            >
              <Image source={require('../../../../assets/icons/document.png')} style={{ width: 30, height: 30 }} />
              <View>
                <Text style={{ fontSize: 14 }}>{item.date ? item.date.split('-').reverse().join('/') : ''}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>R${item.price ? item.price : ''}</Text>
              </View>
              <Ionicons name='chevron-forward' size={30} />
            </TouchableOpacity>

          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }



}

export default FineTraffic;

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