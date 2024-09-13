import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
import { parse } from "./Parse";

import Svg, { Circle } from "react-native-svg";
// 点
const Dot = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={2}
    height={2}
    fill="none"
    style={{ padding: 1 }}
    {...props}>
    <Circle cx={1} cy={1} r={1} fill="#412344" />
  </Svg>
);

// 减时线组合
function UnderLine({ times, width = "auto" }) {
  const underLine = [];
  for (let i = 1; i < 1 / times; i = i * 2) {
    underLine.push(
      <View
        key={i}
        style={{
          width: width,
          height: 2,
          backgroundColor: "rgba(0,0,0,40)",
          marginBottom: 2,
        }}
      />
    );
  }
  return underLine;
}
// 点组合
function Dots({ number = 0 }) {
  const dots = [];
  for (let i = 0; i < number; i++) {
    dots.push(<Dot key={i} />);
  }
  return dots;
}

// times:  1=1拍, 0.5=半拍...
export function Note({
  noteObject = {},
  status = "",
  times = 1,
  isLastBeat = false,
}) {
  const { presign, note, overtones, dot, octave, index } = noteObject;
  // 音符数字样式

  return (
    <View
      style={[
        beatBlock.default,
        status && beatBlock[status],
        { flexGrow: times, flexBasis: 16 },
      ]}>
      {/* 上部(高音点,升降符,数字) */}
      <View style={styles.noteTop}>
        {/* 高音点 */}
        {octave > 0 && (
          <View style={styles.highDot}>
            <Dots number={octave} />
          </View>
        )}
        {/* 音符数字 */}
        <Text style={[noteStyles.default, status && noteStyles[status]]}>
          {note}
        </Text>
        {/* 升降符 */}
        <Text style={styles.presign}>{presign}</Text>
        {/* 附点 */}
        {dot !== "" && (
          <View style={styles.dot}>
            <Dot />
          </View>
        )}
      </View>
      {/* 下部(减时线,低音点) */}
      <View style={styles.noteBottom}>
        {/* 减时线 */}
        {times < 1 && (
          <UnderLine times={times} width={isLastBeat ? 16 : "auto"} />
        )}
        {/* 低音点 */}
        {octave < 0 && (
          <View style={styles.lowDot}>
            <Dots number={-octave} />
          </View>
        )}
      </View>
    </View>
  );
}

let lineIndex = 0;
export function BarNotes({ barData, times = 1 }) {
  if (typeof barData !== "object") return;
  const listItems = barData.map((beat, index, curArr) => {
    if (Object.hasOwn(beat, "note")) {
      return (
        <Note
          key={beat.index}
          noteObject={beat}
          times={times}
          isLastBeat={index == curArr.length - 1}
        />
      );
    } else if (typeof beat === "object" && beat.length > 0) {
      return (
        <BarNotes key={"l" + lineIndex++} barData={beat} times={times * 0.5} />
      );
    }
  });
  return <>{listItems}</>;
}

function BarLine() {
  return <View style={styles.barLine} />;
}

let barIndex = 0;
// 输入: [ [ {}, {}, {}, {} ], [ ... ] ]
export function Chip({ chipData }) {
  // console.log("Chip输入:", chipData);
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

/** 样式 **/

// 音符数字动态样式
const noteStyles = StyleSheet.create({
  default: {
    fontSize: 18,
    color: Colors.main,
    fontWeight: 600,
    textAlign: "center",
  },
  zoom: {
    fontSize: 24,
  },
  wrong: {
    color: Colors.foreground,
  },
});
// 音符外框动态样式
const beatBlock = StyleSheet.create({
  default: {
    borderRadius: 4,
    // paddingHorizontal: 8,
  },
  zoom: {
    borderColor: "rgb(255, 192, 60)",
    borderWidth: 2,
  },
  wrong: {
    color: Colors.red,
  },
});

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    flex: 0.25, //4节一行
  },
  noteLine: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  highDot: {
    position: "absolute",
    height: 16,
    top: -16,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  lowDot: {
    width: 16,
    height: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  presign: {
    position: "absolute",
    left: -10,
    width: 12,
    textAlign: "right",
    fontSize: 10,
  },
  dot: {
    position: "absolute",
    left: 16,
    bottom: 4,
  },
  noteTop: { width: 16, alignItems: "center" },
  noteBottom: {
    position: "absolute",
    top: "100%",
    width: "100%",
  },
  barLine: {
    width: 2,
    marginHorizontal: 8,
    backgroundColor: "rgba(0,0,0,40)",
  },
});
