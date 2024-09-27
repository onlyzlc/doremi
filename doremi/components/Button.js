/* eslint-disable react/prop-types */
import { React } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Colors } from "./ComStyle";

export default function Button({ title, theme, onPress, disabled, ...props }) {
  if (theme == "primary") {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button, { backgroundColor: "#0A59F7" }]}
          onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> {title}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress} {...props}>
        <Text style={styles.buttonLabel}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: 120,
    minHeight: 60,
  },
  button: {
    borderRadius: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.secBackground,
  },
  buttonLabel: {
    color: Colors.main,
    fontSize: 16,
    textAlign: "center",
  },
  buttonIcon: {
    paddingLeft: 8,
  },
});
