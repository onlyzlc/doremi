import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "./ComStyle";
import { View } from "react-native";
import React from "react";

export default function Stars({ value = 5, total = 5, size = 16 }) {
  let _val = value;
  if (!!_val == false) _val = 0;
  const stars = Array.from({ length: total }, (v, i) => {
    if (i < _val)
      return (
        <MaterialIcons name="star" color={Colors.red} size={size} key={i} />
      );
    else
      return (
        <MaterialIcons name="star" color={Colors.light} size={size} key={i} />
      );
  });
  return <View style={{ flexDirection: "row", gap: size / 4 }}>{stars}</View>;
}
