import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../../Contexts/Context';
import MainHeader from '../../../componentes/MainHeader';
import ScreenHeader from '../../../componentes/ScreenHeader';
import TopServicesCarousel from '../../../componentes/TopServicesCarousel';
import OtherCategory from '../../../componentes/OtherCategory';
import slideData from '../../../model/data/slide'
import otherCategoryData from '../../../model/data/categoryData';
import Api from '../../../service/Api';


export default ({ navigation, route }) => {
  const { authentication, signout } = useContext(GlobalContext);

  if (!authentication) {

  }

  useEffect(() => {

  }, [authentication])

  const getProfile = async () => {
    let res = await Api.getProfile();
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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Outros Recursos</Text>
        </View>
        <OtherCategory list={otherCategoryData} onPress={handleClick} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})