// screens/DocumentDetails.js
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentCard from "../components/DocumentCard";
import { FontAwesome } from "@expo/vector-icons";
import DeletePopup from "../components/DeletePopup";
import fundo1 from "../assets/fundo1.jpg"; // Importe a imagem

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      user.documents = user.documents.filter(
        (doc) => doc._id !== item._id
      );
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Falha ao remover documento:", error);
    }
  };

  return (
     <ImageBackground
      source={fundo1}
      style={styles.background}
      resizeMode="cover" 
      >     
    <View style={styles.container}>   
      <Text style={styles.title}>Detalhes</Text>   
    {item && <DocumentCard {...item} />}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="trash" size={24} color="black" />
      </TouchableOpacity>
      <DeletePopup
        visible={modalVisible}
        onDelete={handleDelete}
        onCancel={() => setModalVisible(false)}
      />     
    </View> 
   
     </ImageBackground> 
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgba(113, 206, 126, 0.8)", // Adiciona um fundo semi-transparente para melhor visibilidade
    padding: 20,
    marginTop: 20,
  },
  title: {
  fontSize: 28, // Aumenta o tamanho da fonte para maior destaque
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20, // Adiciona margem superior para ajustar o espaçamento
    fontFamily: 'Arial', // Usa uma fonte mais moderna e legível
    color: '#333', // Adiciona uma cor mais suave para o texto
    textAlign: 'left', // Centraliza o texto
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Adiciona sombra ao texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  deleteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmDeleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  confirmDeleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default DocumentDetails;