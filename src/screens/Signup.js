// screens/FirstAccess.js
import React, { useState } from "react";
import { View, Text, Image, ActivityIndicat, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert, AccessibilityInfo } from "react-native";
import { registerUser } from "../services/api";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o componente Icon

const FirstAccess = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Adicione um estado de loading
  const [highContrast, setHighContrast] = useState(false);

  const handleFirstAccess = async () => {
    if (name && email && password) {
      setLoading(true); // Inicia o loading
      const response = await registerUser(name, email, password);
      setLoading(false); // Termina o loading
      if (response.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.replace("Login");
      } else {
        Alert.alert("Signup Failed", response.message);
      }
    } else {
      Alert.alert("Error", "Please fill all fields correctly.");
    }
  };

  const toggleAccessibilityOptions = () => {
    setHighContrast(!highContrast);
  };


  return (
    <ImageBackground
      source={require("../assets/fundo1.jpg")} // Verifique o caminho da imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, highContrast && styles.highContrast]}>
        <Image
          source={require("../assets/esuda.jpg")} // Verifique o caminho da imagem
          style={styles.logo}
        />
          <View style={styles.modal}>
          <Text style={[styles.title, highContrast && styles.highContrastText]}>Primeiro Acesso</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.input, highContrast && styles.highContrastText]}
              placeholder="Nome Completo"
              placeholderTextColor={highContrast ? "#ccc" : "#000"}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.input, highContrast && styles.highContrastText]}
              placeholder="E-mail"
              placeholderTextColor={highContrast ? "#ccc" : "#000"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.input, highContrast && styles.highContrastText]}
              placeholder="Senha"
              placeholderTextColor={highContrast ? "#ccc" : "#000"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={[styles.button, highContrast && styles.highContrastButton]} onPress={handleFirstAccess} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.accessibilityButton}
          onPress={toggleAccessibilityOptions}
          accessibilityLabel="Alternar modo de alto contraste"
        >
          <Icon name="universal-access" size={24} color="#fff" />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  highContrast: {
    backgroundColor: "#000",
  },
  accessibilityButton: {
    position: "absolute",
    top: 250,
    right: 20,
    backgroundColor: "#DB8206",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%", // Ajusta a largura do modal para ser mais responsivo
    alignItems: "center",
    marginTop: 100, // Adiciona margem superior para dar espaço para a imagem
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d86615",
    marginBottom: 20,
  },
  highContrastText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1, // Adiciona a borda
    borderColor: "#ccc", // Cor da borda
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    width: 300, // Ajuste o tamanho da imagem conforme necessário
    height: 130,
    position: 'absolute',
    top: 90, // Ajuste a posição vertical conforme necessário
    alignSelf: 'center', // Centraliza a imagem horizontalmente
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#DB8206",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  highContrastButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FirstAccess;

