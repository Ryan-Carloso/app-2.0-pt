import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Clipboard, ToastAndroid, View } from 'react-native';

const RandomColorButton = () => {
  const iconesIniciais = ["🧤", "🧤", "🧤", "🧤", "🧤"];
  const [arrayIcones, setArrayIcones] = useState([...iconesIniciais]);
  const [podeClicarBotao, setPodeClicarBotao] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(13);
  const [textoBotao, setTextoBotao] = useState('PRÓXIMA PARTIDA');

  const substituirIcone = () => {
    if (podeClicarBotao) {
      const novoArray = [...arrayIcones];
      const indiceAleatorio = Math.floor(Math.random() * novoArray.length);
      novoArray[indiceAleatorio] = "⚽️";
      setArrayIcones(novoArray);
      setPodeClicarBotao(false);
      setTempoRestante(13);
      iniciarCronometro(); // Inicia o cronômetro
      setTextoBotao(`Novo jogo em ${tempoRestante}`); // Atualiza o texto do botão
    }
  };

  const iniciarCronometro = () => {
    const timer = setInterval(() => {
      setTempoRestante(tempoAnterior => {
        if (tempoAnterior <= 1) {
          clearInterval(timer);
          setPodeClicarBotao(true);
          setArrayIcones([...iconesIniciais]);
          setTextoBotao('PRÓXIMA PARTIDA');
          return 0;
        }
        setTextoBotao(`Novo jogo em ${tempoAnterior - 1}`);
        return tempoAnterior - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>|{arrayIcones[0]}{arrayIcones[1]}{arrayIcones[2]}|</Text>
      <Text style={styles.texto}>|{arrayIcones[3]}🧍🏻{arrayIcones[4]}|</Text>
      <TouchableOpacity
        style={[styles.botao, !podeClicarBotao && styles.botaoDesativado]}
        onPress={substituirIcone}
        disabled={!podeClicarBotao}
      >
        <Text style={styles.textoBotao}>{textoBotao}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
    
  },
  texto: {
    fontSize: 23,
    marginBottom: 3,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

  botao: {
    backgroundColor: '#50DB55',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 1,
    
  },
  textoBotaoYT: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },


  botaoDesativado: {
    backgroundColor: 'gray',
  },
});

export default RandomColorButton;
