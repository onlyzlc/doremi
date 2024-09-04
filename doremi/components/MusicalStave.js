import { StyleSheet, View, Text } from "react-native";
import { React } from "react";
import { Colors } from "./ComStyle";
// N: ||: 3 1 (33) 1 | (33) (56) 5 - | (66) (65) (44) 4 | (23) (21) 2 - |
// P: 1=C 4/4
// ---
// N: 1 1 5 5 | 6 6 5 - | 4 4 3 3 | 2 2 1 - |
// ---
// N: 5 5 4 4 | 3 3 2 - | 5 5 4 4 | 3 3 2 - |
// N: 5 5 4 4 | 3 3 2 - | 5 5 4 4 | 3 3 2 - |
// ---
// N: 1 1 5 5 | 6 6 5 - | 4 4 3 3 | 2 2 1 - |
const rowData = [
  // 层1：乐句
  [
    // 2层：小节
    [
      [
        // 3层：半拍
        x,
        xx,
      ],
      xx,
      x,
      x,
    ],
    xxxx,
  ],
  [x, x, x, x],
];

// 解析小节
const bar = ["1", "2", "(", "3", "4", ")", "5"];

function parseBar(strArr = []) {
  console.log("输入:", strArr);
  // 输入的数组在下面的操作中会逐步缩短, 故需先记录其长度用于循环判断
  const l = strArr.length;
  // 每层输出
  const beat = [];
  for (let i = 0; i < l; i++) {
    if (strArr.length === 0) break;
    console.log("处理:", strArr[0]);
    if (strArr[0] === "(") {
      strArr.shift();
      const subBeat = parseNote(strArr);
      beat.push(subBeat);
    } else if (strArr[0] === ")") {
      strArr.shift();
      // 结束循环
      break;
    } else if (strArr[0] !== undefined) {
      beat.push(strArr.shift());
    }
  }
  console.log("输出:", beat);
  return beat;
}

// 解析单行(以N:开头)
function parseNoteline(lineString = "") {
  if (!lineString.startsWith("N:")) return [];
  // " N: 1e. (2) (34) (5 (67)) | 1 2 3 - |||  "
  let l = lineString.substring(2).trim();
  // "1e. (2) (34) (5 (67)) | 1 2 3 - |||"
  if (l.endsWith("||")) {
    l = lineString.slice(0, -2);
    // "1e. (2) (34) (5 (67)) | 1 2 3 - |"
  }
  const barStrArr = l.split("|");
  // ["1e. (2) (34) (5 (67)) " , "1 2 3 - " ]
  const noteLine = barStrArr.map((barStr) => {
    // 正则表达式: 匹配部分常规音符
    const _barArr = barStr.match(/[\(\)\-\~]|([0-9]|[XYZ_])[ed]?\.?/g);
    // "1e. (2) (34) (5 (67)) " => ["1e.","(","2",")","(","3","4",")","(","5","(","6","7",")",")",]
  });
}

function parse(rowData = "") {
  // 结构
  // 重复段
  // -行*
  // --小节*
  // ---连拍
  // ----连音
  if (typeof rowData != "string") return false;
  const sections = rowData.split(/^\-+/gm);
  const chips = sections.map((sec) => {
    noteLine: sec.match(/^N:.+/gm);
  });
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
