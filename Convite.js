import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView } from "react-native";
import { View, TouchableOpacity, Text, Linking, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from "react-router-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



function Convite() {

  const [sharedCount, setSharedCount] = useState(0);

  useEffect(() => {
      const loadSharedCount = async () => {
          try {
              const value = await AsyncStorage.getItem('sharedCount');
              if (value !== null) {
                  setSharedCount(parseInt(value, 10));
              }
          } catch (error) {
              console.error('Erro ao carregar o contador compartilhado:', error.message);
          }
      };

      loadSharedCount();
  }, []);

  const openYouTubeVideo = () => {
      Linking.openURL('#');
  };
  const shareApp = () => {
    const message = "🎉 Você foi convidado para jogar um jogo incrível e ganhar dinheiro! 🎉\n\n" +
                    "📱Baixe o nosso aplicativo gratuito agora:\n" +
                    "https://bit.ly/BAIXAR-JOGO-GRATIS\n\n" +
                    "✨ Por que você vai adorar nosso jogo: ✨\n\n" +
                    "🎮 Jogue e ganhe dinheiro todos os dias!\n\n" +
                    "💰 Depósitos instantâneos e retiradas seguras!\n\n" +
                    "🤝 Convide amigos e ganhe bônus incríveis!\n\n" +
                    "🔥 Desbloqueie bonus incriveis de até R$ 1500! e mais de 100% de bonus ao primeiro deposito!\n\n" +
                    "Assista a este vídeo para aprender como jogar: [Inserir link do vídeo explicativo]\n\n" +
                    "Não perca tempo, venha se divertir e ganhar dinheiro agora! 🚀🎉";

    const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappURL)
        .then(() => {
            // Atraso de 10 minutos (600000 milissegundos)
            setTimeout(() => {
                // Após 10 minutos, atualize o contador e salve no AsyncStorage
                setSharedCount(sharedCount + 1);
                AsyncStorage.setItem('sharedCount', (sharedCount + 1).toString());
            }, 600000);
        })
        .catch((error) => {
            console.error('Erro ao abrir o WhatsApp:', error);
        });
};

return(
  <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.backButton}>
   <Link to="/">
  <Text style={styles.buttonTextBack}>{"< Voltar"}</Text>
  </Link> 
     </TouchableWithoutFeedback>

  <TouchableOpacity style={styles.image1} onPress={openYouTubeVideo}>
      <Image
          source={{ uri: 'https://i.postimg.cc/3Nhhshm3/Thumbnail-clickbait-dinheiro-youtube.png' }}
          style={styles.image}
      />
  </TouchableOpacity>
  
  <Text style={styles.descriptionText}>
    Como? Simples, Quanto mais pessoas jogarem, mais inteligente o App fica, e acerta mais chutes.
  </Text>
  <Text style={styles.descriptionText}>
      Vamos recompensar você com melhores chutes se você convidar mais pessoas.
  </Text>
  <Text style={styles.sharedCountText}>
      Pessoas convidadas: {sharedCount}/20
  </Text>
  <Text style={styles.additionalInfoText}>
      Cada usuário que você convida aumenta suas chances em 1x! Convide 20 pessoas e ganhe 20x mais!
  </Text>
  <TouchableOpacity onPress={shareApp} style={styles.shareButton}>
      <Text style={styles.buttonText}>Compartilhar no WhatsApp</Text>
  </TouchableOpacity>
  <Text style={styles.additionalInfoText1}>
      Convide seus Amigos para jogar com esse app Gratuito e ganhe mais!
  </Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'black',
padding: 50,
},
backButton: {},
buttonTextBack: {
color: 'white',
fontSize: 20,
fontWeight: 'bold',
textAlign: 'left',
},
descriptionText: {
color: 'white',
fontSize: 20,
marginBottom: 15,
textAlign: 'center',
},
sharedCountText: {
color: 'white',
fontSize: 20,
marginBottom: 30,
textAlign: 'center',
},
additionalInfoText: {
color: 'white',
fontSize: 16,
marginBottom: 20,
textAlign: 'center',
},
additionalInfoText1: {
color: 'white',
fontSize: 16,
marginTop: 20,
textAlign: 'center',
},
shareButton: {
backgroundColor: '#25D366',
padding: 15,
marginTop: 20,
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 15,
},
buttonText: {
color: 'white',
fontSize: 20,
fontWeight: 'bold',
textAlign: 'center',
},
image: {
width: 400,
height: 190,
resizeMode: 'cover',
margin: 30,
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 20,
},
image1: {
  alignItems: 'center',

  
}
});

export default Convite;

/*
    return (
      <SafeAreaView>
        <Link to="/" component={Pressable}>
          <Text>ESSA É A indique e ganhe!</Text>
        </Link>
      </SafeAreaView>
    );
  }

export default Convite; */