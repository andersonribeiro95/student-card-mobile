// screens/AddDocument.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDocumentData } from "../services/api";
import DocumentCard from "../components/DocumentCard";

const AddDocument = ({ route, navigation }) => {
  const { data } = route.params;

  const [documentInfo, setDocumentInfo] = useState(null);

  useEffect(() => {
    const getDocumentInfo = async () => {
      if (data) {
        const { documentData } = await getDocumentData(data);
        setDocumentInfo(documentData);
      }
    };

    getDocumentInfo();
  }, [data]);

  console.log(`Document info: ${JSON.stringify(documentInfo)}`);
  const handleAdd = () => {
    // Add document to state/storage
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar</Text>
      <Text style={styles.text}>Verifique as informações do seu documento</Text>
      {documentInfo ? <DocumentCard data={documentInfo} /> : <Text>Carregando...</Text>}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
});
export default AddDocument;