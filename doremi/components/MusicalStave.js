import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
import { parse } from "./Parse";
import { type } from "@testing-library/react-native/build/user-event/type";

// times:  1=1拍, 0.5=半拍...
export function Note({ note = 0, status = "", times = 1 }) {
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
      // width: 30,
      height: 40,
      borderRadius: 4,
    },
    zoom: {
      borderStyle: "2px solid rgb(255, 192, 60)",
    },
    wrong: {
      color: Colors.red,
    },
  });

  return (
    <View
      style={[
        noteBoxStyles.default,
        status && noteBoxStyles[status],
        { width: times * 20 },
      ]}>
      <Text style={[noteStyles.default, status && noteStyles[status]]}>
        {note}
      </Text>
    </View>
  );
}
// {
//   properties: "",
//   body: [
//     { //chip
//       N: [[小节],[x,x,x,[半拍]]],
//       lc1: [],
//       lc2: [],
//     },
//   ],
// };
// b1:1拍  b2:半拍  b4:四分之一拍  b8:八分之一拍

let noteIndex = 0;
export function BarNotes({ barData, times = 1 }) {
  if (typeof barData !== "object") return;
  const listItems = barData.map((beat) => {
    if (typeof beat === "string") {
      return <Note key={"n" + noteIndex++} note={beat} duration={times} />;
    } else if (typeof beat === "object") {
      return (
        <BarNotes
          key={"n" + noteIndex + "." + times}
          barData={beat}
          times={times * 0.5}
        />
      );
    }
  });
  return <>{listItems}</>;
}

function BarLine() {
  return <Text>|</Text>;
}

let barIndex = 0;
// 输入: [ [ '1', '2', '3', '4' ], [ '1', '2', '3', '4' ] ]
export function Chip({ chipData }) {
  console.log("Chip输入:", chipData);
  if (typeof chipData !== "object") return;
  const listItems = chipData.map((bar) => (
    <View style={styles.bar} key={"b" + barIndex++}>
      <BarNotes barData={bar} />
      <BarLine />
    </View>
  ));
  return <View style={styles.noteLine}>{listItems}</View>;
}

let chipIndex = 0;
export default function MusicalStave({ staveDoc }) {
  const stave = parse(staveDoc);
  if (typeof stave !== "object") return;
  const listItems = stave.body.map((item) => {
    return item.N && <Chip key={"c" + chipIndex++} chipData={item.N} />;
  });
  return <View>{listItems}</View>;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
  },
  noteLine: {
    flexDirection: "row",
  },
});
