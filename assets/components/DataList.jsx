import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, TouchableOpacity} from 'react-native';

const DataList = ({ data, searchText, dataType, setparentSelectedItem, setSelectedModalType }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleRowPress = (item) => {
   
    setparentSelectedItem(item)
    setSelectedModalType(dataType);

    
  };

  const dataFields = {
    Medicamentos: [
      { label: 'Denominacion', key: 'denominación_Comun' },
      { label: 'Forma', key: 'forma_Farmaceutica' },
      { label: 'Concentración', key: 'concentracion' },
      { label: 'Estimacion', key: 'estimacion_Cantidad' },
      { label: 'Stock', key: 'cantidad_Stock' },
    ],
    Insumos: [
      { label: 'Nombre', key: 'nombre_Generico', wrap: true  },
      { label: 'Sinonimo', key: 'sinonimo', wrap: true  },
      { label: 'Nivel de Riesgo', key: 'nivel_Riesgo', wrap: true  },
      { label: 'Especialidad', key: 'especialidad', wrap: true },
      { label: 'Estimacion', key: 'estimacion_Cantidad', wrap: true },
      { label: 'Stock', key: 'cantidad_Stock', wrap: true },
    ],
    Equipos: [
      { label: 'Nombre', key: 'nombre_Generico', wrap: true   },
      { label: 'Especificacion', key: 'especificacion', wrap: true },
      { label: 'Especialidad', key: 'especialidad', wrap: true  },
      { label: 'Estimacion', key: 'estimacion_Cantidad', wrap: true  },
      { label: 'Stock', key: 'cantidad_Stock', wrap: true },
    ],
  };


  useEffect(() => {
    // Filter the data when data or dataType changes
    const newData = data.filter((item) => {
      return dataFields[dataType]?.some((field) => {
        const fieldValue = item[field.key];
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchText.toLowerCase());
      });
    });
    setFilteredData(newData);
  }, [data, searchText, dataType]);

  if (!dataFields[dataType]) {
    return null; // or return a loading indicator, an error message, or an empty view
  }

  const renderItem = ({ item }) => {
    const stockLessThanTen = item.stock <= 10;

    return (
      <TouchableOpacity onPress={() => handleRowPress(item)}>
        <View style={styles.rowContainer}>
          {dataFields[dataType].map((field) => (
            <Text key={field.key} style={[styles.cellText, stockLessThanTen && styles.redText,field.wrap && styles.wrapText]}>
              {item[field.key] !== undefined ? item[field.key].toString() : 'N/A'}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {dataFields[dataType].map((field) => (
          <Text key={field.key} style={styles.headerText}>
            {field.label}
          </Text>
        ))}
      </View>

      <FlatList
        style={styles.dataList}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}

        
      />

      <Modal visible={selectedItem !== null} animationType="slide" transparent={true}>
        {/* ... rest of your code ... */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 8, // Ajusta el espaciado vertical según tus necesidades
    paddingHorizontal: 2, // Ajusta el espaciado horizontal según tus necesidades
    borderBottomWidth: 1,
    backgroundColor:'#D6E4FB',
    marginLeft:12,
    marginRight:12

  },
  headerText: {
    flex: 1,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize:11,

  },
  dataList: {
    maxHeight: 8 * 50,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Centra verticalmente los datos en la misma fila
    paddingVertical: 14,
    paddingHorizontal:'7.7%',
    backgroundColor:'#F7F6FE'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2D81FE',
    borderRadius: 8,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  datosSup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  matriz: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  cellText: {
    marginLeft: 4,
  },
  redText: {
    color: 'red',
  },
  datosSupForma: {
    flex: 1,
  },
  datosSupConcen: {
    flex: 1,
  },
  wrapText: {
    flex: 1, // Ocupa todo el espacio disponible en el contenedor
    flexWrap: 'wrap', // Permite que el texto se ajuste a varias líneas
  },
});

export default DataList;
