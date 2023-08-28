import React from 'react';
import { View, StyleSheet,Modal, Text, TouchableOpacity } from 'react-native';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EquiposModal = ({ selectedItem, closeModal }) => {
  // console.log('datos',selectedItem)
  return (
    <Modal visible={selectedItem !== null} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedItem.nombre_Generico}</Text>
       
              
          <View style={styles.containerDatos}>
            <View >
            <Text style={styles.sectionTitle}>Especificación</Text>
           <Text style={styles.sectionText}>{selectedItem.especificacion}</Text>
            </View>

            <View>
            <Text style={styles.sectionTitle}>Especialidad</Text>
          <Text style={styles.sectionText}>{selectedItem.especialidad}</Text>
            </View>
          </View>
         
         <View style={styles.containerDatosInferior}>
         <Text style={styles.sectionTitleInferior}>Depreciación</Text>
         <View >
          <Text style={styles.sectionTitleCaducidad}>Fecha de depreciación </Text>
         <Text style={styles.sectionTextDate}>{formatDate(selectedItem.fecha_Depreciacion)}</Text>
         </View>
         
         </View>

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      backgroundColor: '#fff',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    closeButton: {
      borderRadius: 8,
      paddingVertical: 10,
      alignSelf: 'flex-end',
      marginTop: 1,
      position:'absolute',
      padding:12
    },
    closeButtonText: {
      color: '#2D81FE',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize:30
    }
    ,containerDatos:{
      flexDirection:'row',
      justifyContent:'space-evenly',
    
      marginBottom:12
    },
    sectionTitleInferior:{
      textAlign:'center',
      fontSize:20,
      fontWeight:'bold'
    },sectionTextDate:{
      paddingTop:1,
      textAlign:'center'
    },
    sectionTitle:{
      fontWeight:'bold'
    },
    sectionTitleCaducidad:{
      fontWeight:"bold",
      textAlign:'center',
      marginTop:6
    }
    // Add more styles as needed
  });
export default EquiposModal;
