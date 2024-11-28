import React from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
const DeletePopup = ({ visible, onDelete, onCancel }) => {
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>Remover Documento</Text>
          <Text style={styles.message}>
            Você tem certeza que quer remover este documento?
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onCancel} />
            <Button title="Remover" onPress={onDelete} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
export default DeletePopup;