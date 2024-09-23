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

/**
 * 渲染一个音符，包括音符的音阶、倍音符、升降符、附点、减时线，以及音符状态
 * @param {Object} noteObject 音符对象(不含时值)
 * @param {Boolean} isLastBeat 用于判断是否为当前时值里的最后一个音符（以便去掉不必要的减时线长）
 * @param {Number} times 拍数， 0.5=半拍
 * @param {String} status 音符显示状态
 *    "default" : 默认
 *    "miss":    唱错的
 *    "pointing" :当前要唱的
 * @returns 音符组件
 */
export function Note({
  noteObject = {},
  status = "",
  times = 1,
  isLastBeat = false,
  ...props
}) {
  const { presign, noteNumber, overtones, dot, octave, noteIndex } = noteObject;
  // 音符数字样式

  return (
    <View
      style={[
        beatBlock.default,
        status && beatBlock[status],
        props.style,
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
          {noteNumber}
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
        {/* 减时线 (对同一时值最后一个音符的宽度减少, 使其更美观*/}
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
export function BarNotes({
  barData,
  times = 1,
  pointer = 0,
  correctNotes = [],
}) {
  if (typeof barData !== "object") return;
  const listItems = barData.map((beat, index, curArr) => {
    if (Object.hasOwn(beat, "noteNumber")) {
      let status = "";
      if (pointer == beat.noteIndex) status = "pointing";
      else if (
        pointer > beat.noteIndex &&
        !correctNotes.includes(beat.noteIndex)
      )
        status = "miss";
      return (
        <Note
          key={beat.noteIndex}
          noteObject={beat}
          times={times}
          isLastBeat={index == curArr.length - 1}
          status={status}
        />
      );
    } else if (typeof beat === "object" && beat.length > 0) {
      return (
        <BarNotes
          key={"l" + lineIndex++}
          barData={beat}
          times={times * 0.5}
          pointer={pointer}
        />
      );
    }
  });
  return <>{listItems}</>;
}

export function BarLine() {
  return <View style={styles.barLine} />;
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
  pointing: {
    // fontSize: 24,
  },
  miss: {
    color: Colors.red,
  },
});
// 音符外框动态样式
const beatBlock = StyleSheet.create({
  default: {
    borderRadius: 4,
    // paddingHorizontal: 8,
  },
  pointing: {
    backgroundColor: "rgb(255, 192, 60)",
    // borderWidth: 2,
  },
  miss: {},
});

const styles = StyleSheet.create({
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
