import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// import MusicalStave, { BarNotes, BarLine } from "../../components/MusicalStave";
import { View, Text, StyleSheet } from "react-native";
import { H1 } from "../../components/Header";
import { Colors, Styles } from "../../components/ComStyle";
import Button from "../../components/Button";
import SolfegeRecognition from "../../components/SolfegeRecognition";
import { BarLine, BarNotes } from "../../components/MusicalStave";
import DownBeat from "../../components/Downbeat";
const data = {
  song1: import("../../data/song1.json"),
  song2: import("../../data/song2.json"),
};

export default function Song() {
  function handleCorrect() {}
  function handleMiss(number) {
    setMissNotes([...missNotes, number]);
    console.log("miss:", number);
  }
  const songName = useLocalSearchParams().song;
  const [staveJson, setStaveJson] = useState({ length: 0, body: [] });
  // 指针存放当前测试的音符的序号
  const [pointer, setPointer] = useState(-1);
  // 记录唱错的每个音符的序号
  const [missNotes, setMissNotes] = useState([]);
  const [timer, setTimer] = useState(null);
  const [status, setStatus] = useState("init");
  // 读取简谱
  useEffect(() => {
    data[songName].then((json) => setStaveJson(json));
  }, []);
  // 关闭定时
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  // 结构谱拍平，以便查找
  const flatStave = useMemo(() => {
    return staveJson.body.flat(Infinity);
  }, [staveJson]);

  const start = () => {
    setStatus("playing");
    setTimer(
      setInterval(() => {
        setPointer((p) => p + 1);
      }, 2000)
    );
  };

  console.log("pointer:", pointer);
  if (pointer >= staveJson.length) {
    clearInterval(timer);
    setPointer(-1);
    setStatus("init");
  }

  const targetNote = flatStave.find(({ index }) => index == pointer);
  return (
    <View>
      <View style={Styles.titleBar}>
        <H1 title="唱谱" />
      </View>
      <View style={Styles.section}>
        <DownBeat />
      </View>
      <View style={[Styles.section, styles.stave]}>
        {staveJson.body.map((item, index) => {
          return (
            <View style={styles.bar} key={"b" + index}>
              <BarNotes
                barData={item}
                pointer={pointer}
                missNotes={missNotes}
              />
              <BarLine />
            </View>
          );
        })}
      </View>
      <View style={Styles.section}>
        {status == "playing" && (
          <SolfegeRecognition
            number={pointer}
            note={targetNote && targetNote.note}
            correct={handleCorrect}
            miss={handleMiss}></SolfegeRecognition>
        )}
      </View>
      {/* <View>
        {status != "playing" && <Button title="开始" onPress={start} />}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  stave: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bar: {
    flexDirection: "row",
    flexBasis: "50%",
    marginVertical: 16,
  },
});
