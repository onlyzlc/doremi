/* eslint-disable react/prop-types */
import { React } from "react";
import { StyleSheet, Text } from "react-native";

export const H1 = ({ title, ...props }) => {
  return <Text style={[styles.header, styles.h1, props.style]}>{title}</Text>;
};
export const H2 = ({ title, ...props }) => {
  return <Text style={[styles.header, styles.h2, props.style]}>{title}</Text>;
};
export const H3 = ({ title, ...props }) => {
  return <Text style={[styles.header, styles.h3, props.style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  header: {
    color: "rgb(51, 51, 51)",
    fontWeight: 500,
    textAlign: "left",
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 16,
  },
});
