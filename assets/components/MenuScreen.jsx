import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Card from './cards';
import PlanificacionModal from './PlanificacionModal';

const MenuScreen = ({ navigation }) => {
  const [isPlanificacionModalVisible, setPlanificacionModalVisible] = useState(false);

  const handleCardPress = (title) => {
    if (title === 'Planificacion') {
      setPlanificacionModalVisible(true);
    }
  };

  const closeModal = () => {
    setPlanificacionModalVisible(false);
  };

  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('./img/fondoSuperior.png')} style={styles.headerImage} resizeMode="cover" />
        <Image source={require('./img/LogoP.png')} style={styles.headerLogo} resizeMode="contain" />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <View style={styles.underline}></View>
        <Image source={require('./img/User.png')} style={styles.userLogo} resizeMode="contain" />
      </View>

      <View style={styles.cardsContainer}>
        <Card
          title="Planificacion"
          imageSource={require('./img/Planificacion.png')}
          description="Calculo de estimacion "
          onCardPress={() => handleCardPress('Planificacion')}
        />
        <Card
          title="Abastecimiento"
          imageSource={require('./img/Abastecimiento.png')}
          description="Compra de subministros"
        />
        <Card
          title="Almacenamiento"
          imageSource={require('./img/Almacenamiento.png')}
          description="Recepcion de Subministros "
        />
        <Card
          title="Control de Stock"
          imageSource={require('./img/ControlStock.png')}
          description="Monitoreo de Existencia"
        />
        <Card
          title="Distribucion"
          imageSource={require('./img/Distribucion.png')}
          description="Transporte de Pedido "
        />
        <Card
          title="Seguimiento"
          imageSource={require('./img/Seguimiento.png')}
          description="Confirmacion de Entrega"
        />
      </View>

      <PlanificacionModal visible={isPlanificacionModalVisible} onClose={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  headerImage: {
    width: '100%',
    height: 100,
  },
  headerLogo: {
    position: 'absolute',
    width: 55,
    height: 55,
    marginLeft: '80%',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  welcomeText: {
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
  userLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    marginLeft: '90%',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 50,
  },
});

export default MenuScreen;
