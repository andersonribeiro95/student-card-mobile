// screens/AddDocument.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDocumentData } from "../services/api";
import DocumentCard from "../components/DocumentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddDocument = ({ route, navigation }) => {
  const { data } = route.params;

  const [documentInfo, setDocumentInfo] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      const parsedData = await parseDocumentData(data);
      setDocumentInfo(parsedData);
    };

    fetchDocumentData();
  }, [data]);

  const parseDocumentData = async (data) => {
    const documentData = await getDocumentData(data);
    return {
      _id: documentData[0]._id || "Unknown _id",
      name: documentData[0].name || "Unknown name",
      cpf: documentData[0].cpf || "Unknown cpf",
      birthDate: documentData[0].birthDate || "Unknown date",
      institution: documentData[0].institution || "Unknown institution",
      course: documentData[0].course || "Unknown course",
      issuer: documentData[0].issuer || "Unknown issuer",
      validity: documentData[0].validity || "Unknown date",
    };
  };

  const handleAdd = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      if (user.documents.some(doc => doc._id === documentInfo._id)) {
        console.log("Documento já existe!");
        // TODO: Mostrar uma mensagem para o usuário dizendo que o documento
        // já existe e retornar para a tela Home.
        navigation.navigate("Home");
        return;
      }
      
      user.documents.push(documentInfo);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  return documentInfo ? (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar</Text>
      <Text style={styles.text}>Verifique as informações do seu documento</Text>
      {documentInfo && <DocumentCard {...documentInfo} />}
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
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
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