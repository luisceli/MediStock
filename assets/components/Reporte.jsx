import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import axios from "axios";

import baseUrl from "./comom/baseUrl";
import ImageHeader from "./ImageHeader";
import Constants from "expo-constants";



const Reporte = () => {
  const [reportefinal, setReporteFinal] = useState([]);

  useEffect(() => {
    const fetchReporteFinal = async () => {
      try {
        const response = await axios.get(`${baseUrl}reportes/reporte`);
        // console.log('aqui',response.data);

        const arry=[response.data];
         setReporteFinal(arry);
      } catch (error) {
        console.error("Error de fetch", error);
      }
    };
    fetchReporteFinal();
  }, []);

  const formatEstimacionCosto = (valor) => {
    return parseFloat(valor).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

      <View style={styles.dataListContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.columnText}>Descripción</Text>
          <Text style={styles.columnText}>Cantidad</Text>
          <Text style={styles.columnText}>Valor</Text>
        </View>

        <FlatList
          data={reportefinal}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Costo de Medicamentos</Text>
                <Text style={styles.columnText}>
                  {item.cantidadMedicamentos} cajas
                </Text>
                <Text style={styles.columnText}>
                $ {formatEstimacionCosto(item.costoTotalMedicamentos)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Costo de Insumos</Text>
                <Text style={styles.columnText}>{item.cantidadInsumos} cajas</Text>
                <Text style={styles.columnText}>$ {formatEstimacionCosto(item.costoTotalInsumos)}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Costo de Equipos</Text>
                <Text style={styles.columnText}>{item.cantidadEquipos} equipos</Text>
                <Text style={styles.columnText}>$ {formatEstimacionCosto(item.costoTotalEquipos)}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Costo de Distribucion</Text>
                <Text style={styles.columnText}>
                  {item.cantidadDistribuciones} hospitales
                </Text>
                <Text style={styles.columnText}>
                $ {formatEstimacionCosto(item.costoTotalDistribuciones)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Subtotal</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>$ {formatEstimacionCosto(item.subtotal)}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Presupuesto Actual</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>$ {formatEstimacionCosto(item.presupuesto)}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.columnText}>Saldo</Text>
                <Text style={styles.columnText}></Text>
                <Text style={styles.columnText}>$ {formatEstimacionCosto(item.saldo)}</Text>
              </View>
            </View>
          )}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

export default Reporte;
