import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import TabOneLine from '../../../../componentes/TabOneLine';
import LoadingIcon from '../../../../componentes/LoadingIcon';
import Api from '../../../../service/Api';


const InsuranceDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteInsurance = (id) => {
    if (id) {
      Alert.alert('Excluir Seguradora', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: async () => {
            setIsLoading(true);
            await Api.deleteInsurance(id);
            navigation.navigate('Insurance');
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há Seguradora registrado para ser excluido!');
    }
    setIsLoading(false);
  }

  return isLoading ?
    (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#54Af89' />
      </View>
    )
    :
    (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações de Seguradora</Text>
          {/* Name */}
          <TabOneLine title='Seguradora:' subTitle={route.params.name} />
          {/* Price */}
          <TabOneLine title='Preço:' subTitle={`R$ ${route.params.price}`} />
          {/* Vencimento */}
          <TabOneLine title='Date Expiração:' subTitle={route.params.due_date ? route.params.due_date : 'Não Cadastrado'} />
          {/* Policy */}
          <TabOneLine title='Numero Apólice:' subTitle={route.params.policy ? route.params.policy : 'Não Cadastrado'} />
          {/* broker_name */}
          <TabOneLine title='Corretora:' subTitle={route.params.broker_name ? route.params.broker_name : 'Não Cadastrado'} />
          {/* agent_name  */}
          <TabOneLine title='Nome Corretor:' subTitle={route.params.agent_name ? route.params.agent_name : 'Não Cadastrado'} />
          {/* Contact  */}
          <TabOneLine title='Contato:' subTitle={route.params.phone_number ? route.params.phone_number : 'Não Cadastrado'} />
          {/* E-mail  */}
          <TabOneLine title='E-mail:' subTitle={route.params.email ? route.params.email : 'Não Cadastrado'} />
          {/* URL  */}
          <TabOneLine title='Site Seguradora:' subTitle={route.params.url ? route.params.url : 'Não Cadastrado'} />


        </ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => deleteInsurance(route.params.id)}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

export default InsuranceDetails;