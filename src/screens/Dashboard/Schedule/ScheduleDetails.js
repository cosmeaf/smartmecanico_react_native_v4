import React, { useState, useCallback, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../componentes/TabOneLine';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';


const ScheduleDetails = ({ navigation, route }) => {
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

  const deleteSchdule = (id) => {
    if (id) {
      Alert.alert('Excluir Agendamento', 'Tem certeza que deseja excluir?', [
        {
          text: "Sim",
          onPress: () => {
            setRefreshing(true);
            Api.deleteSchedule(id);
            navigation.navigate('Schedule');
            setRefreshing(false);
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há registro de agendamento');
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    setRefreshing(false);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Detalhes:</Text>
        {/* Brand */}
        <TabOneLine title='Serviço:' subTitle={route.params.service} />
        <TabOneLine title='Veículo:' subTitle={route.params.vehicle} />
        <TabOneLine title='Data:' subTitle={route.params.day.split('-').reverse().join('/')} />
        <TabOneLine title='Hora:' subTitle={route.params.hour} />
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteSchdule(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir Agendamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ScheduleDetails

const styles = StyleSheet.create({})