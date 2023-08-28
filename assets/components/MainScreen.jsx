import React from "react";

import { Text,View, Button,ImageBackground,StyleSheet, Image} from "react-native";

const MainScreen=({navigation})=>{
    return(
        <ImageBackground source={require('./img/fondo.png')} style={styles.backgroundImage} >
        <View style={styles.content}>
            <Image source={require('./img/Logo.png')} style={styles.logo} resizeMode="contain"></Image>
            <Text style={styles.bienvenido} >Bienvenido</Text>
          <View style={styles.buttonContainer}> 

          <Button title="Inicie Sesion en su Cuenta Registrada" onPress={() => navigation.navigate('LoginScreen')} />
          </View>


        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({ 
    backgroundImage: {
      flex: 1,
    width:'100%',
    height:'80%',
      justifyContent: 'center',
    },
    logo: {
        width: 300, 
        height: 450, 
        marginBottom: 20, 
        marginLeft:35
      },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 20,
    },
    bienvenido: {
    fontSize: 32,
    top:100,
    color:'#000',
  },
    buttonContainer: {
        position: 'absolute',
        bottom: 132, 
        left: 20, 
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        borderRadius: 13,
      },
  });

export default MainScreen;