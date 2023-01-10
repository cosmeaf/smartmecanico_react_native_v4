import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ScreenHeader = ({ mainTitle, secondTitle }) => {
  return (
    <View style={styles.constainer}>
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.secondTitle}>{secondTitle}</Text>
    </View>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({
  constainer: { paddingHorizontal: 14, paddingVertical: 14 },
  mainTitle: { fontSize: 24, fontWeight: 'bold' },
  secondTitle: { fontSize: 20 }
})