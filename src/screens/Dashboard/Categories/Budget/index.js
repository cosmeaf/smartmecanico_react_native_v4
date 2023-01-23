import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaskedTextInput } from 'react-native-mask-text';
import { TextInput } from 'react-native-paper';

import Api from '../../../../service/Api'
import styles from './styles'

const Budget = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState([]);
  const [total, setTotal] = useState('');
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    getBudget();
    setIsLoading(true)
    setTimeout(() => {
      updateBalanceValues();
      setIsLoading(false)
    }, 1000)
  }, [income, expense, total])

  const getBudget = async () => {
    const array = []
    const res = await Api.getBudget();
    if (res) {
      array.push(res)
      array.map((item) => {
        setBudget(item)
      });
    }
  }

  const createBudget = async (name, amount) => {
    const res = await Api.createBudget(name, amount)
    if (res.id) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso')
    } else {
      Alert.alert('Ooops!', 'Desculpe, Algo de errado ocorreu ao realizar seu cadastro. \nVerifique se osa dados foram preenchidos corretamente')
    }
  }

  const handleValidateClick = (name, amount) => {
    if (name.length === 0) {
      Alert.alert('Atenção', 'Campo descrição não deve ser vázio')
      return
    }
    if (name.length < 6) {
      Alert.alert('Atenção', 'Campo descriçao deve conter no mínimo 6 caracteres')
    }
    if (name.amount === 0) {
      Alert.alert('Atenção', 'Campo valor não deve ser vázio')
      return
    }
    if (name.amount < 3) {
      Alert.alert('Atenção', 'Campo valor deve conter no mínimo 6 caracteres')
      return
    }
    createBudget(name, amount);
    setTimeout(() => {
      getBudget();
      updateBalanceValues();
    }, 1000)
  }

  const updateBalanceValues = () => {
    const array = budget.map(item => item.amount)
    for (var i = 0; i < array.length; i++) {
      array[i] = parseFloat(array[i]);
    }
    const total = array.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    setTotal(total)
    const income = array.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    setIncome(income)
    const expense = array.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    setExpense(expense)
  }

  return isLoading ?
    (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='green' />
      </View>
    )
    :
    (
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back-sharp" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="ios-notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            {/* <Ionicons name="ios-notifications-off-outline" size={24} color="black" /> */}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 22 }}>Saldo Total</Text>
            <Text style={{ fontSize: 20 }}>R$ {total}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%', borderWidth: 1, padding: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Receitas</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>R$ {income}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%', borderWidth: 1, padding: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Despesas</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>R$ {expense}</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 22, marginBottom: 20, borderBottomWidth: 1, borderColor: '#CCC', borderBottomWidth: 2 }}>Adicionar Transações</Text>
            <Text>Nome da Transação</Text>
            <TextInput
              style={{ paddingLeft: 10, marginBottom: 20 }}
              mode='outlined'
              value={name}
              keyboardType="default"
              onChangeText={(text) => { setName(text) }}
            />
            <Text>(Negaivo Despesas / Positivo Receitas)</Text>
            <TextInput
              style={{ paddingLeft: 10, marginBottom: 20 }}
              mode='outlined'
              value={amount}
              keyboardType='numbers-and-punctuation'
              onChangeText={(text) => { setAmount(text) }}
            />

            <TouchableOpacity
              onPress={() => handleValidateClick(name, amount)}
              style={{ padding: 10, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 5 }}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 22, marginBottom: 20, borderBottomWidth: 1, borderColor: '#CCC', borderBottomWidth: 2 }}>Transações</Text>
          </View>

          {budget.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BudgetDetails', item)}
              style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, marginBottom: 10, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15, borderRadius: 5 }} key={index} >
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
              <Text style={{ fontSize: 16 }}>R$ {item.amount}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    )
}

export default Budget

