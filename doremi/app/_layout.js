import "expo-dev-client";
import { Slot, Stack } from "expo-router";
import { React } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Styles } from "../components/ComStyle";

export default function RootLayout() {
  return (
    <SafeAreaView style={Styles.screen}>
      <StatusBar style="auto" hidden={false} />
      <Slot></Slot>
    </SafeAreaView>
  );
}
