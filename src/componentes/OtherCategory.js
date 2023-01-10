import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import FavoriteButton from './FavoriteButton';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const CARD_WIDTH = windowWidth / 2 - 28;
const CARD_HEIGHT = 150;

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
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  carContainer: {
    paddingRight: 14,
    paddingLeft: 14,
    padding: 14,
    elevation: 5,
    opacity: 0.9,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(230,230,235,0.6)',
    opacity: 0.9,
  },
  imageBox: {},
  image: { width: 50, height: 50, resizeMode: 'cover' },
  contentFooter: { position: 'absolute', bottom: 0, left: 0, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#FFF', width: '100%' },
  titleBox: { justifyContent: 'center', alignItems: 'center', height: 40, borderWidth: 0.3, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'grey' },
  title: { textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
  favorited: { marginRight: 5, zIndex: 1 }
})