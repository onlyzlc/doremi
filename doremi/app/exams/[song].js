import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// import MusicalStave, { BarNotes, BarLine } from "../../components/MusicalStave";
import { View, Text, StyleSheet } from "react-native";
import { H1, H2 } from "../../components/Header";
import { Colors, Styles } from "../../components/ComStyle";
import Button from "../../components/Button";
import SolfegeRecognition from "../../components/SolfegeRecognition";
import { BarLine, BarNotes } from "../../components/MusicalStave";
import DownBeat from "../../components/Downbeat";
import Stars from "../../components/Stars";
import { read, save, saveExamsResult } from "../../components/Storage";
import { rate2Stars } from "../../components/tools";
const data = {
  song1: import("../../data/song/song1.json"),
  song2: import("../../data/song/song2.json"),
};

export default function Song() {
  const songName = useLocalSearchParams().song;
  const [staveJson, setStaveJson] = useState({
    key: "",
    beats: "",
    beatType: "",
    unit_r: "",
    speed_r: "",
    beatSpeed: 0,
    body: [],
  });
  // 指针存放当前测试的音符的序号
  const [pointer, setPointer] = useState(-1);
  // 记录唱对的每个音符的序号
  const [correctNotes, setCorrectNotes] = useState([]);
  const [timer, setTimer] = useState(null);

  // 加载简谱
  useEffect(() => {
    data[songName].then((json) => setStaveJson(json));
    return () => clearInterval(timer);
  }, [songName]);

  // 拍平，以便查找和计算
  const flatStave = useMemo(() => {
    return staveJson.body.flat(Infinity);
  }, [staveJson]);
  const len = flatStave.length;
  // 1-7 要测试的所有音符
  const solfaArr = flatStave.filter((item) => /[1-7]/.test(item.noteNumber));

  useEffect(() => {
    // console.log("correctNotes:", correctNotes);
    if (pointer >= len) {
      clearInterval(timer);
      // 存档
      saveExamsResult(songName, correctRate);
    }
  }, [pointer]);

  function handleCorrect() {
    setCorrectNotes([...correctNotes, targetNote.noteIndex]);
  }
  function handleMiss() {}
  // 读取简谱
  const start = () => {
    setTimer(
      setInterval(() => {
        setPointer((p) => p + 1);
      }, 60000 / beatSpeed)
    );
  };

  const replay = () => {
    clearInterval(timer);
    setPointer(-1);
    setCorrectNotes([]);
  };

  const { key, beats, beatType, unit_r, speed_r, beatSpeed } = staveJson;
  // console.log(key, beats, beatType, unit_r, speed_r, beatSpeed);
  // 1=C 4/4 qpm=60
  const propsStr = `1=${key} ${beats}/${beatType} ${unit_r}=${speed_r}`;
  const targetNote = flatStave.find(({ noteIndex }) => noteIndex == pointer);
  const correctRate = Math.round((100 * correctNotes.length) / solfaArr.length);
  const starValue = rate2Stars(correctRate);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignContent: "center", paddingTop: 48 }}>
        <H2 title="唱谱测试1" style={{ textAlign: "center" }} />
      </View>

      <View style={Styles.section}>
        <Text style={styles.musicProps}>{propsStr}</Text>
      </View>

      {pointer < 0 && (
        <View style={Styles.section}>
          <DownBeat tempo={beatSpeed} ending={start} time={beats} />
        </View>
      )}

      <View style={[Styles.section, styles.stave]}>
        {staveJson.body.map((bar, index) => {
          return (
            <View style={styles.bar} key={"b" + index}>
              <BarNotes
                barData={bar}
                pointer={pointer}
                correctNotes={correctNotes}
              />
              <BarLine />
            </View>
          );
        })}
      </View>

      {pointer >= 0 && pointer < len && (
        <View style={Styles.section}>
          <SolfegeRecognition
            noteIndex={pointer}
            noteNumber={targetNote && targetNote.noteNumber}
            correct={handleCorrect}
            miss={handleMiss}></SolfegeRecognition>
        </View>
      )}

      {pointer >= len && (
        <View
          style={[
            Styles.section,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}>
          <View style={styles.grades}>
            <Stars value={starValue} size={24} />
            <Text>正确率：{correctRate}%</Text>
          </View>
          <Button title="重新开始" onPress={replay}></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stave: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  bar: {
    flexBasis: "50%",

    flexDirection: "row",
    marginVertical: 16,
  },
  musicProps: {
    fontSize: 16,
  },
  grades: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
