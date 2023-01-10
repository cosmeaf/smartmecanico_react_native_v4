import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import FavoriteButton from './FavoriteButton';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const CARD_WIDTH = windowWidth - 80
const CARD_HEIGHT = 150
const CARD_WIDTH_SPACING = CARD_WIDTH + 14

const TopServicesCarousel = ({ list, data, onPress = null }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const handleFavorited = () => setIsFavorited(() => !isFavorited);

  return (
    <FlatList
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id.toString()}
      data={list}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{ marginLeft: 14, marginRight: index === list.length - 1 ? 14 : 0 }} activeOpacity={0.8}
            onPress={() => onPress(item.subtitle)}
            key={index}
          >
            <View style={styles.card}>
              <FavoriteButton style={styles.favorited} />
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default TopServicesCarousel

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH, height: CARD_HEIGHT, marginVertical: 10,
    shadowColor: '#202020', shadowOffset: { width: 0, height: 0 }, shadowRadius: 5, elevation: 5
  },
  imageBox: { maxWidth: CARD_WIDTH, maxHeight: CARD_HEIGHT, overflow: 'hidden', borderRadius: 20 },
  image: { maxWidth: CARD_WIDTH, maxHeight: CARD_HEIGHT, resizeMode: 'cover', backgroundColor: ' rgba(0,0,0,0.9)', opacity: 0.9 },
  titleBox: { position: 'absolute', height: 40, width: '100%', bottom: 0, backgroundColor: ' rgba(0,0,0,0.4)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { textAlign: 'center', marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 16, color: '#FFF' },
  favorited: { position: 'absolute', top: 14, right: 14, zIndex: 1 }
})