import { router, Slot } from "expo-router";
import { React } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";

export default function BasicRoot() {
  return (
    <SafeAreaView>
      <IconButton name="close" onPress={() => router.replace("/")}></IconButton>
      <Slot></Slot>
    </SafeAreaView>
  );
}
