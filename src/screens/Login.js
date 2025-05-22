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
  AccessibilityInfo,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api";
import Icon from "react-native-vector-icons/FontAwesome";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      const response = await loginUser(email, password);
      setLoading(false);
      if (response.success) {
        navigation.replace("Home");
        AccessibilityInfo.announceForAccessibility(
          "Login bem-sucedido. Redirecionando para a página inicial."
        );
      } else {
        Alert.alert("Login Falhou", response.message);
        AccessibilityInfo.announceForAccessibility(
          "Login falhou. " + response.message
        );
      }
    } else {
      Alert.alert("Erro", "Por favor, insira o e-mail e a senha.");
      AccessibilityInfo.announceForAccessibility(
        "Erro. Por favor, insira o e-mail e a senha."
      );
    }
  };

  const toggleAccessibilityOptions = () => {
    setHighContrast(!highContrast);
  };

  const handleEmailChange = (text) => {
    const minLength = 5;
    const maxLength = 50;

    if (text.length < minLength) {
      setEmailError(`O e-mail deve ter pelo menos ${minLength} caracteres.`);
    } else if (text.length > maxLength) {
      setEmailError(`O e-mail deve ter no máximo ${maxLength} caracteres.`);
    } else {
      setEmailError("");
    }

    if (text.length <= maxLength) {
      setEmail(text);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fundo2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, highContrast && styles.highContrast]}>
        <Image
          source={require("../assets/esuda.jpg")}
          style={styles.logo}
        />

        <View
          style={[
            styles.modal,
            highContrast && styles.highContrastModal, // Modal preto no alto contraste
          ]}
        >
          <Text
            style={[styles.title, highContrast && { color: "#fff" }]}
            accessibilityRole="header"
          >
            Login
          </Text>

          {/* Campo de e-mail */}
          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.input, highContrast && { color: "#000" }]}
              placeholder="E-mail"
              placeholderTextColor={highContrast ? "#888" : "#000"}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Campo de e-mail"
            />
          </View>
          {emailError ? (
            <Text style={[styles.errorText, highContrast && { color: "#fff" }]}>
              {emailError}
            </Text>
          ) : null}

          {/* Campo de senha */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.input, highContrast && { color: "#000" }]}
              placeholder="Senha"
              placeholderTextColor={highContrast ? "#888" : "#000"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessibilityLabel="Campo de senha"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {/* Botão de login */}
          <TouchableOpacity
            style={[styles.button, highContrast && styles.highContrastButton]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Botão de login"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity
            onPress={() => navigation.navigate("EsqueciSenha")}
            accessibilityRole="button"
            accessibilityLabel="Esqueci minha senha"
          >
            <Text style={[styles.linkText, { color: "blue" }]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            accessibilityRole="button"
            accessibilityLabel="Primeiro acesso"
          >
            <Text style={[styles.linkText, { color: "blue" }]}>
              Primeiro acesso
            </Text>
          </TouchableOpacity>

          {/* Botão Acessibilidade */}
          <TouchableOpacity
            style={styles.accessibilityButton}
            onPress={toggleAccessibilityOptions}
            accessibilityLabel="Alternar modo de alto contraste"
          >
            <Icon name="universal-access" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
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
    backgroundColor: "#000", // Torna o modal preto no alto contraste
    borderColor: "#fff", // Adiciona uma borda branca opcional para destaque
    borderWidth: 1,
  },
  accessibilityButton: {
    position: "absolute",
    top: 350,
    right: 20,
    backgroundColor: "#DB8206",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    zIndex: 10,
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
  logo: {
    width: 300,
    height: 130,
    position: "absolute",
    top: 90,
    alignSelf: "center",
    borderRadius: 5,
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
    color: "#000",
  },
  icon: {
    marginRight: 10, // Adicionando espaço entre o ícone e o campo de texto
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
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
  linkText: {
    color: "#333",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default Login;
