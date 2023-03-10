import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';

export default ({ navigation }) => {
  const { authentication, isLoading, signout } = useContext(GlobalContext);
  const [refreshing, setRefreshing] = useState(true);
  const [schedules, setSchedule] = useState([]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getSchedule();
    navigation.addListener('focus', () => {
      setSchedule([]);
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
      getSchedule();
    });
  }, [authentication, navigation])

  if (!authentication) {
    signout();
  }

  const getSchedule = async () => {
    let res = await Api.getSchedule();
    if (res) {
      setRefreshing(false)
      setSchedule(res)
    } else {
      Alert.alert('Atenção', `Estamos com problema para carregar as informações do sistema \nCódigo: ${res.status}`)
    }
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const onRefresh = React.useCallback(() => {
    setSchedule([]);
    setRefreshing(true);
    wait(800).then(() => setRefreshing(false));
    getSchedule();
  }, []);


  function getScheduleItem({ item: schedule }) {
    return (
      <TouchableOpacity style={styles.TouchableOpacityRender} onPress={() => navigation.navigate('ScheduleDetails', schedule)}>
        <Image source={require('../../../assets/icons/schedule.png')} style={{ width: 40, height: 40 }} />
        <View>
          <Text style={{ fontSize: 14, }}>{schedule.service.split('+').shift()}</Text>
          <Text style={{ fontSize: 14, }}>{schedule.vehicle}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>{schedule.day.split('-').reverse().join('/')}</Text>
          <Text style={{ fontSize: 14 }}>{schedule.hour}</Text>
        </View>
        <Ionicons name='chevron-forward' size={30} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {schedules.length !== 0 ?
        <FlatList
          keyExtractor={(schedule) => schedule.id}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={getScheduleItem}
          data={schedules}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        :
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Você não tem</Text>
            <Text style={{ fontSize: 18 }}>agendamentos no momento</Text>
          </View>
        </ScrollView>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  TouchableOpacityRender: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginBottom: 5,
    marginLeft: 14,
    marginRight: 14,
    paddingLeft: 10,
    borderRadius: 10,
  },

  renderImage: { width: 35, height: 35, marginTop: 10, marginBottom: 10 }
})