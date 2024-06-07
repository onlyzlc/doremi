/* eslint-disable react/prop-types */
import { React } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Colors } from "./ComStyle";

export default function Button({ title, theme, onPress }) {
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
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: 120,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.cantrol,
  },
  buttonLabel: {
    color: Colors.foreground,
    fontSize: 16,
  },
  buttonIcon: {
    paddingLeft: 8,
  },
});
