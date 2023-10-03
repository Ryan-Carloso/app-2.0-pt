import React, { useEffect, useState } from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Popup = ({ visible, onClose }) => {
  const [shouldDisplayPopup, setShouldDisplayPopup] = useState(false);

  useEffect(() => {
    // Verifique o valor do contador no AsyncStorage
    AsyncStorage.getItem('popupDisplayCount')
      .then((count) => {
        if (!count) {
          // Se o contador não existir, crie-o com valor 0
          AsyncStorage.setItem('popupDisplayCount', '0');
        } else {
          // Se o contador existir, verifique se o usuário já abriu o aplicativo 3 vezes
          const displayCount = parseInt(count);
          if (displayCount < 3) {
            setShouldDisplayPopup(true);
            AsyncStorage.setItem('popupDisplayCount', (displayCount + 1).toString());
          }
        }
      })
      .catch((error) => {
        console.error('Error reading AsyncStorage:', error);
      });
  }, []);

  useEffect(() => {
    if (visible && shouldDisplayPopup) {
      const timeout = setTimeout(() => {
        handleClosePopup();
      }, 20000); // 20,000 milliseconds = 20 segundos

      return () => clearTimeout(timeout);
    }
  }, [visible, shouldDisplayPopup]);

  const handleClosePopup = () => {
    setShouldDisplayPopup(false);
    onClose();
  };

  const handleOpenLink = () => {
    const url = 'https://afonsocosta.shop/penalty/wpp/como-jogar';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error('Cannot open URL:', url);
        }
      })
      .catch((error) => {
        console.error('Error opening URL:', error);
      });
  };

  if (!visible || !shouldDisplayPopup) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClosePopup}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Já fiz o Deposito!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenLink}>
          <Image source={require('./assets/POP-UP.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 600,
    height: 500,
    resizeMode: 'contain',
  },
  closeButton: {
    bottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Popup;
