import React, { useState} from 'react';
import Constants from 'expo-constants'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import baseUrl from './comom/baseUrl';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation}) => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconColor, setEyeIconColor] = useState('#C3C3C3');

  // error
  const [error,setError]= useState('');
  
  const handleLogin = async () => {
         if(email==="" || password===""){
           setError("Ingrese las credenciales")
         }else{
          
          try {
            const response = await  axios.post(`${baseUrl}usuarios/login`,{
              email:email,
              password:password
            });

            const {token}= response.data;

            setToken(token);
            navigation.navigate('MenuScreen');
          
          } catch (error) {
              setError('Credenciales Incorrectas')
          }
         }
  };

  const setToken = async(token)=>{
    try {
      await AsyncStorage.setItem('authToken', token)
    
      axios.defaults.headers.common['Authorization']=`Bearer ${token}`
    }
     catch (error) {
      console.error('eror en almacenar token', error)
    }
  }

  const handleRegister = () => {
    navigation.navigate('RegistroScreen');
  };
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
    setEyeIconColor(prevState => (prevState === '#C3C3C3' ? '#2D81FE' : '#C3C3C3')); // Cambiar color del ícono
  };
  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>

     
      <Image source={require('./img/BarraSuperior.png')} style={styles.headerImage} resizeMode="cover" />

      <Text style={styles.title}>Inicio de Sesión</Text>
      <Text style={styles.subTitle}>Inicie sesión en su cuenta registrada</Text>

      <View style={styles.inputContainer}>
     
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          value={email}
          name={"email"}
          id={"email"}
          placeholder="eje. usuario@utpl.edu.ec"
          keyboardType="email-address"
          autoCapitalize="none"
        />

      
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder="Ingrese su "
          value={password}
          secureTextEntry={true}
        />
        </View>
        
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
        <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color={eyeIconColor}
          />
        </TouchableOpacity>
       
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

      </View>

      {error !== "" && <ErrorMessage message={error} />} 

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTRARSE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sesionButton} onPress={handleLogin}>
        <Text style={styles.sesionButtonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffff',
    marginTop: '5%'
  },
  headerImage: {
    width: '100%',
    height: '13.3%', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:16,
    marginTop: 20,
    marginBottom:10
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginRight:182,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 90,
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

  passwordInput: {
    flex: 1,
  
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#ffff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop:'30%',
    justifyContent: 'space-around', 
  },
  registerButton: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 10,
    borderWidth:1,
    borderColor:'#2D81FE',
    paddingHorizontal: 30,
  },
  registerButtonText: {
    color: '#000000', 

  },
  sesionButton: {
    backgroundColor: '#2D81FE', 
    borderRadius: 20, 
    padding: 10,
    borderColor:'blue',
    paddingVertical:'10',
    paddingHorizontal: '8%',
  },
  sesionButtonText: {
    fontSize:20,
    color: '#fff', 
  },
  eyeIcon: {
    position: 'absolute', 
    right:'15%',
    top:'58%'
  },
  
});

export default LoginScreen;
