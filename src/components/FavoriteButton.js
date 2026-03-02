import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const FavoriteButton = ({ isFavorited, style, onPress }) => {

  return (
    <View style={[{ backgroundColor: '#FFF', padding: 5, borderRadius: 25 }, style]}>
      <TouchableOpacity onPress={onPress}>
        {isFavorited
          ? <Ionicons name="ios-heart-dislike-outline" size={24} color="red" />
          : <Ionicons name="ios-heart-outline" size={24} color="red" />
        }
      </TouchableOpacity>
    </View>
  )
}

export default FavoriteButton

const styles = StyleSheet.create({})