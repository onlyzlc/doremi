/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import VoiceIndicator from "./VoiceIndicator";
import { solfa, homophone } from "../data/pronunciations";
import { Platform, Text } from "react-native";

// @param {}
export default function SolfegeRecognition({
  noteIndex = 0,
  noteNumber = 0,
  correct,
  miss,
}) {
  // if (Platform.OS == "web") return;
  const lang = "zh-CN";

  const [isAvailable, setIsAvailable] = useState(false);
  // 识别结果, 记0~6索引号
  const [speechResult, setSpeechResult] = useState(4);
  // 音量变化使得组件频繁渲染
  const [volume, setVolume] = useState(0);
  const onVolumeChanged = (e) => {
    setVolume(e.value);
    return null;
  };

  const onSpeechStart = (e) => {
    if (e) {
      console.error("Speech start error:", e);
    } else {
      console.log("Speech start");
    }
  };
  const onSpeechEnd = (e) => {
    if (e) {
      console.error("Speech stop error:", e);
    } else {
      console.log("Speech stop");
    }
  };
  const onSpeechError = (e) => {
    console.error("语音服务错误", e.error);
  };

  const reload = () => {
    if (isAvailable) {
      Voice.removeAllListeners();
    }
  };
  const cleanup = () => {
    console.log("cleanup");
    Voice.destroy().then(() => console.log("已关闭语音"));
  };

  // todo: 引导开启语音识别服务
  const handleServiceDisabled = () => {};
  const handleSpeechResult = (e) => {
    // 取最后一句识别结果
    let lastWords = e.value[e.value.length - 1];
    lastWords = lastWords[lastWords.length - 1];

    // 匹配doremi同音汉字, 得出用户可能说的唱名, 以索引号记录, 可识别的记索引号, 不识别的记-1
    const matched = homophone.findIndex((words) =>
      new RegExp(`[${words}]`).test(lastWords)
    );

    console.log("题目:%d, 识别结果:%s", noteNumber, lastWords);
    // 测试模式
    if (matched != -1) {
      // 能识别发音，判断是否匹配当前测试唱名
      setSpeechResult(matched);
      setVolume(0);
      if (matched + 1 == noteNumber) {
        console.log("正确");
        correct();
      } else {
        console.log("错误");
        miss();
      }
    } else {
      console.log("不能匹配");
    }
  };

  // number或note 变化时，重新绑定事件
  useEffect(() => {
    if (!/[1-7]/.test(noteNumber)) {
      return reload;
    }
    console.log("===================");
    // console.log("题:", noteNumber);
    setSpeechResult(null);
    Voice.destroy()
      .then(Voice.isAvailable)
      .then((rsl) => {
        setIsAvailable(rsl);
        if (!rsl) {
          throw new Error("语音识别服务禁用", { cause: "ServiceDisabled" });
        }
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = handleSpeechResult;
        Voice.onSpeechVolumeChanged = onVolumeChanged;
        Voice.onSpeechError = onSpeechError;
        // console.log("重新绑定,noteNumber:", noteNumber);
      })
      .then(() => Voice.start(lang))
      .catch((err) => {
        console.log(err);
        if (err.cause && err.cause === "ServiceDisabled") {
          handleServiceDisabled();
        }
        setIsAvailable(false);
      });
    return reload;
  }, [noteIndex, noteNumber]);

  useEffect(() => {
    if (Platform.OS == "android") {
      Voice.getSpeechRecognitionServices()
        .then((rsl) => console.log("语音服务:", rsl))
        .catch((err) => console.error(err));
    }
    return cleanup;
  }, []);

  if (isAvailable) {
    return (
      <VoiceIndicator
        volume={volume}
        heard={speechResult && solfa[speechResult]}
      />
    );
  } else {
    return <Text>语音识别服务不可用</Text>;
  }
}
