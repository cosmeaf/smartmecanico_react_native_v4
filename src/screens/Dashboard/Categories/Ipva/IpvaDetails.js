import React, { useState, useCallback, useContext, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../../componentes/TabOneLine';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import GlobalContext from '../../../../Contexts/Context';
import Api from '../../../../service/Api';


const IpvaDetails = ({ navigation, route }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [refreshing, setRefreshing] = useState(false);


  if (!authentication) {
    signout();
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      setRefreshing(true);
      wait(800).then(() => setRefreshing(false));
    });
  }, [authentication, navigation])

  const deleteIpva = (id) => {
    if (id) {
      Alert.alert('Excluir IPVA', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setRefreshing(true);
            await Api.deleteIpva(id);
            navigation.navigate('Ipva');
            setRefreshing(false);
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há IPVA registrado para ser excluido!');
    }
    setRefreshing(false);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações de IPVA</Text>
        {/* Brand */}
        <TabOneLine title='Data:' subTitle={route.params.date.split('-').reverse().join('/')} />
        {/* Model */}
        <TabOneLine title='Preço:' subTitle={`R$ ${route.params.price}`} />

      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteIpva(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default IpvaDetails;