import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const DropDownComponents = ({ title = null, data = [], value = {}, onSelect = () => { } }) => {
  const [showOption, setShowOption] = useState(false);
  const [showTitle, setShowTitle] = useState('')

  useEffect(() => {
    if (title !== null) {
      setShowTitle(title)
    } else {
      setShowTitle('Choose Item')
    }
  })


  const onSelectedItem = (item) => {
    setShowOption(false);
    onSelect(item)
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <Text>{!!value?.name ? value?.name : `${showTitle ? showTitle : value?.name}`}</Text>
        <Ionicons
          name="md-arrow-down-circle-sharp"
          size={24} color="black"
          style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>
      {/* Render Data */}


      {showOption && (
        <View style={{ marginLeft: 14, marginRight: 14, height: 150, backgroundColor: '#C5C5C5', padding: 10, borderRadius: 8 }}>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
          >
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    borderRadius: 4,
                    marginBottom: 10,
                    backgroundColor: value.code == item.code ? '#DDD' : '#FFF',
                    paddingHorizontal: 8,
                    height: 40,
                    borderWidth: 0.5
                  }}
                  onPress={() => onSelectedItem(item)}
                  key={String(index)}
                >
                  <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#222', fontWeight: '500' }}>{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      )}

    </View>
  )
}

export default DropDownComponents

const styles = StyleSheet.create({
  container: {},
  dropDownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 42,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.0)',
    padding: 8, borderRadius: 6,
    marginRight: 14,
    borderWidth: 1
  },
})