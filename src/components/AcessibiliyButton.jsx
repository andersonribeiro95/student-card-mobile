import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext'

export default function AccessibilityButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const { increaseFontSize, decreaseFontSize, toggleHighContrast } = useAccessibility();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.accessibilityButton}
        onPress={toggleModal}
        accessible={true}
        accessibilityLabel="Botão de acessibilidade"
        accessibilityHint="Toque para abrir as configurações de acessibilidade"
      >
        <Text style={styles.buttonText}>A</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={toggleModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opções de Acessibilidade</Text>
            
            {/* Opções de Tamanho de Fonte */}
            <TouchableOpacity style={styles.optionButton} onPress={increaseFontSize}>
              <Text style={styles.optionText}>Aumentar Tamanho da Fonte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={decreaseFontSize}>
              <Text style={styles.optionText}>Diminuir Tamanho da Fonte</Text>
            </TouchableOpacity>

            {/* Modo de Alto Contraste */}
            <TouchableOpacity style={styles.optionButton} onPress={toggleHighContrast}>
              <Text style={styles.optionText}>Ativar/Desativar Modo de Alto Contraste</Text>
            </TouchableOpacity>

            {/* Fechar Modal */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  accessibilityButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#32a852',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#32a852',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
