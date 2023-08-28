import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const PlanificacionModal = ({ visible, onClose }) => {
    const navigation =useNavigation();

    const handleDatalist=()=>{
        navigation.navigate('EstimacionScreen');
        onClose();
    }
    const handleCapilal=()=>{
        navigation.navigate('EstimacionCapitalScreen');
        onClose();
    }
    const handleHistoricos=()=>{
      navigation.navigate('HistoricosMedicamentos');
      onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
      
          <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={{ top: 40, bottom: 40, left: 80, right: 40 }}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
       
          <Text style={styles.modalTitle}>Planificación</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleDatalist}>Estimacion de Subministros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleCapilal} >Estimacion de Capital </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleHistoricos} >Revisar Historicos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 10,
      width:'80%'
    },
    modalTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: "center",
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderColor:'#000',
      zIndex:1,  
    },
    closeButtonText: {
      color: '#2D81FE',
      fontWeight: 'bold',
      fontSize:29
    },
    button: {
      backgroundColor: '#2D81FE',
      borderRadius: 30,
      paddingVertical: 20,
      marginBottom: 30,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize:20
    },
  });

export default PlanificacionModal;
