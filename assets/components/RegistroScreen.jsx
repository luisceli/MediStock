import React, { useState } from 'react';
import Constants from 'expo-constants'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import baseUrl from './comom/baseUrl';

const RegistroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconColor, setEyeIconColor] = useState('#C3C3C3');

  const [error,setError]= useState('');
 


  const handleinicio = () => { 
    navigation.navigate('LoginScreen');
  };

  const handleRegister = async () => {
    
    console.log('registrando usuario')

    if (
      username === '' ||
      email === '' ||
      password === ''
    ) {
      setError('Llene los campos por favor');
    } else {
      setError('');
    }

    let usuario = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(`${baseUrl}usuarios/registro`, usuario)
      .then((res) => {
        if (res.status === 200) {
          Alert.alert(
            'Registro Correcto',
            'El usuario se ha registrado exitosamente. Por favor inicie sesión.',
            [
              {
                text: 'Aceptar',
                onPress: () => navigation.navigate('LoginScreen'),
              },
            ]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          'Hubo un problema al registrar el usuario. Por favor intente nuevamente.'
        );
      });
  };


  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
    setEyeIconColor(prevState => (prevState === '#C3C3C3' ? '#2D81FE' : '#C3C3C3')); 
  };

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>

     
      <Image source={require('./img/BarraSuperior.png')} style={styles.headerImage} resizeMode="cover" />

      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subTitle}>Registrese con su direccion de correo valido</Text>
    

      <View style={styles.inputContainer}>
     
      <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="eje.carlos"
          name={"username"}
          id={"username"}
          value={username}
          onChangeText={(text) => setUsername(text.toLowerCase())}
        />


     <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="eje.usuario@utpl.edu.ec"
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />

      
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Ingrese cotrasena"}
          name={"password"}
          id={"password"}
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text.toLowerCase())}
        />

        </View>
        
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
        <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color={eyeIconColor}
          />
        </TouchableOpacity>
        
      </View>

      {error !== "" && <ErrorMessage message={error} />}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTRARSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleinicio}>
        <Text style={styles.loginButtonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffff'
  },
  headerImage: {
    width: '100%',
    height: '13.3%', // Ajusta la altura de la imagen según tus necesidades
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:16,
    marginTop: 20,
    marginBottom:10
  },
  subTitle: {
    fontSize: 16,
    width:'100%',
    color: '#888',
    marginBottom: 20,
    textAlign:'left',
    marginLeft:16,
  },
  inputContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    marginLeft:15
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight:'bold'
  },
  input: {
    width:'90%',
    height: 40,
    borderColor: 'gray',
    marginBottom: 50,
    borderBottomWidth:1,
  
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginBottom: 10,
    color: '#888',
    marginRight:50
  },
  registerButton: {
    backgroundColor: '#2D81FE',
    borderRadius: 30,
    padding:10,
    paddingHorizontal:20
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding:10,
    
  },
  loginButton: {
    
    backgroundColor: '#fff', 
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2D81FE', 
    padding: 10,
    paddingTop:16,
    paddingHorizontal:50
  },
  loginButtonText: {
    color: 'black', 
    textAlign: 'center',
  },

  passwordInput: {
    flex: 1,
  
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#ffff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop:'8%',
    justifyContent: 'space-around', 
  },
  
  eyeIcon: {
    position: 'absolute', 
    right:"13%",
    top:'78%'
  },
  eyeIcon2: {
    position: 'absolute', 
    right:'13%',
    top:'78%'
  },
  
});

export default RegistroScreen;
