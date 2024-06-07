/* eslint-disable react/prop-types */
import { React } from "react";
import { StyleSheet, Text } from "react-native";

export const H1 = ({ title }) => {
  return <Text style={styles.h1}>{title}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    color: "rgb(51, 51, 51)",
    fontSize: 32,
    fontWeight: 500,
    textAlign: "left",
  },
});
