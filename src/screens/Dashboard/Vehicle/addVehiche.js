import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { TextInput, RadioButton } from "react-native-paper";
import { MaskedTextInput } from 'react-native-mask-text';
import { FontAwesome5 } from '@expo/vector-icons';
import TabOneLine from '../../../componentes/TabOneLine';
import Api from '../../../service/Api';

const FIPE_API = 'https://parallelum.com.br/fipe/api/v2'


const AddVehicle = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [fuelId, setFuelsId] = useState(null);
  const [yearId, setYearId] = useState(null);
  const [yearCode, setYearCode] = useState(null);
  //===========================================
  const [brandsData, setBrandsData] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [fuelsData, setFuelsData] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  //============================================
  const [brands, setBrands] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [price, setPrice] = useState('');
  const [odomitter, setOdomitter] = useState('');
  const [plate, setPlate] = useState('');
  const [isModalVisibleOdomiter, setIsModalVisibleOdomiter] = useState(false);
  const [isModalVisiblePlate, setIsModalVisiblePlate] = useState(false);
  const [isModelAvailable, setIsModelAvailable] = useState(false);

  const handleModalOdomiter = () => setIsModalVisibleOdomiter(() => !isModalVisibleOdomiter);
  const handleModalPlate = () => setIsModalVisiblePlate(() => !isModalVisiblePlate);
  const handleModalIsAvailable = () => setIsModelAvailable(() => !isModelAvailable)

  const handleIsVisible = () => {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 2000)
  }

  useEffect(() => {
    setBrandsData([]);
    if (vehicleType === null) {
      setisLoading(true)
      setTimeout(() => {
        setVehicleType('cars')
        setisLoading(false)
        setModelsData([]);
        setYearsData([]);
      }, 1000)
    }
  }, [navigation])

  useEffect(() => {
    setModelsData([])
    getModelId(vehicleType, brandId);
  }, [brandId]);

  useEffect(() => {
    setYearsData([])
    getYearId(vehicleType, brandId, modelId);
  }, [modelId]);

  useEffect(() => {
    handleGetPrice(vehicleType, brandId, modelId, yearCode);
  }, [yearCode]);


  const getBrands = async () => {
    handleIsVisible();
    try {
      let response = await fetch(`${FIPE_API}/${vehicleType}/brands`)
      if (response.ok) {
        let json = await response.json();
        setBrandsData(json)
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  const getModelId = async (vehicleType, brandId) => {
    try {
      let response = await fetch(`${FIPE_API}/${vehicleType}/brands/${brandId}/models`)
      if (response.ok) {
        let json = await response.json();
        setModelsData(json)
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  const getYearId = async (vehicleType, brandId, yearId) => {
    try {
      let response = await fetch(`${FIPE_API}/${vehicleType}/brands/${brandId}/models/${modelId}/years`)
      if (response.ok) {
        let json = await response.json();
        setYearsData(json)
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  //Get Price Vehicle
  //https://parallelum.com.br/fipe/api/v2/cars/brands/25/models/4010/years/2007-1
  const handleGetPrice = async (vehicleType, brandId, modelId, yearCode) => {
    try {
      if (vehicleType === 'cars') {
        let response = await fetch(`${FIPE_API}/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearCode}`);
        if (response.ok) {
          let json = await response.json();
          setPrice(json.price)
        }
        return null
      }
    } catch (error) {
      return null;
    }
  }

  // Save Data
  const handlecreateVehicle = async (brand, model, fuel, year, odomitter, plate) => {
    try {
      if (brand === '') {
        Alert.alert('Atenção', '\nCampo Marca não pode ser vázio')
      } else if (model === '') {
        Alert.alert('Atenção', '\nCampo Modelo não pode ser vázio')
      } else if (fuel === '') {
        Alert.alert('Atenção', '\nCampo Combustível não pode ser vázio')
      } else if (year === '') {
        Alert.alert('Atenção', '\nCampo Ano não pode ser vázio')
      } else if (odomitter === '') {
        Alert.alert('Atenção', '\nCampo K.M não pode ser vázio')
      } else if (plate === '') {
        Alert.alert('Atenção', '\nCampo Placa não pode ser vázio')
      } else {
        let json = await Api.createVehicle(brand, model, fuel, year, odomitter, plate)
        if (json.id) {
          Alert.alert('Created Successfuly', 'Veículo Cadastrado com Sucesso', [
            {
              text: "Novo Cadastro",
              onPress: async () => {
                setIsLoading(true)
                setTimeout(() => {
                  Api.deleteVehicle(id);
                  navigation.navigate('AddVehicle')
                  setIsLoading(false)
                }, 1000)
              }
            },
            {
              text: "Sair",
              onPress: async () => {
                setisLoading(true)
                navigation.navigate('Vehicle');
                setisLoading(false)
              }
            }
          ])
        } else {
          Alert.alert('Atenção', `${json.message.plate}`)
        }
      }
    } catch (error) {

    }
  }

  //============================================================================================
  // Begin Render 
  //============================================================================================

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='green' />
      </View>
    )
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 0.15 }}>
          <View style={styles.dropContent}>
            <TouchableOpacity style={styles.selectbutton} onPress={() => getBrands()}>
              {!isVisible ? <Text style={{ color: '#FFF' }}>Carro</Text> :
                <ActivityIndicator size="large" color="#FFF" animating={isVisible} />
              }

            </TouchableOpacity>
            <TouchableOpacity style={styles.selectbutton} onPress={handleModalIsAvailable}>
              <Text style={{ color: '#FFF' }}>Caminhão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectbutton} onPress={handleModalIsAvailable}>
              <Text style={{ color: '#FFF' }}>Moto</Text>
            </TouchableOpacity>
          </View>
          {/* MODAL OPTIONS NOT AVALABLE */}
          <Modal isVisible={isModelAvailable} animationIn='slideInUp' animationOut='slideOutDown' style={styles.modalAvailable}>
            <TouchableOpacity onPress={handleModalIsAvailable} style={styles.modalButtomClose}>
              <Ionicons name="chevron-down" size={30} color="green" />
              <Text>Fechar</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
                <Text style={{ color: 'tomato', fontSize: 30, fontWeight: 'bold' }}>Atenção</Text>
              </View>
              <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, letterSpacing: 1, marginBottom: 10 }}>
                  A opção solicitada não esta disponível no momento.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleModalIsAvailable}
              style={{ width: '94%', padding: 10, backgroundColor: 'green', marginLeft: 14, marginRight: 14, borderRadius: 10 }}
            >
              <Text style={{ fontSize: 20, color: '#FFF', textAlign: 'center', letterSpacing: 1 }}>Fechar</Text>
            </TouchableOpacity>
          </Modal>
          {/* END MODAL OPTION NOT AVAILABLE  */}
        </View>
        <View style={{ marginHorizontal: 14 }}>
          {/* SECTION BRANDS VEHICLE */}
          {brandsData.length > 0
            ?
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={brandsData}
              search
              maxHeight={300}
              labelField="name"
              valueField="code"
              placeholder={!isFocus ? 'Selecione Marca' : '...'}
              searchPlaceholder="Procuar..."
              value={brandId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setBrandId(item.code)
                setBrands(item.name)
                setIsFocus(false)
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'green' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            :
            <View>

            </View>
          }
          {/* SECTION MODEL VEHICLE */}
          {modelsData.length > 0
            ?
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={modelsData}
              search
              maxHeight={300}
              labelField="name"
              valueField="code"
              placeholder={!isFocus ? 'Selecione Modelo' : '...'}
              searchPlaceholder="Procuar..."
              value={modelId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setModelId(item.code)
                setModel(item.name)
                setIsFocus(false)
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'green' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            :
            <View>

            </View>
          }
          {/* SECTION YEAR VEHICLE */}
          {yearsData.length > 0
            ?
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={yearsData}
              search
              maxHeight={300}
              labelField="name"
              valueField="code"
              placeholder={!isFocus ? 'Selecione Ano' : '...'}
              searchPlaceholder="Procuar..."
              value={yearId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setYearId(item.code)
                setYear(item.name)
                setYearCode(item.code)
                setYear(item.code.slice(0, 4))
                setFuel(item.name.slice(5, 20))
                setIsFocus(false)
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'green' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            :
            <View>

            </View>}
        </View>

        {/* SECTION FUEL VEHICLE */}
        {yearsData.length > 0
          ?
          <View style={{ flex: 0.65, marginHorizontal: 14 }}>
            <TabOneLine title='Combustivel:' subTitle={fuel ? fuel : '...'} />
            <TabOneLine title='Ano:' subTitle={year ? year : '...'} />
            <TabOneLine title='Km:'
              subTitle={odomitter ? odomitter : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={handleModalOdomiter} />
            <TabOneLine title='Placa:'
              subTitle={plate ? plate : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={handleModalPlate} />
            <TabOneLine title='Preço:'
              subTitle={price ? price : ''} onPress={handleModalPlate} />
          </View>
          :
          <View>

          </View>
        }
        {/* MODAL SET ODOMITER  */}
        <Modal isVisible={isModalVisibleOdomiter} style={styles.modal}>
          <View style={styles.modalContainer}>
            <MaskedTextInput
              style={{ height: 40, borderWidth: 0.5, borderRadius: 10, paddingLeft: 10, marginBottom: 20 }}
              mask="999.999"
              placeholder={odomitter ? odomitter : 'Digite sua Kilometragem'}
              placeholderTextColor='#54Af89'
              onChangeText={(text, rawText) => setOdomitter(text)}
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleOdomiter(false)}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisibleOdomiter(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* MODAL SET PLATE  */}
        <Modal isVisible={isModalVisiblePlate} style={styles.modal}>
          <View style={styles.modalContainer}>
            <TextInput
              mode='outlined'
              placeholder={plate ? plate : 'Digite sua Placa'}
              placeholderTextColor='#54Af89'
              value={plate}
              onChangeText={(plate) => setPlate(plate)}
              keyboardType="default"
              maxLength={8}
              autoCapitalize='characters'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePlate(false)}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisiblePlate(false)}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* End SafeAreaView */}
      </SafeAreaView>
      {yearsData.length > 0
        ?
        <TouchableOpacity style={styles.button} onPress={() => handlecreateVehicle(brands, model, fuel, year, odomitter, plate)}>
          <Text style={styles.buttonText}>Cadastrar Veículo</Text>
        </TouchableOpacity>
        :
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <FontAwesome5 name="hand-point-up" size={50} color="#54Af89" />
          <Text style={{ fontSize: 22, fontWeight: '500', color: '#54Af89', marginTop: 50 }}>Escolha uma das opções deseja!</Text>
        </View>
      }
    </ScrollView>
  )


}

export default AddVehicle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  selectbutton: { width: 80, height: 35, backgroundColor: '#54Af89', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  dropContent: { flexDirection: 'row', height: 40, justifyContent: 'space-between', alignItems: 'center', padding: 14, marginBottom: 10 },
  dropdown: {
    height: 50,
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    backgroundColor: '#FFF'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: { marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 0.5, backgroundColor: '#54Af89' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalAvailable: { flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1', borderRadius: 20 },
  modalButtomClose: { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 20, marginBottom: 10 },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2' },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10 },
  modalButtonText: { fontSize: 18, color: '#FFF' },
  excludeButton: { justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  excludeButtonText: { fontSize: 18, fontWeight: '500', color: 'red' },
});