import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../../Contexts/Context';
import SearcheArea from '../../../componentes/SearcheArea';
import ServicesTypes from '../../../componentes/ServicesTypes';
import CategoryTypes from '../../../componentes/CategoryTypes';


export default ({ navigation, route }) => {
  const { authentication, signout } = useContext(GlobalContext);

  if (!authentication) {
    signout();
  }

  function handleClick(data) {
    navigation.navigate(data)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar style="auto" />
      <ScrollView>
        <SearcheArea />
        <Text style={{ marginTop: 20, marginLeft: 14, fontSize: 22, fontWeight: 'bold' }}>Serviços</Text>
        <ServicesTypes onPress={handleClick} />
        <Text style={{ marginTop: 20, marginLeft: 14, fontSize: 22, fontWeight: 'bold' }}>Categoria</Text>
        <CategoryTypes onPress={handleClick} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})