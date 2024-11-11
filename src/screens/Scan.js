// screens/Scan.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    // Validate and parse data
    navigation.navigate("AddDocument", { data });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan</Text>
      <Text style={styles.text}>
        Escaneie o QR Code presente no seu documento estudantil.
      </Text>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  scanner: {
    width: "100%",
    height: "70%",
  },
  cancelButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Scan;