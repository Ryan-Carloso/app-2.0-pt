import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Linking, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Invite = () => {
    const navigation = useNavigation();
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

    const shareApp = async () => {
        // Lógica de compartilhamento (pode incluir a lógica que você já tem)

        // Após compartilhar, você pode abrir o vídeo do YouTube
        openYouTubeVideo();

        // Atualizar o contador e salvar no AsyncStorage
        setSharedCount(sharedCount + 1);
        await AsyncStorage.setItem('sharedCount', (sharedCount + 1).toString());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openYouTubeVideo}>
                <Image
                    source={{ uri: 'https://i.postimg.cc/3Nhhshm3/Thumbnail-clickbait-dinheiro-youtube.png' }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.buttonTextBack}>{"< Voltar"}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 50,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    buttonTextBack: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 40,
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 350,
        height: 175,
        resizeMode: 'cover',
        margin: 30,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,

    },
});

export default Invite;
