import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, ToastAndroid, Linking, Image, } from "react-native";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from './Popup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Invite from './invite';
import SegundaTela from "./SegundaTela.js"


const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const [randomData, setRandomData] = useState(null);
  const [popupCounter, setPopupCounter] = useState(0); // Contador de vezes que o popup foi exibido
  const [isPopupVisible, setPopupVisible] = useState(false);

  const copiarTextoParaAreaDeTransferencia = () => {
    Clipboard.setString("penalty shoot");
    ToastAndroid.show("Nome copiado!", ToastAndroid.SHORT);
  };

  const Suporte = () => {
    Linking.openURL("https://afonsocosta.shop/penalty/wpp/suporte-wpp");
  };


  const como_jogar = () => {
    Linking.openURL("https://afonsocosta.shop/penalty/wpp/como-jogar");
  };

  const gerarTextoAleatorio = () => {
    const nomes = ["Luan", "Ryan", "Matheus", "Fernando", "João", "Gabriel", "Daniel", "Luis", "Enzo", "Pedro", "Tiago", "André", "Paulo"];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const outro = ["Comece agora tambem!", "Jogue agora também!", "Ele começou hoje e já ganhou!", "Ganhe até 125% no 1 deposito!", "Duplicou seu depósito inicial, faça igual!"];
    const outroaleatorio = outro[Math.floor(Math.random() * outro.length)];

    const quantia = Math.floor(Math.random() * 1000);
    const novoItem = `O ${nomeAleatorio} acabou de ganhar R$ ${quantia} com esse jogo, ${outroaleatorio}`;
    setRandomData(novoItem);
  };

  useEffect(() => {
    // Verificar quantas vezes o popup foi exibido no AsyncStorage
    AsyncStorage.getItem('popupDisplayCount')
      .then((count) => {
        if (!count) {
          AsyncStorage.setItem('popupDisplayCount', '0');
        } else {
          const displayCount = parseInt(count);
          setPopupCounter(displayCount);
          // Exibir o popup automaticamente nas 3 primeiras vezes
          if (displayCount < 4) {
            setPopupVisible(true);
            AsyncStorage.setItem('popupDisplayCount', (displayCount + 1).toString());
            

            setTimeout(() => {
              setPopupVisible(false);
            }, 30000); // 30 segundos em milissegundos
          }
        }
      })
      .catch((error) => {
        console.error('Error reading AsyncStorage:', error);
      });
    
    // Iniciar a geração automática de texto a cada 40 segundos
    const interval = setInterval(gerarTextoAleatorio, 26000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <TouchableOpacity onPress={como_jogar}>
          <Image
            source={{ uri: "https://i.postimg.cc/Fs3r7FvV/3145.png" }}
            style={styles.videoThumbnail}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={como_jogar}>
      <Text style={[styles.inline, styles.centeredText]}> Tutorial aqui como jogar!</Text>
      </TouchableOpacity>
      </View>
      
      <View style={styles.containerbutton}>
        <TouchableOpacity style={styles.button1} onPress={Suporte}>
          <Text style={styles.textbutton1}>Suporte no Whatsapp!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Invite")} style={styles.button1}>
          <Text style={styles.textbutton1}>Covide e ganhe 10x mais!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SegundaTela")}
          style={styles.imageButton}
        >
          <Image
            source={{ uri: "https://i.postimg.cc/c4nyFDcC/CLique-aqui-para-jogar.png" }}
            style={styles.imageButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.containerCopy}>
          <View style={styles.textContainer}>
          <Text style={[styles.inline, styles.centeredText]}>Nome do Jogo: {'\n'} Penalty Shoot out Street</Text>
            <TouchableOpacity
              style={styles.botaoCopiar}
              onPress={copiarTextoParaAreaDeTransferencia}
            >
              <Text style={styles.textoBotaoCopiar}>Copiar Jogo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {randomData && (
        <View style={styles.randomDataContainer}>
          <Text style={styles.randomDataItem}>{randomData}</Text>
        </View>
      )}

      {/* Botão para abrir o Popup manualmente */}
      {/* Exibir o Popup */}
      {isPopupVisible && <Popup visible={isPopupVisible} onClose={handleClosePopup} />}
    </SafeAreaView>
  );
};

const InviteScreen = () => {
  return (
    <View>
      <Text>Tela de Convite</Text>
      {/* Conteúdo da tela de convite */}
    </View>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} 
                          options={{ headerShown: false }} // Oculta o cabeçalho
                          />
        <Stack.Screen name="Invite" component={Invite} 
                  options={{ headerShown: false }} // Oculta o cabeçalho
                  />
        <Stack.Screen name="SegundaTela" component={SegundaTela}
                          options={{ headerShown: false }} // Oculta o cabeçalho
                          />
                  
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1E23",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredText: {
    textAlign: 'center', // Centraliza o texto horizontalmente
  },
  inline: {
    color: "white",
    fontSize: 21,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    alignItems: "center",
    padding: 40,
  },
  centerContainer: {
    alignItems: "center",
    color: "#1B1E23",
  },
  containerCopy: {
    paddingTop: 15,
  },
  videoThumbnail: {
    width: 361,
    height: 214,
    borderRadius: 13,
  },
  video: {
    width: 361,
    height: 214,
    borderRadius: 13,
  },
  textContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: 'center', // Centraliza horizontalmente dentro deste container

  },
  NomeJogo: {
    fontSize: 17,
    Color: "white",
  },
  botaoCopiar: {
    backgroundColor: "white",
    borderRadius: 4,
    width: 90,
    height: 20,
    margin: 10
  },
  textoBotaoCopiar: {
    color: "black",
    fontSize: 13,
    textAlign: "center",
  },
  imageButton: {
    marginTop: 1,
  },
  imageButtonImage: {
    width: 361,
    height: 214,
    borderRadius: 13,
  },
  botaoYT: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textoBotaoYT: {
    color: "black",
    fontSize: 13,
    textAlign: "center",
  },
  containerbutton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10
  },
  button1: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  textbutton1: {
    backgroundColor: "white",
    fontSize: 15,
    borderRadius: 5,
  },
  randomDataContainer: {
    alignItems: "center",
    backgroundColor: "#003300",
    borderRadius: 10,
    justifyContent: "center",
    width: "auto",
    height: "auto",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  randomDataItem: {
    color: "white",
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
});



export default MainNavigator;