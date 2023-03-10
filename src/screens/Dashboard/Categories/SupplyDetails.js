import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../componentes/TabOneLine';
import LoadingIcon from '../../../componentes/LoadingIcon';
import Api from '../../../service/Api';

const SupplyDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)


  const deleteSupply = (id) => {
    if (id) {
      Alert.alert('Excluir Combustível', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            await Api.deleteSupply(id);
            navigation.navigate('Supply');
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há Combustível registrado para ser excluido!');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações de abastecimento</Text>
        {/* Brand */}
        <TabOneLine title='Data:' subTitle={route.params.date.split('-').reverse().join('/')} />
        {/* Model */}
        <TabOneLine title='Litros:' subTitle={route.params.liter} />
        {/* Fuel */}
        <TabOneLine title='Preço:' subTitle={`R$ ${route.params.price}`} />
        {/* Years */}
        <TabOneLine title='Km Rodados:' subTitle={route.params.kilometer} />
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteSupply(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SupplyDetails;