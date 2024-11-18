// screens/FirstAccess.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const FirstAccess = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstAccess = async () => {
    // Valida o domínio do e-mail
    if (!email.endsWith("@esuda.edu")) {
      Alert.alert("E-mail inválido", "O e-mail deve ser institucional (@esuda.edu).");
      return;
    }

    try {
      // Faz a chamada à API para criar a conta
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      // Verifica se a criação foi bem-sucedida
      if (response.status === 201) {
        Alert.alert("Conta Criada", "Sua conta foi criada com sucesso!");
        navigation.navigate("Login"); // Redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primeiro Acesso</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
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

      <TouchableOpacity style={styles.button} onPress={handleFirstAccess}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
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
});

export default FirstAccess;

