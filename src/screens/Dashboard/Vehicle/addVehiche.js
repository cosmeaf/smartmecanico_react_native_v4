import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput, RadioButton } from "react-native-paper";
import { MaskedTextInput } from 'react-native-mask-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import TabOneLine from '../../../componentes/TabOneLine';
import GlobalContext from '../../../Contexts/Context';
import Api from '../../../service/Api';


//https://parallelum.com.br/fipe/api/v2/{vehicleType}/brands/{brandId}/models/{modelId}/years/{yearId}
//http://parallelum.com.br/fipe/api/v2/{vehicleType}/brands/{brandId}/models/{modelId}/years/{yearId}
//https://parallelum.com.br/fipe/api/v2/cars/brands/25/models/4010/years/2007-1
const FIPE_API = 'https://parallelum.com.br/fipe/api/v2'


const AddVehiche = ({ navigation }) => {
  const { authentication, signout } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [Focus, setFocus] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [yearId, setYearId] = useState(null);
  const [yearCode, setYearCode] = useState(null);
  // useState ArrayData
  const [brandsData, setBrandsData] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [yearData, setYearData] = useState([]);
  // useState FormData
  const [brands, setBrands] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [price, setPrice] = useState('');
  const [odomitter, setOdomitter] = useState('');
  const [plate, setPlate] = useState('');
  const [isModalVisibleOdomiter, setIsModalVisibleOdomiter] = useState(false);
  const [isModalVisiblePlate, setIsModalVisiblePlate] = useState(false);

  const handleModalOdomiter = () => setIsModalVisibleOdomiter(() => !isModalVisibleOdomiter);
  const handleModalPlate = () => setIsModalVisiblePlate(() => !isModalVisiblePlate);

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      handleBrandId(vehicleType)
      setIsLoading(false)
    }, 1000)
  }, [vehicleType])

  useEffect(() => {
    handleModelId(vehicleType, brandId);
  }, [brandId]);

  useEffect(() => {
    handleFuel(vehicleType, brandId, modelId);
  }, [modelId]);

  useEffect(() => {
    handleGetPrice(vehicleType, brandId, modelId, yearCode);
  }, [yearCode]);


  const handleBrandId = async (vehicleType) => {
    try {
      if (vehicleType === 'cars' || vehicleType !== null) {
        let response = await fetch(`${FIPE_API}/${vehicleType}/brands`);
        if (response.ok) {
          let json = await response.json();
          let data = json.map(({ code, name }) => ({ code, name }))
          setBrandsData(data)
        }
      }
    } catch (error) {
      return null;
    }
  }

  // Gent Vehicle Models 
  const handleModelId = async (vehicleType, brandId) => {
    try {
      if (vehicleType === 'cars' || vehicleType !== null && brandId !== '' || brandId !== null) {
        let response = await fetch(`${FIPE_API}/${vehicleType}/brands/${brandId}/models`);
        if (response.ok) {
          let json = await response.json();
          let model = json.map(({ code, name }) => ({ code, name }))
          setModelsData(model)
        }
      }
    } catch (error) {
      return null;
    }
  }

  // Gent Vehicle Fuel
  const handleFuel = async (vehicleType, brandId, yearId) => {
    try {
      if (vehicleType === 'cars' || vehicleType !== null && brandId !== '' || brandId !== null && yearId !== '' || yearId !== null) {
        let response = await fetch(`${FIPE_API}/${vehicleType}/brands/${brandId}/models/${modelId}/years`);
        if (response.ok) {
          let json = await response.json();
          let year = json.map(({ code, name }) => ({ code, name }))
          setYearData(year)
        }
      }
    } catch (error) {
      return null;
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
                navigation.navigate('AddVehicle');
              }
            },
            {
              text: "Sair",
              onPress: async () => {
                navigation.navigate('Vehicle');
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

  //================================================================================================================
  // Begin Render
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
        {/* Start Area for Radio Buttom */}
        <View>
          <RadioButton.Group onValueChange={value => setVehicleType(value)} value={vehicleType}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 0.5, borderRadius: 20, marginRight: 10 }}>
                  <RadioButton value="cars" status='unchecked' />
                </View>
                <FontAwesome name="car" size={30} color="#525252" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 0.5, borderRadius: 20, marginRight: 10 }}>
                  <RadioButton value="trucks" status='unchecked' />
                </View>
                <FontAwesome name="truck" size={30} color="#525252" />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 0.5, borderRadius: 20, marginRight: 10 }}>
                  <RadioButton value="motorcycles" status='unchecked' />
                </View>
                <FontAwesome name="motorcycle" size={30} color="#525252" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        {/* Start Area DropDown */}
        <View style={styles.container}>
          {/* BRANDS VEHICLE */}
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
            placeholder={!isFocus ? 'Selecione Marca' : `${brands.name ? brands.name : '...'}`}
            searchPlaceholder="Buscar por Marca..."
            value={brands}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setBrandId(item.code)
              setBrands(item.name)
              setIsFocus(false);
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
          {/* MODEL VEHICLE */}
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
            placeholder={!isFocus ? 'Selecione um Modelo' : `${model.name ? model.name : '...'}`}
            searchPlaceholder="Buscar Modelo..."
            value={model}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setModelId(item.code);
              setModel(item.name);
              setIsFocus(false);
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
          {/*  YEAR DATE */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearData}
            search
            maxHeight={300}
            labelField="name"
            valueField="code"
            placeholder={!isFocus ? 'Selecione um Ano' : `${year.name ? year.name : '...'}`}
            searchPlaceholder="Buscar Ano..."
            value={year}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setYearId(item.name)
              setYear(item.code.slice(0, 4))
              setFuel(item.name.slice(5, 20))
              setYearCode(item.code)
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
        </View>
        {/* FUEL KILOMETER PLATE ID*/}
        <View style={{ flex: 1, marginLeft: 14, marginRight: 14 }}>
          <TabOneLine title='Combustivel:' subTitle={fuel ? fuel : '...'} />
          <TabOneLine title='Ano:' subTitle={year ? year : '...'} />
          <TabOneLine title='Km:'
            subTitle={odomitter ? odomitter : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={handleModalOdomiter} />
          <TabOneLine title='Placa:'
            subTitle={plate ? plate : <Ionicons name="ios-add-circle-outline" size={24} color="black" />} onPress={handleModalPlate} />
          <TabOneLine title='Preço:'
            subTitle={price ? price : ''} onPress={handleModalPlate} />
        </View>
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
      </ScrollView>
      {/* SAVE DATA BUTTOM */}
      <TouchableOpacity style={styles.button} onPress={() => handlecreateVehicle(brands, model, fuel, year, odomitter, plate)}>
        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default AddVehiche;

const styles = StyleSheet.create({
  RadioButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
  },
  container: {
    marginLeft: 14, marginRight: 14
  },
  dropdown: {
    height: 50,
    backgroundColor: '#FFF',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 5
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
    color: 'green'
  },
  button: { marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 0.5, backgroundColor: '#54Af89' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContainer: { justifyContent: 'center', padding: 10, backgroundColor: '#FFF', height: 180, width: '94%', borderRadius: 10 },
  modaTextInput: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 14, fontSize: 16, backgroundColor: '#F2F2F2' },
  modalButton: { width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#54Af89', padding: 5, borderRadius: 10 },
  modalButtonText: { fontSize: 18, color: '#FFF' },
  excludeButton: { justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  excludeButtonText: { fontSize: 18, fontWeight: '500', color: 'red' },
});