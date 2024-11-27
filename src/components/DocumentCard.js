import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentCard = (data) => {
    console.log(`DocumentCard.data: ${JSON.stringify(data)}`);
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Nome: {data.name}</Text>
            <Text style={styles.text}>CPF: {data.cpf}</Text>
            <Text style={styles.text}>Data Nascimento: {data.birthDate}</Text>
            <Text style={styles.text}>Curso: {data.course}</Text>
            <Text style={styles.text}>Instituição: {data.institution}</Text>
            <Text style={styles.text}>Emissor: {data.issuer}</Text>
            <Text style={styles.text}>Validade: {data.validity}</Text>
            <Text style={styles.text}>ID: {data._id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default DocumentCard;