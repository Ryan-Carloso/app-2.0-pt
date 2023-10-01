import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import RandomColorButton from "./RandomColorButton";
import Notify from "./Notify";

const SegundaTela = ({ navigation }) => {
  const websiteUrl = "https://afonsocosta.shop/penalty/game/game";

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.button}>
        <Notify />
        <View style={styles.backButtonText}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{"< Voltar"}</Text>
          </TouchableOpacity>
        </View>

        <RandomColorButton />
        
      </SafeAreaView>
      <WebView source={{ uri: websiteUrl }}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1E23",

  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1E23",

  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButtonText: {
    color: "white",
    fontSize: 22,
    paddingLeft: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  backButton: {
    textAlign: "left",
    flexDirection: "row",
  },
  web: {
    backgroundColor: "#1B1E23",
  }
});

export default SegundaTela;
