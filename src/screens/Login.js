import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      const response = await loginUser(email, password);
      if (response.success) {
        // Armazena o token JWT no AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        navigation.replace("Home");
      } else {
        Alert.alert("Login Falhou", response.message);
      }
    } else {
      Alert.alert("Erro", "Por favor, insira o e-mail e a senha.");
    }
  };

  const handleEmailChange = (text) => {
    const minLength = 5;
    const maxLength = 50;

    if (text.length < minLength) {
      setEmailError(`O e-mail deve ter pelo menos ${minLength} caracteres.`);
    } else if (text.length > maxLength) {
      setEmailError(`O e-mail deve ter no máximo ${maxLength} caracteres.`);
    } else {
      setEmailError(""); // Limpa o erro
    }

    if (text.length <= maxLength) {
      setEmail(text); // Atualiza o campo
    }
  };

  return (
    <ImageBackground
      source={require("../assets/download.png")} // Verifique o caminho da imagem de fundo
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Login</Text>

      {/* Campo de e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Campo de senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão de login */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin} // Chama a função handleLogin ao pressionar o botão
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Links Esqueci Minha Senha e Primeiro Acesso */}
      <TouchableOpacity onPress={() => navigation.navigate("EsqueciSenha")}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>Primeiro acesso</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d86615",
    marginBottom: 20,
  },
  input: {
    width: "70%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 5, // Diminuído para espaço compacto
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10, // Espaço adicional para o erro
  },
  button: {
    backgroundColor: "#DB8206",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#333",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default Login;
