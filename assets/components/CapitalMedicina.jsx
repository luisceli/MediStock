import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import ImageHeader from "./ImageHeader";
import Constants from "expo-constants";
import { useNavigation,useRoute } from '@react-navigation/native';

import Icon from "react-native-vector-icons/FontAwesome";

import axios from "axios";
import baseUrl from "./comom/baseUrl";

const CapitalMedicina = () => {
  const [searchText, setSearchText] = useState("");
  const [historicoData, setHistoricoData] = useState([]);

  const [costoTotal, setCostoTotal] = useState([0]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectItemid, setSelectItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const navigation = useNavigation(); 

  const route = useRoute();
  const activeButtonIndexParam = route.params?.activeButtonIndex ?? 0;

  const [activeButtonIndex, setActiveButtonIndex] = useState(activeButtonIndexParam);

  console.log("Received activeButtonIndex:", activeButtonIndex);
  const fetchCostoTotal = async () => {
    try {
      const costoTotalResponse = await axios.get(
        `${baseUrl}medicamentos/get/costototal`
      );
      setCostoTotal(costoTotalResponse.data);
    } catch (error) {
      console.error("Error fetching costo total:", error);
    }
  };

  const handleGuardarReporte = async () => {
    try {
      // Realizar la solicitud GET al backend para obtener los datos más recientes
      const response = await axios.get(`${baseUrl}medicamentos/get/reportetotal`);
      
      setIsSuccessModalVisible(true);

      console.log('Guardado')
      console.log("Datos obtenidos:", response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };


  useEffect(() => {
    const fetchHistoricoData = async () => {
      try {
        const response = await axios.get(`${baseUrl}medicamentos`);
        setHistoricoData(response.data);
        //  console.log('datos',response.data)
      } catch (error) {
        console.error("Error de fetch", error);
      }
    };

 
    const fetchDataId = async (id) => {
      try {
        const dataId = await axios.get(`${baseUrl}medicamentos/${id}`);
        setSelectedItemData(dataId.data);
        console.log("datos", dataId.data);
      } catch (error) {
        console.error("Error fetching  ID:", error);
      }
    };

   

    fetchHistoricoData();
    fetchCostoTotal();

    if (selectItemid) {
      fetchDataId(selectItemid);
    }
  }, [selectItemid]);


  const filteredData = historicoData.filter((item) => {
    return (
      item.estimacion_Cantidad > 0 &&
      item.estimacion_Costo > 0 &&
      item.denominación_Comun.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(`${baseUrl}medicamentos`);
      setHistoricoData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos actualizados:", error);
    }
  };


  // Función para formatear el valor de estimación de costo
  const formatEstimacionCosto = (valor) => {
    return parseFloat(valor)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleRowPress = (item) => {
    console.log("id", item.id);
    setSelectItemId(item.id);
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalVisible(false);
  };
  
  const closeModalSuccess = () => {
    setIsSuccessModalVisible(false);
    const nextIndex = activeButtonIndex + 1;
    setActiveButtonIndex(nextIndex);
    navigation.navigate('EstimacionCapitalScreen', { activeButtonIndex: nextIndex });
  };
  

  const handleIncrement = () => {
    // Incrementar la cantidad del item seleccionado en 1
    setSelectedItemData((prevItem) => ({
      ...prevItem,
      estimacion_Cantidad: prevItem.estimacion_Cantidad + 1,
    }));
  };

  const handleDecrement = () => {
    // Decrementar la cantidad del item seleccionado en 1, pero no puede ser menor que 0
    if (selectedItemData.estimacion_Cantidad > 0) {
      setSelectedItemData((prevItem) => ({
        ...prevItem,
        estimacion_Cantidad: prevItem.estimacion_Cantidad - 1,
      }));
    }
  };

  const fetchAndRefreshCostoTotal = async () => {
    await fetchCostoTotal();
  };
  

  const handleActualizarProyeccion = async () => {
    if (selectedItemData) {
      try {
        // Realizar la solicitud PUT con los datos actualizados
        await axios.put(`${baseUrl}medicamentos/${selectItemid}`, selectedItemData);

        // Obtener los datos actualizados después de la actualización
        fetchUpdatedData();
        
        // Cerrar el modal después de la actualización
        closeModal();
        fetchAndRefreshCostoTotal();

      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    }
  };

  
  
  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
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


      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.dataListContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>Denominación{"\n"} Comun</Text>
          <Text style={styles.headerText}>Forma{"\n"}Farmacéutica</Text>
          <Text style={styles.headerText}>Concentración</Text>
          <Text style={styles.headerText}>Cantidad</Text>
          <Text style={styles.headerText}>Costo$</Text>
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRowPress(item)}>
              <View style={styles.rowContainer}>
                <Text>{item.denominación_Comun}</Text>
                <Text>{item.forma_Farmaceutica}</Text>
                <Text>{item.concentracion}</Text>
                <Text>{item.estimacion_Cantidad}</Text>
                <Text>$ {formatEstimacionCosto(item.estimacion_Costo)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Modal */}
        {selectedItem && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.closeButtonContainer}>
                  <TouchableOpacity onPress={closeModal}>
                    <Icon name="times" size={30} color="#2D81FE" />
                  </TouchableOpacity>
                </View>

                {selectedItemData ? (
                  <>
                    <Text style={styles.modalText}>
                      {selectedItemData.denominación_Comun}
                    </Text>
                    <Text>
                      Forma Farmacéutica: {selectedItemData.forma_Farmaceutica}
                    </Text>
                    <Text>Concentración: {selectedItemData.concentracion}</Text>
                    <View style={styles.stockContainer}>
                      <TouchableOpacity
                        style={[styles.stockButton, styles.addButton]}
                        onPress={handleIncrement}
                      >
                        <Text style={styles.stockButtonText}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.stockText}>
                        {selectedItemData.estimacion_Cantidad}
                      </Text>
                      <TouchableOpacity
                        style={[styles.stockButton, styles.subtractButton]}
                        onPress={handleDecrement}
                      >
                        <Text style={styles.stockButtonText}>-</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonActualizar}
                    
                    >
                      <Text style={styles.buttonTextActualizar}
                       onPress={handleActualizarProyeccion}
                      >
                        Actualizar Proyeccion
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text>Loading...</Text>
                )}
              </View>
            </View>
          </Modal>
        )}

        {isSuccessModalVisible && (
  <Modal
    visible={isSuccessModalVisible}
    animationType="slide"
    transparent={true}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        
      <Image
      source={require('./img/Groupvfuyttf.png')}
      style={styles.successImage}
    />

        <Text style={styles.modalText}>Guardado con éxito</Text>

        <TouchableOpacity style={styles.button}
       onPress={closeModalSuccess}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataLabel}>Costo total:</Text>
        <Text style={styles.dataValue}>${costoTotal}</Text>
      </View>

      <TouchableOpacity style={styles.button}
       onPress={handleGuardarReporte}
      >
        <Text style={styles.buttonText}>Guardar Reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerTextMedic: {
    marginTop: 10,
    marginBottom: 10,
  },
  textMedicamento: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  yearPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#C1C1C1",
    height: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: "#000",
    fontSize: 16,
    paddingLeft: 10,
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
  headerText: {
    fontWeight: "bold",
  },
  dataListContainer: {
    marginHorizontal: 14,
    height: "58%",
  },
  dataRow: {
    marginTop: 8,
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  dataLabel: {
    marginRight: 8, // Espaciado a la derecha entre el label y el valor
    fontWeight: "bold",
    fontSize: 20,
  },
  dataValue: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#215ED2",
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: "25%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonActualizar: {
    backgroundColor: "#215ED2",
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: "15%",
  },
  buttonTextActualizar: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  stockButton: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  stockButtonText: {
    color: "white",
    fontSize: 32,
  },
  stockText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  subtractButton: {
    backgroundColor: "#F24E1E",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  successImage: {
    alignSelf: 'center',
    width: 100, // Ajusta el tamaño de la imagen según tus necesidades
    height: 100, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 10, // Espacio entre la imagen y el texto
  },
});

export default CapitalMedicina;