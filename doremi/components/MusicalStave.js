import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
import { parse } from "./Parse";

// duration: 时值, 1=1拍, 0.5=半拍...
export function Note({ note = 0, status = "", duration = 1 }) {
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
        noteBoxStyles[status],
        { width: duration * 20 },
      ]}>
      <Text style={[noteStyles.default, noteStyles[status]]}>{note}</Text>
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
{
  /* <b1>
  {" "}
  n{" "}
  <b2>
    {" "}
    n <b4>nn</b4>{" "}
  </b2>{" "}
</b1>; */
}

export function B1({ children }) {
  return <View>{children}</View>;
}

// 输入一个小节,一个元素一拍, [x,x,x,[x,x]]
export function Beat({ barData, times = 1 }) {
  const list = barData.map((beat, index) => {
    if (typeof beat === "string") {
      return <Note key={index} note={beat} duration={times} />;
    } else if (typeof beat === "object") {
      return <Beat key={index} barData={beat} times={times * 0.5} />;
      // renderBar(beat, times * 0.5);
    }
  });
  return <View>{list}</View>;
}

export function Chip(chipData) {
  // chipData.N.map(item=>)
}
export default function MusicalStave({ staveDoc }) {
  const stave = parse(staveDoc);
  stave.body.map((item, index) => <Chip key={index} chipData={item} />);
  return <></>;
}
