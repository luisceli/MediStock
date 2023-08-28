import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity,Image, TextInput,selectedItem} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageHeader from './ImageHeader';
import DataList from './DataList';

import MedicamentosModal from './MedicamentosModal';
import InsumosModal from './InsumosModal';
import EquiposModal from './EquiposModal';

// llmado al backend
import axios from 'axios';
import baseUrl from './comom/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EstimacionScreen = ({ navigation }) => {
  const [authToken, setAuthToken] = useState('');

  const [searchText, setSearchText] = useState('');
  const [showDataList, setShowDataList] = useState(false);
  const [dataType, setDataType] = useState('Medicamentos');
  const [dataCache, setDataCache] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedModalType, setSelectedModalType] = useState(null);



  const handleSearch = () => {
    setShowDataList(true);
    filterData();
  };

  const filterData = async () => {
    try {
      let response;
      switch (dataType) {
        case 'Insumos':
          response = await axios.get(`${baseUrl}insumos`); // Assuming the endpoint is 'insumos'
          break;
        case 'Equipos':
          response = await axios.get(`${baseUrl}equipos`); // Assuming the endpoint is 'equipos'
          break;
        default:
          response = await axios.get(`${baseUrl}medicamentos`); // Assuming the endpoint is 'medicamentos'
        
          break;
        
          
      }
      const newData = response.data;
      setDataCache(newData);

      // Apply searchText filter to newData
      const filteredData = newData.filter((item) => {
        return dataFields[dataType]?.some((field) => {
          const fieldValue = item[field.key];
          return fieldValue && fieldValue.toLowerCase().includes(searchText.toLowerCase());
        });
      });
      setDataCache(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Determine the data fields to render based on the dataType
  const dataFields = {
    Medicamentos: [
      { label: 'Denominacion', key: 'denominación_Comun' },
      { label: 'Forma', key: 'forma_Farmaceutica' },
      { label: 'Concentración', key: 'concentracion' },
      { label: 'Estimacion', key: 'estimacion_Cantidad' },
      { label: 'Stock', key: 'cantidad_Stock' },
    ],
    Insumos: [
      { label: 'Nombre', wrap: true , key: 'nombre_Generico'},
      { label: 'Sinonimo', key: 'sinonimo' },
      { label: 'Nivel de Riesgo', wrap: true , key: 'nivel_Riesgo' },
      { label: 'Especialidad', wrap: true , key: 'especialidad' },
      { label: 'Estimacion', key: 'estimacion_Cantidad' },
      { label: 'Stock', key: 'cantidad_Stock' },
    ],
    Equipos: [
      { label: 'Nombre', key: 'nombre_Generico'  },
      { label: 'Especificacion', key: 'especificacion' },
      { label: 'Especialidad', key: 'especialidad' },
      { label: 'Estimacion', key: 'estimacion_Costo' },
      { label: 'Stock', key: 'cantidad_Stock' },
    ],
  };

  useEffect(() => {
    // Load the initial data when the component mounts
    filterData();
    setShowDataList(true);

// Obtener el token desde el estado local o AsyncStorage
   

    // Obtener el token almacenado en AsyncStorage
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
          // Configurar el token en los encabezados de axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    getToken();

  }, [dataType]); 

  



  return (
    <View style={[styles.container, { marginTop: '8%' }]}>
      <ImageHeader imageSource={require('./img/fondoSuperior.png')} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Estimacion de Subministros</Text>
        <View style={styles.underline}></View>
        <Image source={require('./img/User.png')} style={styles.userLogo} resizeMode="contain" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCustom, dataType === 'Medicamentos' && styles.activeButton]}
          onPress={() => setDataType('Medicamentos')}
        >
          <Text style={styles.buttonText}>Medicamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonCustom, dataType === 'Insumos' && styles.activeButton]}
          onPress={() => setDataType('Insumos')}
        >
          <Text style={styles.buttonText}>Insumos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonCustom, dataType === 'Equipos' && styles.activeButton]}
          onPress={() => setDataType('Equipos')}
        >
          <Text style={styles.buttonText}>Equipos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ingrese el medicamento"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={30} color="#C1C1C1" />
        </TouchableOpacity>
      </View>

      {showDataList && (
        <View style={styles.dataListContainer}>
          <DataList
            data={dataCache}
            searchText={searchText}
            dataType={dataType}
            setparentSelectedItem={setSelectedItem} 
            setSelectedModalType={setSelectedModalType} 
          />
        </View>
      )}

           {/* Modales correspondientes */}
      <Modal visible={selectedItem !== null} animationType="slide" transparent={true}>
        {selectedModalType === 'Medicamentos' && (
          <MedicamentosModal selectedItem={selectedItem} closeModal={() => setSelectedItem(null)} />
        )}
        {selectedModalType === 'Insumos' && (
          <InsumosModal selectedItem={selectedItem} closeModal={() => setSelectedItem(null)} />
        )}
        {selectedModalType === 'Equipos' && (
          <EquiposModal selectedItem={selectedItem} closeModal={() => setSelectedItem(null)} />
        )}
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  buttonContainer: {
    marginTop: '5%',
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#2D81FE',
    borderRadius: 30,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    marginBottom: '2%',
    marginHorizontal: '1%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    marginTop: '2%',
    marginBottom:16
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonCustom: {
    backgroundColor: '#2D81FE',
  },
  activeButton: {
    backgroundColor: '#3BA9FE',
  },
  searchContainer: {
    paddingHorizontal: '4%',
    backgroundColor: '#ECECEC',
    borderRadius: 30,
    marginHorizontal: '3%',
    borderWidth: 1,
    borderColor: '#C1C1C1',
    height: 50,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
    paddingLeft: 10,
  },
  searchButton: {
    padding: '2%',
    borderRadius: 30,
    marginLeft: '2%',
  },
  HistoricosContainer: {
    marginTop: 1,
    marginBottom: '5%',
  },
  buttonHistoricos: {
    backgroundColor: '#2D81FE',
    borderRadius: 30,
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    marginBottom: '2%',
    marginHorizontal: '22%',
  },
  dataListContainer: {
    flex: 1,
    marginTop:20,
  
  }
});

export default EstimacionScreen;
