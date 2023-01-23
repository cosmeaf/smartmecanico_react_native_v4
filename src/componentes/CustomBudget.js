import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import budgetData from '../model/data/budgetData'

export default props => {
  const { total } = props;

  function getBudgetData({ item: data }) {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.5, height: 50, marginBottom: 10, borderRadius: 10, alignItems: 'center', paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 18 }}> {data.name}</Text>
        <Text> R$ {data.amount}</Text>
      </TouchableOpacity>
    )
  }

  const updateBalanceValues = () => {
    const transactionsAmount = budgetData.map(transaction => transaction.amount)
    const total = transactionsAmount.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmount.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const expense = transactionsAmount.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)

  }

  useEffect(() => {
    updateBalanceValues()
  }, [])

  return (
    <View style={{ backgroundColor: '#FFF', marginBottom: 10 }}>
      <FlatList
        keyExtractor={data => data.id.toString()}
        data={budgetData}
        showsVerticalScrollIndicator={false}
        renderItem={getBudgetData}
      />
    </View>
  )
}

const styles = StyleSheet.create({})