import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const MainHeader = ({ title, menu, notification }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { }}>
        <Ionicons name="ios-menu-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => { }}>
        <Ionicons name="ios-notifications-outline" size={24} color="black" />
      </TouchableOpacity>
      {/* <Ionicons name="ios-notifications-off-outline" size={24} color="black" /> */}
    </View>
  )
}

export default MainHeader

const styles = StyleSheet.create({
  container: { marginTop: 30, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14 },
  title: { fontSize: 18, fontWeight: 'bold' }
})