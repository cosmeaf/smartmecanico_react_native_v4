import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import FavoriteButton from './FavoriteButton';


const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const OtherCategory = ({ data, list, onPress }) => {

  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.carContainer}
            onPress={() => onPress(item.subtitle)}
            key={index}
          >
            <View style={styles.card} >
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.contentFooter}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default OtherCategory

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: orientation.width > 400 ? 20 : 10 },
  carContainer: {
    paddingHorizontal: orientation.width > 400 ? 20 : 10,
    marginBottom: orientation.width > 400 ? 30 : 10,
  },
  card: {
    width: orientation.width > 400 ? orientation.width / 2 - 40 : orientation.width / 2 - 20,
    height: orientation.height / 5,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(250,250,250, 0.8)',
    borderWidth: 1,
  },
  imageBox: {},
  image: { width: orientation.width > 400 ? 100 : 60, height: orientation.width > 400 ? 100 : 60, resizeMode: 'cover', marginBottom: 30 },
  contentFooter: { position: 'absolute', bottom: 0, left: 0, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#FFF', width: '100%' },
  titleBox: { justifyContent: 'center', alignItems: 'center', height: 40, borderWidth: 1, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'grey' },
  title: { textAlign: 'center', fontSize: orientation.width > 400 ? 28 : 14, fontWeight: 'bold' },
  favorited: { marginRight: 5, zIndex: 1 }
})