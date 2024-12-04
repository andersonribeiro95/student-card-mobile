import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { getProfilePicture } from "../services/api";
import { formatDate } from "../utils/date";
const DocumentCard = ({
  name,
  cpf,
  birthDate,
  institution,
  course,
  issuer,
  _id,
  validity,
  profilePicture,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={getProfilePicture(profilePicture)}
          style={styles.profilePicture}
        />
      </View>
      <Text style={styles.text}>Nome: {name}</Text>
      <Text style={styles.text}>CPF: {cpf}</Text>
      <Text style={styles.text}>
        Data de Nascimento: {formatDate(birthDate)}
      </Text>
      <Text style={styles.text}>Instituição: {institution}</Text>
      <Text style={styles.text}>Curso: {course}</Text>
      <Text style={styles.text}>Emissor: {issuer}</Text>
      <Text style={styles.text}>ID: {_id}</Text>
      <Text style={styles.text}>Válido até {formatDate(validity)}</Text>
      <View style={styles.qrCodeContainer}>
        <QRCode value={_id} size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  profilePictureContainer: {
    alignItems: "center",
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default DocumentCard;