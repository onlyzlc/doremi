/* eslint-disable react/prop-types */
import { React } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function IconButton({
  onPress,
  name,
  label,
  size,
  disabled = false,
}) {
  return (
    <View style={[{ width: size }]}>
      <Pressable onPress={onPress} style={[styles.button]} disabled={disabled}>
        <MaterialIcons name={name} size={size / 2} style={styles.icon} />
        {label && <Text style={styles.iconLabel}>{label}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
    color: "#000",
    padding: 8,
  },
  iconLabel: {
    color: "#000",
    textAlign: "center",
  },
});
