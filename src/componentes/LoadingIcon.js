import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingIcon = ({size, color}) => {
  return (
    <View>
        <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default LoadingIcon

const styles = StyleSheet.create({

})