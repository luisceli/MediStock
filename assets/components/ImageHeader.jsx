// ImageHeader.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageHeader = ({ imageSource }) => {
  return (
    <View style={styles.container}>
     <Image source={require('./img/fondoSuperior.png')} style={styles.headerImage} resizeMode="cover" />
        <Image source={require('./img/LogoP.png')} style={styles.headerLogo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 100,
      },
      headerLogo: {
        position: 'absolute',
        width: 55,
        height: 55,
        marginLeft: '80%',
        marginTop:25
      }
});

export default ImageHeader;
