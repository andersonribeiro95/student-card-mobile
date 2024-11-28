import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground, // Importe o componente ImageBackground
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Card from "../components/Card";
import { logoutUser } from "../services/api";

const Home = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await AsyncStorage.getItem("documents");
      if (documents) {
        setDocuments(JSON.parse(documents));
      }
    };
    fetchDocuments();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/fundo1.jpg")} // Verifique o caminho da imagem de fundo
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Seus Documentos</Text>
        <Image
          source={require('../assets/download.png')} // Certifique-se de que o caminho está correto
          style={styles.image}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
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
                <Card {...item} />
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
    </ImageBackground>
  );
};

// Add styles here
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(113, 206, 126, 0.8)", // Adiciona um fundo semi-transparente para melhor visibilidade
    padding: 20,
  },
  title: {
    fontSize: 28, // Aumenta o tamanho da fonte para maior destaque
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20, // Adiciona margem superior para ajustar o espaçamento
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
    marginTop: 5, // Adiciona margem superior para ajustar o espaçamento
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