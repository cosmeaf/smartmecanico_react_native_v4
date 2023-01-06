import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../../componentes/TabOneLine';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import Api from '../../../../service/Api';


const FinancingDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteFinancinga = (id) => {
    if (id) {
      Alert.alert('Excluir Fianciamento', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setIsLoading(true);
            await Api.deleteFinancinga(id);
            navigation.navigate('Financing');
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há Financiamento registrado para ser excluido!');
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading &&
        <LoadingIcon size='large' color="#54Af89" />
      }
      <ScrollView>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações de Fianciamento</Text>
        {/* Name */}
        <TabOneLine title='Financeira:' subTitle={route.params.name} />
        {/* Price */}
        <TabOneLine title='Preço:' subTitle={route.params.price} />

      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteFinancinga(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FinancingDetails;