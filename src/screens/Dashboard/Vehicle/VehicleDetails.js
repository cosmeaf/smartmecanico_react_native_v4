import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../componentes/TabOneLine';
import Api from '../../../service/Api';

export default ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteVehicle = (id) => {
    if (id) {
      Alert.alert('Excluir Veículo', 'Tem certeza que deseja excluir Veículo do sistema?', [
        {
          text: "Sim",
          onPress: () => {
            setIsLoading(true)
            setTimeout(() => {
              Api.deleteVehicle(id);
              navigation.navigate('Vehicle')
              setIsLoading(false)
            }, 1000)
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há veículo registrado para ser excluido!');
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='green' />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Dados do Veículo</Text>
        {/* Brand */}
        <TabOneLine title='Marca:' subTitle={route.params.brand} />
        {/* Model */}
        <TabOneLine title='Modelo:' subTitle={route.params.model} />
        {/* Fuel */}
        <TabOneLine title='Combustível:' subTitle={route.params.fuell} />
        {/* Years */}
        <TabOneLine title='Ano:' subTitle={route.params.year} />
        {/* Plate Id */}
        <TabOneLine title='Placa:' subTitle={route.params.plate} />
        {/* Odomiter */}
        <TabOneLine title='Kilometragem:' subTitle={route.params.odomitter} />
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteVehicle(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir Veículo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}