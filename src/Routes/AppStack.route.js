import React from 'react';
import { Button } from 'react-native-elements'
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AppTabStack from './TabSatck.route';
import Vehicle from '../screens/Dashboard/Vehicle';
import AddVehicle from '../screens/Dashboard/Vehicle/addVehiche';
import EditVehicle from '../screens/Dashboard/Vehicle/EditVehicle';
import VehicleDetails from '../screens/Dashboard/Vehicle/VehicleDetails';
import ScheduleDetails from '../screens/Dashboard/Schedule/ScheduleDetails';
import Profile from '../screens/Dashboard/Profile';
import Settings from '../screens/Dashboard/Settings';
import User from '../screens/Dashboard/User';
import Address from '../screens/Dashboard/Address';
// Pages Services SmartMecanico
import Freios from '../screens/Dashboard/Services/Freios';
import OutrosServicos from '../screens/Dashboard/Services/OutrosServicos';
import RevisaoBasica from '../screens/Dashboard/Services/RevisaoBasica';
import ListaRevisaoBasica from '../screens/Dashboard/Services/ListaRevisaoBasica';
import ListaRevisaoCompleta from '../screens/Dashboard/Services/ListaRevisaoCompleta';
import RevisaoCompleta from '../screens/Dashboard/Services/RevisaoCompleta';
import TrocaDeOleo from '../screens/Dashboard/Services/TrocaDeOleo';
import ListaTrocaDeOleo from '../screens/Dashboard/Services/ListaTrocaDeOleo';
import TrocaDeOleoRevisaoBasica from '../screens/Dashboard/Services/TrocaDeOleoRevisaoBasica';
import ListaTrocaDeOleoRevisaoBasica from '../screens/Dashboard/Services/ListaTrocaDeOleoRevisaoBasica';
import TrocaDeOleoRevisaoCompleta from '../screens/Dashboard/Services/TrocaDeOleoRevisaoCompleta';
import ListaTrocaDeOleoRevisaoCompleta from '../screens/Dashboard/Services/ListaTrocaDeOleoRevisaoCompleta';
// Pages Category SmartMecanico
import Supply from '../screens/Dashboard/Categories/Supply';
import AddSupply from '../screens/Dashboard/Categories/AddSupply';
import SupplyDetails from '../screens/Dashboard/Categories/SupplyDetails';
import Maintenance from '../screens/Dashboard/Categories/Maintenance/Maintenance';
import MaintenanceDetails from '../screens/Dashboard/Categories/Maintenance/MaintenanceDetails';
import AddMaintenance from '../screens/Dashboard/Categories/Maintenance/AddMaintenance';
import Ipva from '../screens/Dashboard/Categories/Ipva/Ipva';
import AddIpva from '../screens/Dashboard/Categories/Ipva/AddIpva';
import IpvaDetails from '../screens/Dashboard/Categories/Ipva/IpvaDetails';

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  return (
    // initialRouteName = "AddVehicle"
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name='AppTabStack' component={AppTabStack} />
      <Stack.Screen name='Vehicle' component={Vehicle} options={({ navigation, route }) => ({
        title: 'Meus Veículos',
        headerShown: true,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('AddVehicle')}
            type='clear'
            title="Novo"
          />
        ),
      }

      )} />
      <Stack.Screen name='AddVehicle' component={AddVehicle} options={{ title: 'Cadastrar Veículo', headerShown: true }} />
      <Stack.Screen name='EditVehicle' component={EditVehicle} options={{ title: 'Editar Veículo' }} />
      <Stack.Screen name='VehicleDetails' component={VehicleDetails} options={{ title: 'Detalhes do Veículo', headerShown: true }} />
      <Stack.Screen name='ScheduleDetails' component={ScheduleDetails} options={{ title: 'Detalhes de Agendamento', headerShown: true }} />
      <Stack.Screen name='Profile' component={Profile} options={{ title: 'Perfil' }} />
      <Stack.Screen name='User' component={User} options={{ title: 'Editar perfil', headerShown: true }} />
      <Stack.Screen name='Settings' component={Settings} options={{ title: 'Configurações', headerShown: true }} />
      <Stack.Screen name='Address' component={Address} options={{ title: 'Endereço', headerShown: true }} />
      <Stack.Screen name='Freios' component={Freios} options={{ title: 'Serviço de Freios', headerShown: true, }} />
      <Stack.Screen name='OutrosServicos' component={OutrosServicos} options={{ title: 'Outros serviços / Orçamento', headerShown: true, }} />
      <Stack.Screen name='RevisaoBasica' component={RevisaoBasica} options={{ title: 'Revisão Básica', headerShown: true, }} />
      <Stack.Screen name='ListaRevisaoBasica' component={ListaRevisaoBasica} options={{ title: 'Categoria de Serviços', headerShown: true, }} />
      <Stack.Screen name='ListaRevisaoCompleta' component={ListaRevisaoCompleta} options={{ title: 'Categoria de Serviços', headerShown: true, }} />
      <Stack.Screen name='RevisaoCompleta' component={RevisaoCompleta} options={{ title: 'Revisão Completa', headerShown: true, }} />
      <Stack.Screen name='TrocaDeOleo' component={TrocaDeOleo} options={{ title: 'Troca de Óleo', headerShown: true, }} />
      <Stack.Screen name='ListaTrocaDeOleo' component={ListaTrocaDeOleo} options={{ title: 'Categoria de Serviços', headerShown: true, }} />
      <Stack.Screen name='TrocaDeOleoRevisaoBasica' component={TrocaDeOleoRevisaoBasica}
        options={{ title: 'Troca de Óleo Revisao Básica', headerShown: true, }} />
      <Stack.Screen name='ListaTrocaDeOleoRevisaoBasica' component={ListaTrocaDeOleoRevisaoBasica}
        options={{ title: 'Categoria de Serviços', headerShown: true, }} />
      <Stack.Screen name='TrocaDeOleoRevisaoCompleta' component={TrocaDeOleoRevisaoCompleta}
        options={{ title: 'Troca de Oleo Revisao Completa', headerShown: true, }} />
      <Stack.Screen name='ListaTrocaDeOleoRevisaoCompleta' component={ListaTrocaDeOleoRevisaoCompleta}
        options={{ title: 'Categoria de Serviços', headerShown: true, }} />
      {/* Categories Page */}
      <Stack.Screen name='Supply' component={Supply} options={({ navigation, route }) => ({
        title: 'Combustível',
        headerShown: true,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('AddSupply')}
            type='clear'
            title="Novo"
          />
        ),
      }

      )} />
      <Stack.Screen name='AddSupply' component={AddSupply} options={{ title: 'Cadastrar Combustível', headerShown: true }} />
      <Stack.Screen name='SupplyDetails' component={SupplyDetails} options={{ title: 'Detalhes de Abastecimento', headerShown: true }} />
      {/* Maintenance Page */}
      <Stack.Screen name='Maintenance' component={Maintenance} options={({ navigation, route }) => ({
        title: 'Combustível',
        headerShown: true,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('AddMaintenance')}
            type='clear'
            title="Novo"
          />
        ),
      }
      )} />
      <Stack.Screen name='AddMaintenance' component={AddMaintenance} options={{ title: 'Cadastrar Revisões', headerShown: true }} />
      <Stack.Screen name='MaintenanceDetails' component={MaintenanceDetails} options={{ title: 'Detalhes de Revião', headerShown: true }} />
      {/* IPVA Page */}
      <Stack.Screen name='Ipva' component={Ipva} options={({ navigation, route }) => ({
        title: 'Ipva',
        headerShown: true,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('AddIpva')}
            type='clear'
            title="Novo"
          />
        ),
      }
      )} />
      <Stack.Screen name='AddIpva' component={AddIpva} options={{ title: 'Cadastrar Ipva', headerShown: true }} />
      <Stack.Screen name='IpvaDetails' component={IpvaDetails} options={{ title: 'Detalhes de Ipva', headerShown: true }} />
    </Stack.Navigator>

  );
}

export default AppStack;