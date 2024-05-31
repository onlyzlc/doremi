/* eslint-disable react/prop-types */
import { React, StyleSheet, View, Text } from "react-native";

export default function NoteList({ notes = [], solfa }) {
  return (
    <View style={styles.notesList}>
      {notes.map((n) => (
        <View key={n} style={styles.note}>
          <Text style={{ fontSize: 32, fontWeight: 700, textAlign: "center" }}>
            {n}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 200, textAlign: "center" }}>
            {solfa[n - 1]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "rgb(168, 227, 215)",
    borderTopColor: "rgb(168, 227, 215)",
    backgroundColor: "rgb(229, 249, 245)",
  },
  note: {
    flex: "auto",
  },
});
