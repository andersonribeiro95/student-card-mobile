import { View, Text, StyleSheet, Image } from "react-native";
import { getProfilePicture } from "../services/api";
import { formatDate } from "../utils/date";

const Card = ({ profilePicture, name, _id, validity }) => {
  // return (
  //   <View style={styles.card}>
  //     <Text style={styles.title}>{name}</Text>
  //     <Text style={styles.content}>{_id}</Text>
  //     <Text style={styles.content}>Válido até {validity}</Text>
  //   </View>
  // );
  return (
    <View style={styles.card}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={getProfilePicture(profilePicture)}
          style={styles.profilePicture}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.content}>{_id}</Text>
        <Text style={styles.content}>Válido até {formatDate(validity)}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    alignItems: "left",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
  profilePictureContainer: {
    alignItems: "left",
    marginTop: 10,
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "left",
  },
});

export default Card;