import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

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
  mainTitle: { fontSize: orientation.width > 500 ? 44 : 24, fontWeight: 'bold' },
  secondTitle: { fontSize: orientation.width > 500 ? 30 : 20 }
})