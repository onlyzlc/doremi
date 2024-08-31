import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
// N: ||: 3 1 (33) 1 | (33) (56) 5 - | (66) (65) (44) 4 | (23) (21) 2 - |
// const data = [[[[x,xx],xx,x,x],xxxx],[x,x,x,x]]

function parse(notes) {
  // 结构
  // 重复段
  // -行*
  // --小节*
  // ---连拍
  // ----连音
  // notes.map
}

function Note({ note = 0, status = "" }) {
  const noteStyles = StyleSheet.create({
    default: {
      fontSize: 16,
      color: Colors.main,
    },
    zoom: {
      fontSize: 24,
    },
    wrong: {
      color: Colors.foreground,
    },
  });

  const noteBoxStyles = StyleSheet.create({
    default: {
      borderRadius: 4,
      width: 30,
      height: 40,
    },
    zoom: {
      borderStyle: "2px solid rgb(255, 192, 60)",
    },
    wrong: {
      color: Colors.red,
    },
  });

  return (
    <View style={[noteBoxStyles.default, noteBoxStyles[status]]}>
      <Text style={[noteStyles.default, noteStyles[status]]}>{note}</Text>
    </View>
  );
}

export default function MusicalStave({ name, artist, key, speed, notes }) {
  return notes.map;
}
