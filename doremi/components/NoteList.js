/* eslint-disable react/prop-types */
import { React } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "./ComStyle";

export default function NoteList({ notes, solfa }) {
  const noteList = notes.map((n) => (
    <View key={n}>
      <Text style={styles.note}>{n}</Text>
      <Text style={styles.solfa}>{solfa[n - 1]}</Text>
    </View>
  ));
  return <View style={styles.notesList}>{noteList}</View>;
}

const styles = StyleSheet.create({
  note: {
    fontSize: 32,
    fontWeight: 500,
    textAlign: "center",
    color: Colors.main,
  },
  solfa: {
    fontSize: 24,
    fontWeight: 300,
    textAlign: "center",
    color: Colors.main,
  },
  notesList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    flex: "none",
    flexGrow: 0,
    // marginVertical: 50,
    paddingHorizontal: 16,
    paddingVertical: 48,
    backgroundColor: Colors.light,
  },
});
