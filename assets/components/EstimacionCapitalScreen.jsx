import React,{useState} from 'react';
import {View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageHeader from './ImageHeader';

const  EstimacionCapitalScreen=()=>{
  const navigation = useNavigation(); 

  const [medicinaButtonEnabled, setMedicinaButtonEnabled] = useState(true);

    return(
        <View style={[styles.container, { marginTop: '8%' }]}>
            <ImageHeader imageSource={require('./img/fondoSuperior.png')}/>
    
            <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Estimacion de Capital</Text>
        <View style={styles.underline}></View>
        <Image source={require('./img/User.png')} style={styles.userLogo} resizeMode="contain" />
      </View>

        <View style={styles.containerButton}>

        <TouchableOpacity 
       style={[styles.button, !medicinaButtonEnabled && styles.disabledButton]}
       onPress={() => {
        navigation.navigate('CapitalMedicina');
      }}
      disabled={!medicinaButtonEnabled}
  
        >
            <Text style={styles.buttonText} >
              Capital de Compras de Medicamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.button, !medicinaButtonEnabled && styles.disabledButton]}
          onPress={() => navigation.navigate('CapitalInsumos')}
          >
             
            <Text style={styles.buttonText} >Capital de Compras de Insumos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
         style={[styles.button, !medicinaButtonEnabled && styles.disabledButton]}
          onPress={() => navigation.navigate('CapitalEquipo')}
          >
            <Text style={styles.buttonText} >Capital de Compras de Equipos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
           style={[styles.button, !medicinaButtonEnabled && styles.disabledButton]}
          onPress={() => navigation.navigate('Distribuciones')}
          >
            <Text style={styles.buttonText} >Capital de Costo de Distribucion</Text>
          </TouchableOpacity>

          <TouchableOpacity 
           style={[styles.button, !medicinaButtonEnabled && styles.disabledButton]}
          onPress={() => navigation.navigate('Reporte')}
          >
            <Text style={styles.buttonText} >Generar Reporte Final </Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
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
      containerButton:{
        marginTop:70
      },
      button: {
        backgroundColor: '#2D81FE',
        borderRadius: 30,
        paddingVertical: 15,
        marginBottom: 50,
        marginHorizontal:'8%'
      },
       buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:20
      },
      disabledButton: {
        backgroundColor: 'red', // Color para botones deshabilitados
      },
});

export default EstimacionCapitalScreen;