import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import GlobalContext from '../../../Contexts/Context';
import MainHeader from '../../../componentes/MainHeader';
import ScreenHeader from '../../../componentes/ScreenHeader';
import TopServicesCarousel from '../../../componentes/TopServicesCarousel';
import OtherCategory from '../../../componentes/OtherCategory';
import slideData from '../../../model/data/slide'
import otherCategoryData from '../../../model/data/categoryData';
import Api from '../../../service/Api';

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

export default ({ navigation, route }) => {
  const { authentication, signout } = useContext(GlobalContext);

  useEffect(() => {

  }, [authentication])

  if (!authentication) {
    signout();
  }

  function handleClick(data) {
    navigation.navigate(data)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar style="auto" />
      <MainHeader title="Smart Mecânico" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader mainTitle="Principais" secondTitle="Serviços" />
        <TopServicesCarousel list={slideData} onPress={handleClick} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 14, marginTop: 20 }}>
          <Text style={{ fontSize: orientation.width > 500 ? 36 : 18, fontWeight: 'bold', marginBottom: 10 }}>Agenda Carro</Text>
        </View>
        <OtherCategory list={otherCategoryData} onPress={handleClick} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})