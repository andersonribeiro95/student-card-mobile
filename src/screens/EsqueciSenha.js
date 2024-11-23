// screens/ForgotPassword.js
import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o componente Icon


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    // Aqui você adicionaria a lógica para enviar o e-mail de recuperação de senha
    Alert.alert("Recuperação de Senha", "Instruções de recuperação de senha foram enviadas para o seu e-mail.");
  };

  return (
    <ImageBackground
      source={require("../assets/fundo1.jpg")} // Verifique o caminho da imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.container}>
        <Image
          source={require("../assets/esuda.jpg")} // Verifique o caminho da imagem
          style={styles.logo}
        />
        <View style={styles.modal}>
          <Text style={styles.title}>Esqueci Minha Senha</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Enviar Instruções</Text>
          </TouchableOpacity>
        </View>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 300, // Ajuste o tamanho da imagem conforme necessário
    height: 130,
    position: 'absolute',
    top: 90, // Ajuste a posição vertical conforme necessário
    alignSelf: 'center', // Centraliza a imagem horizontalmente
    borderRadius: 5,
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
  },
  icon: {
    marginRight: 10,
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
