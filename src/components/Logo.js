import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/image/logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 80,
    marginBottom: 8,
  },
})
