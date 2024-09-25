import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "./ComStyle";
import { View } from "react-native";
import React from "react";

export default function Stars({ value = 5, total = 5, size = 16 }) {
  const stars = Array.from({ length: total }, (v, i) => {
    if (i < value)
      return (
        <MaterialIcons name="star" color={Colors.red} size={size} key={i} />
      );
    else
      return (
        <MaterialIcons
          name="star"
          color={Colors.foreground}
          size={size}
          key={i}
        />
      );
  });
  return <View style={{ flexDirection: "row", gap: size / 4 }}>{stars}</View>;
}
