import { router, Slot } from "expo-router";
import { React } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { View } from "react-native";
import { Colors, Styles } from "../../components/ComStyle";
// import { LinearGradient } from "expo-linear-gradient";

export default function BasicRoot() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ position: "absolute", right: 0, zIndex: 100 }}>
        <IconButton
          name="close"
          onPress={() => router.replace("/")}></IconButton>
      </View>
      <Slot></Slot>
    </SafeAreaView>
  );
}
