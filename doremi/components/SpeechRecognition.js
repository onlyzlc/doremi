/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";

export default function SpeechRecognition({
  solfa,
  note = "",
  correct,
  miss,
  children,
}) {
  const lang = "zh-CN";
  const zhRoll = [
    "Do朵多躲夺剁哆堕都兜",
    "Re来瑞锐蕊睿",
    "M咪蜜米迷密米秘",
    "Fa发法罚伐乏阀珐",
    "Sol搜说手首艘受收瘦",
    "La啦拉辣喇蜡垃剌",
    "Cc嘻戏洗系西喜细",
  ];
  const [isAvailable, setIsAvailable] = useState(false);

  // 识别结果, 记0~6索引号
  const [speechResult, setSpeechResult] = useState(null);
  const [speechResultInt, setSpeechResultInt] = useState("请唱...");

  const handleSpeechResult = (e) => {
    Voice.stop();
    // 取识别结果里最后一组的最后一个字
    let lastWord = e.value[e.value.length - 1];
    lastWord = lastWord[lastWord.length - 1];
    console.log("识别结果:" + lastWord);
    // 【触发渲染】显示识别的中文发音
    setSpeechResultInt(lastWord);
    // 根据语音识别结果, 去匹配中文发音, 得出用户可能说的唱名, 以索引号记录, 可识别的记索引号, 不识别的记-1
    const matched = zhRoll
      .map((words, i) => (words.includes(lastWord) ? i : -1))
      .filter((item) => item != -1);
    if (matched.length == 1) {
      // 仅有唯一匹配发音, 判断是否匹配当前测试唱名
      setSpeechResult(matched[0]);
      // 暂留展示回答后, 向父组件上报结果
      setTimeout(() => {
        matched[0] == note - 1 ? correct() : miss();
        setSpeechResult(null);
        setSpeechResultInt("请唱...");
      }, 800);
    } else {
      // 有多个或0个匹配发音的可能
      console.log("匹配到:" + matched[0]);
      console.log(matched);
      Voice.start();
      setSpeechResult(null);
      setSpeechResultInt("没听清...");
    }
    return false;
  };

  const onVolumeChanged = (e) => {
    return null;
  };

  const onSpeechStart = (e) => {
    console.log("开始识别");
  };
  const onSpeechEnd = (e) => {
    console.log("停止识别");
  };

  const close = () => {
    if (isAvailable) {
      Voice.destroy().then(Voice.removeAllListeners);
      console.log("已关闭语音");
    }
  };

  // note 变化时，重新绑定事件
  useEffect(() => {
    Voice.isAvailable()
      .then((rsl) => {
        setIsAvailable(rsl);
        if (rsl) {
          console.log("语音识别模块可用");
          return Voice.removeAllListeners();
        } else {
          throw new Error("VoiceDisabled");
        }
      })
      .then(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechResults = handleSpeechResult;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechVolumeChanged = onVolumeChanged;
        return Voice.start(lang);
      })
      .catch((err) => {
        if (err === "VoiceDisabled") {
          // todo:
        }
        console.log(err);
        setIsAvailable(false);
      });
    return close;
  }, [note]);

  const heard = (
    <>
      <Text style={{ fontSize: 48, fontWeight: 300, textAlign: "center" }}>
        {speechResult != null && solfa[speechResult]}
      </Text>
      <Text style={{ fontSize: 24, fontWeight: 300, textAlign: "center" }}>
        {speechResultInt}
      </Text>
    </>
  );

  return <View style={styles.heard}>{isAvailable ? heard : children}</View>;
}

const styles = StyleSheet.create({
  heard: {},
});
