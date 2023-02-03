import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const AppointmentOptions = ({ props }) => {

  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
      <Image
        style={styles.image}
        source={require('../assets/image/slide/002_image.jpg')} resizeMode="cover" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Serviço de Freio</Text>
        <Ionicons name="ios-heart-outline" size={24} color="red" />
      </View>
    </TouchableOpacity>
  )
}

export default AppointmentOptions

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    width: orientation.width > 500 ? orientation.width / 2 : deviceWidth - 20,
    backgroundColor: '#FFFFFD',
    height: orientation.height / 3.5,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,

    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9
  },
  image: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '70%',
    opacity: 0.8
  }
})