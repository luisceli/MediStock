import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import axios from "axios";

import baseUrl from "./comom/baseUrl";
import ImageHeader from "./ImageHeader";
import Constants from "expo-constants";

import { Picker } from "@react-native-picker/picker";

const HistoricosMedicamento = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [historicofinalData, setHistoricoFinalData] = useState([]);

  const fetchHistoricoData = async (year) => {
    try {
      const response = await axios.get(`${baseUrl}historicos/por-anio/${year}`);
      setHistoricoFinalData(response.data);
    } catch (error) {
      console.error("Error de fetch", error);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      fetchHistoricoData(selectedYear);
    }
  }, [selectedYear]);

  const formatEstimacionCosto = (valor) => {
    return parseFloat(valor)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>
      <ImageHeader imageSource={require("./img/fondoSuperior.png")} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Historicos</Text>
        <View style={styles.underline}></View>
        <Image
          source={require("./img/User.png")}
          style={styles.userLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.yearPickerContainer}>
        <Text>Seleccionar el Año:</Text>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={{ width: 150 }}
        >
          <Picker.Item label="Seleccionar" value={null} />
          <Picker.Item label="2019" value={2019} />
          <Picker.Item label="2020" value={2020} />
          <Picker.Item label="2021" value={2021} />
          <Picker.Item label="2022" value={2022} />
        </Picker>
      </View>

      <View style={styles.dataListContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.columnText}>Descripción</Text>
          <Text style={styles.columnText}>Cantidad</Text>
          <Text style={styles.columnText}>Valor</Text>
        </View>

        <FlatList
          data={historicofinalData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Costo de Medicamentos</Text>
                <Text style={styles.columnText}>
                  {item.cant_Costo_Medicina}
                </Text>
                <Text style={styles.columnText}>
                  $ {formatEstimacionCosto(item.valor_Costo_Medicina)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>CostoInsumos</Text>
                <Text style={styles.columnText}>{item.cant_Costo_Insumos}</Text>
                <Text style={styles.columnText}>
                  $ {formatEstimacionCosto(item.valor_Costo_Insumos)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>CostoEquipos</Text>
                <Text style={styles.columnText}>{item.cant_Costo_Equipos}</Text>
                <Text style={styles.columnText}>
                  {item.valor_Costo_Equipos}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>CostoDistribucion</Text>
                <Text style={styles.columnText}>
                  {item.cant_Costo_Distribucion}
                </Text>
                <Text style={styles.columnText}>
                  {item.valor_Costo_Distribucion}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Subtotal</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>{item.subtotal}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Presupuesto</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>{item.presupuesto}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Saldo</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>{item.saldo}</Text>
              </View>
            </View>
          )}
        />

        {/* Repetir esta estructura para las filas restantes */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
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
  dataListContainer: {
    marginHorizontal: 14,
    height: "57%",
  },
  columnText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  userLogo: {
    width: 40,
    height: 40,
  },
});

export default HistoricosMedicamento;
