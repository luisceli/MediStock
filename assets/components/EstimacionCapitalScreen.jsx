import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageHeader from "./ImageHeader";

const EstimacionCapitalScreen = ({route}) => {
  const navigation = useNavigation();

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const navigateToScreen = (screenName, buttonIndex) => {
    navigation.navigate(screenName, { activeButtonIndex: buttonIndex });
  };

  useEffect(() => {
    const activeIndex = route.params?.activeButtonIndex ?? 0;
    setActiveButtonIndex(activeIndex);
  }, [route.params?.activeButtonIndex]);
  

  const buttons = [
    {
      label: "Capital de Compras de Medicamentos",
      screenName: "CapitalMedicina",
      index: 0,
    },
    {
      label: "Capital de Compras de Insumos",
      screenName: "CapitalInsumos",
      index: 1,
    },
    {
      label: "Capital de Compras de Equipos",
      screenName: "CapitalEquipo",
      index: 2,
    },
    {
      label: "Capital de Costo de Distribucion",
      screenName: "Distribuciones",
      index: 3,
    },
    { label: "Generar Reporte Final", 
    screenName: 
    "Reporte", index: 4 },
  ];

  return (
    <View style={[styles.container, { marginTop: "8%" }]}>
      <ImageHeader imageSource={require("./img/fondoSuperior.png")} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Estimacion de Capital</Text>
        <View style={styles.underline}></View>
        <Image
          source={require("./img/User.png")}
          style={styles.userLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.containerButton}>
      {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              index === activeButtonIndex ? {} : styles.disabledButton,
            ]}

            onPress={() => {
              console.log("Navigating to", button.screenName, "with activeButtonIndex:", index);
              navigateToScreen(button.screenName, index);
            }}
            disabled={index !== activeButtonIndex}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  underline: {
    borderBottomWidth: 3,
    borderBottomColor: "black",
    width: 100,
    marginBottom: "10%",
    marginRight: "10%",
    marginLeft: 10,
    position: "absolute",
  },
  containerButton: {
    marginTop: 70,
  },
  button: {
    backgroundColor: "#2D81FE",
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: 50,
    marginHorizontal: "8%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: "#D6E4FB", // Color para botones deshabilitados
  },
});

export default EstimacionCapitalScreen;
