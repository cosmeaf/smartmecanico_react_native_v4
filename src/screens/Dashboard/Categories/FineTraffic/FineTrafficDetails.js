import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabOneLine from '../../../../componentes/TabOneLine';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import Api from '../../../../service/Api';


const FineTrafficDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteFineTraffic = (id) => {
    if (id) {
      Alert.alert('Excluir Multa', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setIsLoading(true);
            await Api.deleteFineTraffic(id);
            navigation.navigate('FineTraffic');
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há Multas registrado para ser excluido!');
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading &&
        <LoadingIcon size='large' color="#54Af89" />
      }
      <ScrollView>
        <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações de IPVA</Text>
        {/* Date */}
        <TabOneLine title='Data:' subTitle={route.params.date ? route.params.date.split('-').reverse().join('/') : ''} />
        {/* Price */}
        <TabOneLine title='Preço:' subTitle={route.params.price ? route.params.price : ''} />
        {/* Number */}
        <TabOneLine title='Código Infração:' subTitle={route.params.number ? route.params.number : ''} />
        {/* Point */}
        <TabOneLine title='Pontuação:' subTitle={route.params.point ? route.params.point : ''} />
        {/* Description */}
        <TabOneLine title='Observações:' subTitle={route.params.description ? route.params.description : ''} />

      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => deleteFineTraffic(route.params.id)}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FineTrafficDetails;