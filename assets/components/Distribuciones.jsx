import React,{useState, useEffect} from 'react';
import { View,StyleSheet, Text,Modal, TextInput,FlatList,Image, TouchableOpacity } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import ImageHeader from './ImageHeader';
import Constants from 'expo-constants';


import axios from 'axios';
import baseUrl from './comom/baseUrl';

const Distribuciones=()=>{
    const [searchText, setSearchText] = useState('');
    const [historicoData,setHistoricoData]=useState([]);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const [costoTotal,setCostoTotal]=useState([0]);

    const navigation = useNavigation(); 

    const route = useRoute();
    const activeButtonIndexParam = route.params?.activeButtonIndex ?? 0;
  
    const [activeButtonIndex, setActiveButtonIndex] = useState(activeButtonIndexParam);

    useEffect(()=>{
     
  	const fetchHistoricoData= async()=>{
      try {
        const response= await axios.get(`${baseUrl}distribuciones`)  
        setHistoricoData(response.data);
        // console.log('datos',response)
      } catch (error) {
        console.error('Error de fetch', error);
      }
    };

    const fetchCostoTotal = async () => {
      try {
        const costoTotalResponse = await axios.get(`${baseUrl}distribuciones/get/costototal`);
        setCostoTotal(costoTotalResponse.data);
      } catch (error) {
        console.error('Error fetching costo total:', error);
      }
    };
    
    fetchHistoricoData();
    fetchCostoTotal();

    },[]);

    const filteredData = historicoData.filter((item) => {
        return item.estimacion_Costo > 0 && item.hospital.toLowerCase().includes(searchText.toLowerCase());
      });

      // Función para formatear el valor de estimación de costo
      const formatEstimacionCosto = (valor) => {
        return parseFloat(valor).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const closeModalSuccess = () => {
        setIsSuccessModalVisible(false);
        const nextIndex = activeButtonIndex + 1;
        setActiveButtonIndex(nextIndex);
        navigation.navigate('EstimacionCapitalScreen', { activeButtonIndex: nextIndex });
      };
    

      const handleGuardarReporte = async () => {
        try {
          // Realizar la solicitud GET al backend para obtener los datos más recientes
          const response = await axios.get(`${baseUrl}distribuciones/get/reportetotal`);
          
          setIsSuccessModalVisible(true);
    
          console.log('Guardado')
          console.log("Datos obtenidos:", response.data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

    return(
        <View style={{ marginTop: Constants.statusBarHeight }}>
      <ImageHeader imageSource={require('./img/fondoSuperior.png')}/>
 
 <View style={styles.welcomeContainer}>
<Text style={styles.welcomeText}>Estimacion de Capital</Text>
<View style={styles.underline}></View>
<Image source={require('./img/User.png')} style={styles.userLogo} resizeMode="contain" />
</View>

<View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.dataListContainer}>

<View style={styles.rowContainer}>
  <Text style={styles.headerText}>Hospital</Text>
  <Text style={styles.headerText}>Provincia</Text>
  <Text style={styles.headerText}>Ciudad</Text>
  <Text style={styles.headerText}>Costo</Text>
</View>

<FlatList
  data={filteredData}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.columnText}>{item.hospital}</Text>
      <Text style={styles.columnText}>{item.provincia}</Text>
      <Text style={styles.columnText}>{item.ciudad}</Text>
      <Text style={styles.columnText}>$ {formatEstimacionCosto(item.estimacion_Costo)}</Text>
    </View>
  )}
/>   

{isSuccessModalVisible && (
  <Modal
    visible={isSuccessModalVisible}
    animationType="slide"
    transparent={true}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        
      <Image
      source={require('./img/Groupvfuyttf.png')}
      style={styles.successImage}
    />

        <Text style={styles.modalText}>Guardado con éxito</Text>

        <TouchableOpacity style={styles.button}
       onPress={closeModalSuccess}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

</View>

<View style={styles.dataRow}>
  <Text style={styles.dataLabel}>Costo total:</Text>
  <Text style={styles.dataValue}>${costoTotal}</Text>
</View>



<TouchableOpacity style={styles.button}
 onPress={handleGuardarReporte}
>
            <Text style={styles.buttonText} >Guardar Reporte</Text>
          </TouchableOpacity>
        </View>
    );
}

const columnMaxWidth = 100;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    containerTextMedic:{
      marginTop:10,
      marginBottom:10
    },
    textMedicamento:{
      textAlign:'center',
      fontSize:30,
      fontWeight:'bold'
    },
    yearPickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    searchContainer: {
      backgroundColor: '#ECECEC',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#C1C1C1',
      height: 40,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal:20,
      marginTop:20
    },
    searchInput: {
      flex: 1,
      height: '100%',
      color: '#000',
      fontSize: 16,
      paddingLeft: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#C1C1C1',

    },
    welcomeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 20,
    },welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    underline: {
      borderBottomWidth: 3,
      borderBottomColor: 'black',
      width: 100,
      marginBottom: '10%',
      marginRight: '10%',
      marginLeft: 10,
      position: 'absolute',
      
    },
    headerText:{
      fontWeight:'bold' 
    },
    dataListContainer:{
      marginHorizontal:14,
      height:'58%'
    },
    dataRow: {
        marginTop:8,
        marginLeft:12,
        flexDirection: 'row',
        alignItems: 'center',
      },
      dataLabel: {
        marginRight: 8, // Espaciado a la derecha entre el label y el valor
        fontWeight: 'bold',
        fontSize:20
      },
      dataValue: {
        fontWeight: 'bold',
        fontSize:20

    },
    button: {
        backgroundColor: '#2D81FE',
        borderRadius: 30,
        paddingVertical: 15,
        marginTop:20,
        marginHorizontal:'25%'

      },
       buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:20
      }
,
columnText: {
  flex: 1,
  flexWrap: 'wrap',
  maxWidth: columnMaxWidth,
  textAlign:'center' // Asegúrate de usar el mismo valor que en rowContainer
}, modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
},
modalContainer: {
  width: "80%",
  padding: 20,
  backgroundColor: "white",
  borderRadius: 10,
  elevation: 5, // Sombra en Android
  shadowColor: "black",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},
modalText: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
  textAlign: "center",
},
successImage: {
  alignSelf: 'center',
  width: 100, // Ajusta el tamaño de la imagen según tus necesidades
  height: 100, // Ajusta el tamaño de la imagen según tus necesidades
  marginBottom: 10, // Espacio entre la imagen y el texto
},

  });

  export default Distribuciones;