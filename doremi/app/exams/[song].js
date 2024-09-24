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
const data = {
  song1: import("../../data/song1.json"),
  song2: import("../../data/song2.json"),
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
    length: 0,
    body: [],
  });
  // 指针存放当前测试的音符的序号
  const [pointer, setPointer] = useState(-1);
  // 记录唱错的每个音符的序号
  const [correctNotes, setCorrectNotes] = useState([]);
  const [timer, setTimer] = useState(null);
  function handleCorrect() {
    setCorrectNotes([...correctNotes, targetNote.noteIndex]);
  }
  function handleMiss() {}
  // 读取简谱
  useEffect(() => {
    data[songName].then((json) => setStaveJson(json));
  }, [songName]);
  // 关闭定时
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);
  useEffect(() => {
    // console.log("correctNotes:", correctNotes);
    if (pointer >= length) {
      clearInterval(timer);
    }
  }, [pointer]);

  // 结构谱拍平，以便查找
  const flatStave = useMemo(() => {
    return staveJson.body.flat(Infinity);
  }, [staveJson]);

  const start = () => {
    setTimer(
      setInterval(() => {
        setPointer((p) => p + 1);
      }, 60000 / beatSpeed)
    );
  };

  // p<0 未开始 && isPause
  // 0<=p<l 进行中 && isPause
  // p>=0 已结束
  const { key, beats, beatType, unit_r, speed_r, beatSpeed, length } =
    staveJson;
  // console.log(key, beats, beatType, unit_r, speed_r, beatSpeed, length);

  // 1=C 4/4 qpm=60
  const propsStr = `1=${key} ${beats}/${beatType} ${unit_r}=${speed_r}`;
  const targetNote = flatStave.find(({ noteIndex }) => noteIndex == pointer);
  return (
    <View>
      <View style={{ alignContent: "center", paddingTop: 48 }}>
        <H2 title="唱谱测试1" style={{ textAlign: "center" }} />
      </View>

      <Text style={styles.musicProps}>{propsStr}</Text>

      {pointer < 0 && (
        <View style={Styles.section}>
          <DownBeat tempo={beatSpeed} start={start} time={beats} />
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

      {pointer >= 0 && pointer < length && (
        <View style={Styles.section}>
          <SolfegeRecognition
            noteIndex={pointer}
            noteNumber={targetNote && targetNote.noteNumber}
            correct={handleCorrect}
            miss={handleMiss}></SolfegeRecognition>
        </View>
      )}
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
  musicProps: {
    fontSize: 16,
  },
});
