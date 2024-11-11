// screens/GetStarted.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Animated Card */}
      <Text style={styles.title}>Seu documento estudantil todo digital.</Text>
      <View style={styles.card}>{
       <Image
       source={require('../assets/download.png')} // Certifique-se de que o caminho está correto
       style={styles.image}
     />/* Implement animation here */}</View>
      <Text style={styles.title}>Seu documento estudantil todo digital.</Text>
      <Text style={styles.paragraph}>
        Digitalize seu Documento Nacional do Estudante válido através do QR Code
        e tenha ele sempre disponível no seu dispositivo!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Começar</Text>
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
    backgroundColor: "#71CE7E",
  },
  card: {
    width: "90%",
    height: 200,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // Add additional styles for the animated card here
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d86615",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 300, // Largura da imagem
    height: 130, // Altura da imagem
    marginBottom: 10, // Margem inferior
    sborderRadius: 75, // Cantos arredondados
    resizeMode: 'cover', // Ajuste da imagem
  },
  button: {
    backgroundColor: "#DB8206",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GetStarted;