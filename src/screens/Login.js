// screens/Login.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require('../assets/download.png')} // Verifique o caminho da imagem de fundo
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} // Navega para a Home após o login
>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Links Esqueci Minha Senha e Primeiro Acesso */}
      <TouchableOpacity onPress={() => navigation.navigate("EsqueciSenha")}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PrimeiroAcesso")}>
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
    marginBottom: 15,
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
