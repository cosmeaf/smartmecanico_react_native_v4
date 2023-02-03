import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const orientation = Dimensions.get('screen')
const deviceWidth = Math.round(Dimensions.get('window').width);

const TopServicesCarousel = ({ list, data, onPress = null }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const handleFavorited = () => setIsFavorited(() => !isFavorited);

  return (
    <FlatList
      horizontal
      snapToInterval={orientation.width}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id.toString()}
      data={list}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.cardContainer} activeOpacity={0.8}
            onPress={() => onPress(item.subtitle)}
            key={index}>
            <Image source={item.image} style={styles.image} resizeMode="stretch" />
            <View style={styles.cardText}>
              <Text style={styles.title}>{item.title}</Text>
              <Ionicons name="ios-heart-outline" size={orientation.width > 500 ? 40 : 30} color="red" />
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default TopServicesCarousel

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    width: orientation.width > 500 ? orientation.width / 2 : deviceWidth - 20,
    backgroundColor: '#FFFFFD',
    height: orientation.height / 3,
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
    height: '80%',
    opacity: 0.8
  },
  cardText: { flexDirection: 'row', justifyContent: 'space-between', marginTop: orientation.width > 500 ? 20 : 10, marginHorizontal: 20 },
  title: { fontSize: orientation.width > 500 ? 24 : 18, fontWeight: 'bold' }
})