import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabOneLine from '../../../../componentes/TabOneLine'
import Api from '../../../../service/Api'

export default function BudgetDetails({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false)


  const deleteBudget = (id) => {
    if (id) {
      Alert.alert('Excluir', 'Tem certeza que deseja excluir Dados do sistema?', [
        {
          text: "Sim",
          onPress: () => {
            setIsLoading(true)
            setTimeout(async () => {
              await Api.deleteBudget(id);
              setIsLoading(false)
              navigation.navigate('Budget');
            }, 2000)
          }
        },
        {
          text: "Não",
        }
      ])
    } else {
      Alert.alert('Atenção', 'Desculpe, não há Dados registrado para ser excluido!');
    }
  }
  return isLoading ?
    (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='green' />
      </View>
    )
    :
    (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
        <ScrollView>
          <Text style={{ marginLeft: 14, marginRight: 14, marginBottom: 20, fontSize: 16, fontWeight: '500' }}>Informações detalhadas</Text>
          {/* Brand */}
          <TabOneLine title='Descrição:' subTitle={route.params.name} />
          <TabOneLine title='Valor:' subTitle={`R$ ${route.params.amount}`} />
        </ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => deleteBudget(route.params.id)}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({})