import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      const response = await loginUser(email, password);
      setLoading(false);
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
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Campo de senha */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Botão de login */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin} // Chama a função handleLogin ao pressionar o botão
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
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