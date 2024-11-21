import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const Home = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Documentos</Text>
      <Image
        source={require('../assets/download.png')} // Certifique-se de que o caminho está correto
        style={styles.image}
      />
      {documents.length === 0 ? (
        <View style={styles.placeholder}>
          <Text>Você ainda não adicionou nenhum documento..</Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DocumentDetails", { item })}
            >
              {/* DocumentCard component */}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71CE7E",
    padding: 20,
  },
  title: {
    fontSize: 28, // Aumenta o tamanho da fonte para maior destaque
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: 'Arial', // Usa uma fonte mais moderna e legível
    color: '#333', // Adiciona uma cor mais suave para o texto
    textAlign: 'center', // Centraliza o texto
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Adiciona sombra ao texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  image: {
    width: 250, // Largura da imagem
    height: 100, // Altura da imagem
    marginBottom: 20, // Margem inferior
    borderRadius: 75, // Cantos arredondados
    resizeMode: 'cover', // Ajuste da imagem
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#d67613",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 30,
  },
});

export default Home;