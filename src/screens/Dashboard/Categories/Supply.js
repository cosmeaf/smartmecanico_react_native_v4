import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIcon from '../../../componentes/LoadingIcon';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';


const Supply = ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext);
  const [supplies, setSupplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  if (!authentication) {
    signout();
  }

  useEffect(() => {
    getSupply();
  }, [authentication])

  const getSupply = async () => {
    setIsLoading(true);
    setSupplies([]);
    let res = await Api.getSupply();
    if (res) {
        setSupplies(res)
    } else {
      signout();
    }
    setIsLoading(false);
  }

  if(supplies.length === 0){
    return(
      <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          {isLoading &&
            <LoadingIcon size='large' color="#54Af89" />
          }
        <View style={{marginTop:20}}>
          <Text style={{fontSize:22}}>Você não possui</Text>
          <Text style={{fontSize:22}}>Itens Cadastrado</Text>
        </View>
      </SafeAreaView>
    )
  }else{
    return (
      <SafeAreaView style={styles.container}>
        {supplies.length === 0 && isLoading &&
          <LoadingIcon size='large' color="#54Af89" />
        }
        {supplies.map((item,index)=>(
          <TouchableOpacity key={index}
            style={styles.TouchableOpacityRender} 
            onPress={() => navigation.navigate('SupplyDetails', item)}
          >
          <Image source={require('../../../assets/icons/gas.png')} style={{ width: 30, height: 30 }} />
          <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.date.split('-').reverse().join('/')}</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Km {item.kilometer}</Text>
          </View>
          <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.liter} Litro`s</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>R$ {item.price}</Text>
          </View>
          <Ionicons name='chevron-forward' size={30} />
        </TouchableOpacity>
        ))}
      </SafeAreaView>
    )
  }



}

export default Supply;

const styles = StyleSheet.create({
  container: { flex: 1 },
  TouchableOpacityRender: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    borderWidth: 0.1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom:10,
    paddingEnd: 20,
    paddingStart: 20,
    marginBottom: 10,
    borderRadius: 25,
    marginLeft: 14,
    marginRight: 14,
  },
  renderImage: { width: 35, height: 35, marginTop: 10, marginBottom: 10 },
})