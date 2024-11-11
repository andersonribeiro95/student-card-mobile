// screens/ForgotPassword.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    // Aqui você adicionaria a lógica para enviar o e-mail de recuperação de senha
    Alert.alert("Recuperação de Senha", "Instruções de recuperação de senha foram enviadas para o seu e-mail.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci Minha Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar Instruções</Text>
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

export default ForgotPassword;
