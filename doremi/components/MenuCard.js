import { View, Text, Pressable } from "react-native";
import { Styles, Fonts, Colors } from "./ComStyle";
import { React } from "react";

export default function MenuCard({ title = "", onPress, children }) {
  return (
    <Pressable onPress={onPress} style={[Styles.card]}>
      <Text style={Fonts.h3}>{title}</Text>
      {children}
    </Pressable>
  );
}
