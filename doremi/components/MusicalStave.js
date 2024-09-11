import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
import { parse } from "./Parse";

// 减时线，
function UnderLine({ times }) {
  const line = (
    <View
      style={{ height: 2, backgroundColor: "rgba(0,0,0,40)", marginBottom: 2 }}
    />
  );
  const underLine = [];
  for (let i = 1; i < 1 / times; i = i * 2) {
    underLine.push(line);
  }
  return <>{underLine}</>;
}
// 点
function Dot() {
  return <Text style={{ height: 4 }}>·</Text>;
}

// times:  1=1拍, 0.5=半拍...
export function Note({ noteObject = {}, status = "", times = 1 }) {
  // 音符数字
  const noteStyles = StyleSheet.create({
    default: {
      fontSize: 18,
      color: Colors.main,
      fontWeight: 600,
      textAlign: "left",
      // paddingHorizontal: 8,
    },
    zoom: {
      fontSize: 24,
    },
    wrong: {
      color: Colors.foreground,
    },
    hf1: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
  });
  // 音符外框
  const noteBoxStyles = StyleSheet.create({
    default: {
      height: 40,
      borderRadius: 4,
    },
    zoom: {
      borderColor: "rgb(255, 192, 60)",
      borderWidth: 2,
    },
    wrong: {
      color: Colors.red,
    },
  });

  // 高音点
  const highDot = [];
  if (noteObject.octave > 0) {
    for (let i = 0; i < noteObject.octave; i++) {
      highDot.push(<Dot />);
    }
  }
  // 低音点
  const lowDot = [];
  if (noteObject.octave < 0) {
    for (let i = 0; i < -noteObject.octave; i) {
      lowDot.push(<Dot />);
    }
  }
  return (
    <View
      style={[
        noteBoxStyles.default,
        status && noteBoxStyles[status],
        { flexGrow: times, flexBasis: 14 },
      ]}>
      {highDot.length && highDot}
      <Text style={[noteStyles.default, status && noteStyles[status]]}>
        {noteObject.note}
      </Text>
      <UnderLine times={times} />
      {lowDot.length && lowDot}
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
    if (Object.hasOwn(beat, "note")) {
      return <Note key={"n" + noteIndex++} noteObject={beat} times={times} />;
    } else if (typeof beat === "object" && beat.length > 0) {
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
// 输入: [ [ {}, {}, {}, {} ], [ ... ] ]
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
    flex: 0.25, //4节一行
  },
  noteLine: {
    flexDirection: "row",
  },
});
