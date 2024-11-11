// screens/DocumentDetails.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    // Delete document from state/storage
    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes</Text>
      {/* Display document details */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
      >
        {/* Trash Icon */}
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Excluir documento</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>Tem certeza que deseja excluir este documento?</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.confirmDeleteButton}
            >
              <Text style={styles.confirmDeleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "red",
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