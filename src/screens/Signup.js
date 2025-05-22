import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { registerUser } from "../services/api";
import Icon from "react-native-vector-icons/FontAwesome"; // Importe o componente Icon

const FirstAccess = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Adiciona um estado de loading
  const [highContrast, setHighContrast] = useState(false);

  const handleFirstAccess = async () => {
    if (name && email && password) {
      setLoading(true); // Inicia o loading
      const response = await registerUser(name, email, password);
      setLoading(false); // Termina o loading
      if (response.success) {
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        navigation.replace("Login");
      } else {
        Alert.alert("Falha ao Criar Conta", response.message);
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
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
        <View
          style={[styles.modal, highContrast && styles.highContrastModal]} // Modal preto no alto contraste
        >
          <Text
            style={[styles.title, highContrast && styles.highContrastText]} // Título em branco no alto contraste
          >
            Primeiro Acesso
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                highContrast && styles.highContrastInputText, // Texto no input em branco no alto contraste
              ]}
              placeholder="Nome Completo"
              placeholderTextColor={highContrast ? "#fff" : "#000"} // Placeholder branco no alto contraste
              value={name}
              onChangeText={setName}
              selectionColor={highContrast ? "#fff" : "#000"} // Cor da seleção do texto
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                highContrast && styles.highContrastInputText, // Texto no input em branco no alto contraste
              ]}
              placeholder="E-mail"
              placeholderTextColor={highContrast ? "#fff" : "#000"} // Placeholder branco no alto contraste
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              selectionColor={highContrast ? "#fff" : "#000"} // Cor da seleção do texto
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                highContrast && styles.highContrastInputText, // Texto no input em branco no alto contraste
              ]}
              placeholder="Senha"
              placeholderTextColor={highContrast ? "#fff" : "#000"} // Placeholder branco no alto contraste
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              selectionColor={highContrast ? "#fff" : "#000"} // Cor da seleção do texto
            />
          </View>

          <TouchableOpacity
            style={[styles.button, highContrast && styles.highContrastButton]} // Botão com fundo escuro no alto contraste
            onPress={handleFirstAccess}
            disabled={loading}
          >
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
  highContrastModal: {
    backgroundColor: "#000", // Modal preto
    borderColor: "#fff", // Borda branca para destaque
    borderWidth: 1,
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
    width: "100%",
    height: "100%",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d86615",
    marginBottom: 20,
  },
  highContrastText: {
    color: "#fff", // Texto branco no modo alto contraste
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#000", // Texto preto nos campos de input
  },
  highContrastInputText: {
    color: "#", // Texto branco nos campos de input no alto contraste
    backgroundColor: "#fff", // Fundo escuro no campo de input
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    width: 300,
    height: 130,
    position: "absolute",
    top: 90,
    alignSelf: "center",
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
    backgroundColor: "#444", // Botão escuro no alto contraste
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FirstAccess;
