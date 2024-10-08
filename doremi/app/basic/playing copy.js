/* eslint-disable react/prop-types */
import { React, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { H1 } from "../../components/Header";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteList from "../../components/NoteList";
import Animated, {
  SlideInRight,
  SlideOutLeft,
  BounceIn,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import SpeechRecognition from "../../components/SpeechRecognition";
import * as Progress from "react-native-progress";
import { Svg_Complete } from "../../components/SvgIcons";
import { Colors } from "../../components/ComStyle";
import TestVoice from "../../components/TestVoice";

const solfa = ["do", "re", "mi", "fa", "sol", "la", "si"];

function Question({ note }) {
  return (
    <View style={styles.note}>
      <Text
        style={{
          color: Colors.main,
          fontSize: 280,
          fontWeight: 500,
          textAlign: "center",
        }}>
        {note}
      </Text>
    </View>
  );
}

export default function App() {
  const totalCount = 3;
  // 完成数量
  const [completed, setCompleted] = useState(0);
  // 音符组
  const [noteGroup, setNoteGroup] = useState([]);
  // 启动状态
  const [practiceStatus, setPracticeStatus] = useState("setting");
  // 答错次数，练习过程中连续答错3次后答案
  const [wrongTimes, setWrongTimes] = useState(0);
  // 练习时生成的音符序列，最后一个数字即当前音符
  const [noteString, setNoteString] = useState([1]);

  let currentNote = noteString[noteString.length - 1];

  // 随机生成一组不重复的音符
  const generateGroup = (length = 3) => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    let newArr = [];
    for (let i = 0; i < length; i++) {
      // 从1~7中随机取出一个加入到新数组中
      newArr = newArr.concat(
        arr.splice(Math.floor(Math.random() * (7 - i)), 1)
      );
    }
    return newArr.sort((a, b) => a - b);
  };
  // 读取存储
  if (noteGroup.length === 0) {
    // 教训：更新状态一定要有事件或条件，否则将死循环（因为每次更新状态都会触发所在组件重新执行和渲染）
    AsyncStorage.getItem("lastStatus")
      .then((value) => {
        if (value != null) {
          // 按上一次练习的音符组数量重新生成一组音符
          const l = JSON.parse(value).noteGroup.length;
          setNoteGroup(generateGroup(l));
        } else {
          setNoteGroup([1, 4, 7]);
        }
      })
      .catch((e) => console.error(e));
  }

  const addNote = () => setNoteGroup(generateGroup(noteGroup.length + 1));
  const subtractNote = () => setNoteGroup(generateGroup(noteGroup.length - 1));
  const changeNotes = () => setNoteGroup(generateGroup(noteGroup.length));

  // 从音符组中随机取一个
  const nextNote = (group) => group[Math.floor(Math.random() * group.length)];
  // 启动训练
  const practice = () => {
    const next = nextNote(noteGroup);
    console.log("*next:" + next);
    setNoteString([next]);
    setPracticeStatus("practicing");
    // 存储
    AsyncStorage.setItem("lastStatus", JSON.stringify({ noteGroup })).catch(
      (e) => console.error(e)
    );
  };

  const showNextNote = () => {
    setWrongTimes(0);
    console.log(`*已完成音符:` + noteString);
    if (completed < totalCount - 1) {
      // 如果没有练完,就计算下一个音符
      const next = nextNote(noteGroup);
      console.log("*next:" + next);
      setNoteString([...noteString, next]);
    } else {
      // 如果练完了,就显示完成图标,短暂停留后自动跳回设置页面
      setPracticeStatus("done");
      setTimeout(() => {
        setPracticeStatus("setting");
        setCompleted(0);
      }, 1000);
      changeNotes();
    }
    return false;
  };

  const handleCorrect = () => {
    setCompleted(completed + 1);
    setTimeout(showNextNote, 500);
  };

  // 音符动画(缓入缓出除外)
  const offset = useSharedValue(0);
  const noteAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  // 摇摆动画
  const handleMiss = () => {
    setWrongTimes((n) => n + 1);
    const time = 40,
      x = 50;
    offset.value = withSequence(
      withTiming(-x, { duration: time, easing: Easing.out(Easing.quad) }),
      withRepeat(
        withTiming(x, {
          duration: time * 2,
          easing: Easing.inOut(Easing.quad),
        }),
        3,
        true
      ),
      withTiming(0, { duration: time, easing: Easing.out(Easing.quad) })
    );
  };

  const exit = () => {
    setWrongTimes(0);
    setCompleted(0);
    setPracticeStatus("setting");
  };

  return (
    <View style={[styles.container]}>
      {/* 设置界面 */}
      {practiceStatus == "setting" && (
        <View style={styles.content}>
          <View style={styles.titleBar}>
            <H1 title="唱名训练" />
          </View>
          {/* 音符展示区 */}
          <View style={styles.topic}>
            <NoteList notes={noteGroup} solfa={solfa} />
            {/* 控制按钮 */}
            <View style={styles.controlBar}>
              <IconButton
                onPress={addNote}
                disabled={noteGroup.length >= 7}
                name="add"
                label="增加"
              />
              <IconButton
                onPress={subtractNote}
                disabled={noteGroup.length <= 3}
                name="remove"
                label="减少"
              />
              <IconButton
                onPress={changeNotes}
                disabled={noteGroup.length == 7}
                name="refresh"
                label="换一组"
              />
            </View>
          </View>
          {/* 启动按钮 */}
          <View style={styles.buttonBar}>
            <Button title="练习" onPress={practice} />
          </View>
        </View>
      )}
      {/* 练习界面 */}
      {practiceStatus == "practicing" && (
        <View style={styles.content}>
          {/* 顶部栏进度条、关闭按钮 */}
          <View style={styles.titleBar}>
            <Progress.Bar
              width={200}
              height={16}
              borderRadius={8}
              borderWidth={0}
              color={Colors.secondary}
              unfilledColor={Colors.light}
              progress={completed / totalCount}
            />

            <IconButton name="close" size={64} onPress={exit} />
          </View>

          {/* 音符展示区 */}
          <View style={styles.topic}>
            {/* todo: 退出训练时，不需要动画 */}
            <Animated.View
              style={[noteAnimStyle]}
              key={noteString.length}
              exiting={SlideOutLeft.easing(
                Easing.bezier(0.19, 0.19, 0.03, 0.97)
              )}
              entering={SlideInRight.easing(
                Easing.bezier(0.19, 0.19, 0.03, 0.97)
              )}>
              <Question note={currentNote} />
            </Animated.View>
            {/* 答案提示 */}
            <View style={styles.answer}>
              {wrongTimes >= 3 && (
                <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
                  <Text
                    style={{
                      fontSize: 48,
                      fontWeight: 200,
                      textAlign: "center",
                    }}>
                    {solfa[currentNote - 1]}
                  </Text>
                </Animated.View>
              )}
            </View>
          </View>
          {/* 语音识别和反馈 */}
          <View style={styles.speech}>
            <SpeechRecognition
              solfa={solfa}
              noteString={noteString}
              correct={handleCorrect}
              miss={handleMiss}>
              <View style={styles.buttonBar}>
                <Button title="下一个" onPress={showNextNote}></Button>
                <Button title="错误" onPress={handleMiss}></Button>
              </View>
            </SpeechRecognition>
          </View>
        </View>
      )}
      {/* 完成界面 */}
      {practiceStatus == "done" && (
        <Animated.View
          style={styles.centerBox}
          entering={BounceIn.delay(100).duration(400)}>
          <Svg_Complete fill={Colors.secondary} size={200} />
        </Animated.View>
      )}
      {/* 测试语音识别 */}
      {practiceStatus == "test" && (
        <View style={styles.content}>
          <TestVoice noteString={noteString} correct={showNextNote} />
        </View>
      )}
      <StatusBar style="auto" hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    maxWidth: 600,
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 48,
    flex: 1,
  },
  centerBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 48,
    flex: 1,
  },
  titleBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topic: {
    width: "100%",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    alignSelf: "stretch",
    marginVertical: 16,
  },
  answer: {
    // position: "absolute",
    // right: 40,
    // top: 40,
    height: 80,
  },
  speech: {
    justifyContent: "center",
    // flex: 2,
    height: 200,
  },
  controlBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 32,
  },
  buttonBar: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});
