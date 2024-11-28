// screens/DocumentDetails.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentCard from "../components/DocumentCard";
import { FontAwesome } from "@expo/vector-icons";
import DeletePopup from "../components/DeletePopup";

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const documents = await AsyncStorage.getItem("documents");
      const parsedDocuments = JSON.parse(documents);
      const updatedDocuments = parsedDocuments.filter(
        (doc) => doc._id !== item._id
      );
      await AsyncStorage.setItem("documents", JSON.stringify(updatedDocuments));
      setModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Falha ao remover documento:", error);
    }
  };

  return (
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
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  deleteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
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