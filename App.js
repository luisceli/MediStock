import React from 'react';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './assets/components/MainScreen'
import LoginScreen from './assets/components/LoginScreen';
import MenuScreen from './assets/components/MenuScreen';
import DataList from './assets/components/DataList';
import RegistroScreen from './assets/components/RegistroScreen';
import PlanificacionModal from './assets/components/PlanificacionModal';
import EstimacionScreen from './assets/components/EstimacionScreen';
import EstimacionCapitalScreen from './assets/components/EstimacionCapitalScreen';
import HistoricosMedicamentos from './assets/components/HistoricosMedicamentos';
import CapitalMedicina from './assets/components/CapitalMedicina';
import CapitalInsumos from './assets/components/CapitalInsumos';
import CapitalEquipo from './assets/components/CapitalEquipo';
import Distribuciones from './assets/components/Distribuciones';
import Reporte from './assets/components/Reporte';

const Stack= createStackNavigator();
function App() {
  enableScreens(); 
return (

<NavigationContainer>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="MenuScreen" component={MenuScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="DataList" component={DataList}  options={{ headerShown: false }} />
      <Stack.Screen name="RegistroScreen" component={RegistroScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="PlanificacionModal" component={PlanificacionModal}  options={{ headerShown: false }} />
      <Stack.Screen name="EstimacionScreen" component={EstimacionScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="EstimacionCapitalScreen" component={EstimacionCapitalScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="HistoricosMedicamentos" component={HistoricosMedicamentos}  options={{ headerShown: false }} />
      <Stack.Screen name="CapitalMedicina" component={CapitalMedicina}  options={{ headerShown: false }} />
      <Stack.Screen name="CapitalInsumos" component={CapitalInsumos}  options={{ headerShown: false }} />
      <Stack.Screen name="CapitalEquipo" component={CapitalEquipo}  options={{ headerShown: false }} />
      <Stack.Screen name="Distribuciones" component={Distribuciones}  options={{ headerShown: false }} />
      <Stack.Screen name="Reporte" component={Reporte}  options={{ headerShown: false }} />

    </Stack.Navigator>
  </NavigationContainer>





 );
}

export default App;



