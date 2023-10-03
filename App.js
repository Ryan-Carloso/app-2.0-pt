import React from "react";
import { Text, Pressable, SafeAreaView } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import Home from "./home";
import SegundaTela1 from "./SegundaTela1";
import Convite from "./Convite";






export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SegundaTela1" element={<SegundaTela1 />} />
        <Route path="/Convite" element={<Convite />} />
      </Routes>
    </NativeRouter>
  );
}
