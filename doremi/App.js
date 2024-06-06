/* eslint-disable react/prop-types */
import { React, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import IconButton from "./components/IconButton";
// import Button from "./components/Button";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteList from "./components/NoteList";
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
} from "react-native-reanimated";
import SpeechRecognition from "./components/SpeechRecognition";
import ProgressBarAnimated from "react-native-progress-bar-animated";
// import VoiceTest from "./VoiceTestFuncComp";
import { Svg_Complete } from "./components/SvgIcons";

const solfa = ["do", "re", "mi", "fa", "sol", "la", "si"];

// todo,动画
function Question({ note, showAnswer }) {
  return (
    <View style={styles.note}>
      <Text style={{ fontSize: 200, fontWeight: 700, textAlign: "center" }}>
        {note}
      </Text>
      {showAnswer && (
        <Text style={{ fontSize: 48, fontWeight: 200, textAlign: "center" }}>
          {solfa[note - 1]}
        </Text>
      )}
    </View>
  );
}

export default function App() {
  const totalCount = 10;

  // 音符组
  const [noteGroup, setNoteGroup] = useState([]);
  // 启动状态
  const [practiceStatus, setPracticeStatus] = useState("setting");
  // 回答超时
  const [isTimeout, setIsTimeout] = useState(false);
  // 练习时生成的音符序列，最后一个数字即当前音符
  const [noteString, setNoteString] = useState([]);

  let currentNote = noteString[noteString.length - 1];
  let currentNumber = noteString.length;

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
  const nextNote = () =>
    noteGroup[Math.floor(Math.random() * noteGroup.length)];
  // 启动训练
  const practice = () => {
    setNoteString([nextNote()]);
    setPracticeStatus("practicing");
    // 存储
    AsyncStorage.setItem("lastStatus", JSON.stringify({ noteGroup })).catch(
      (e) => console.error(e)
    );
  };

  const showNextNote = () => {
    setIsTimeout(false);
    console.log(`noteString: ${noteString.join(",")}`);
    if (currentNumber < totalCount) {
      // 如果没有练完,就计算下一个音符
      setNoteString([...noteString, nextNote()]);
    } else {
      // 如果练完了,就显示完成图标,短暂停留后自动跳回设置页面
      setPracticeStatus("done");
      setTimeout(() => {
        setPracticeStatus("setting");
      }, 800);
      changeNotes();
    }
    return false;
  };

  const handleCorrect = () => {
    setTimeout(showNextNote, 500);
  };

  // 音符动画(缓入缓出除外)
  const offset = useSharedValue(0);
  const noteAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  // 摇摆动画
  const handleMiss = () => {
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
    setIsTimeout(false);
    setPracticeStatus("setting");
  };

  return (
    <View style={[styles.container, { paddingTop: 64 }]}>
      {/* 设置界面 */}
      {practiceStatus == "setting" && (
        <View style={styles.content}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>唱名训练</Text>
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
            {/* <Text style={styles.title}>
              {currentNumber} / {totalCount}
            </Text> */}
            <ProgressBarAnimated
              width={200}
              value={(currentNumber / totalCount) * 100}
              backgroundColorOnComplete="#6CC644"
            />
            <IconButton name="close" size={64} onPress={exit} />
          </View>

          {/* 音符展示区 */}
          {/* todo: 退出训练时，不需要动画 */}
          <Animated.View
            style={[styles.topic, noteAnimStyle]}
            key={noteString.length}
            exiting={SlideOutLeft.easing(Easing.bezier(0.19, 0.19, 0.03, 0.97))}
            entering={SlideInRight.easing(
              Easing.bezier(0.19, 0.19, 0.03, 0.97)
            )}>
            <Question note={currentNote} showAnswer={isTimeout} />
          </Animated.View>

          <SpeechRecognition
            solfa={solfa}
            note={currentNote}
            correct={handleCorrect}
            miss={handleMiss}>
            <View style={styles.buttonBar}>
              <Button title="下一个" onPress={handleCorrect}></Button>
              <Button title="错误" onPress={handleMiss}></Button>
            </View>
          </SpeechRecognition>
          {/* <Text>{noteString.join(",")}</Text> */}
        </View>
      )}
      {/* 完成界面 */}
      {practiceStatus == "done" && (
        <View style={styles.centerBox}>
          <Animated.View entering={BounceIn}>
            <Svg_Complete />
          </Animated.View>
        </View>
      )}
      {/* 测试语音识别 */}
      {/* {practiceStatus == "test" && <VoiceTest />} */}
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
  title: {
    color: "rgb(51, 51, 51)",
    fontSize: 32,
    fontWeight: 700,
    textAlign: "left",
    flex: 1,
  },
  topic: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "none",
    alignSelf: "stretch",
    flexGrow: 1,
    marginVertical: 16,
  },

  controlBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  buttonBar: {
    padding: 16,
  },
});
