/* eslint-disable react/prop-types */
import { React, useEffect, useMemo, useState } from "react";
import Voice from "@react-native-voice/voice";
import { View, Text } from "react-native";

export default function TestVoice({ noteString = [], correct }) {
  const lang = "zh-CN";
  // const [tirg, setTrig] = useState(false);
  const [timer, setTimer] = useState();
  const [n, setN] = useState(1);

  const _clear = () => {
    Voice.removeAllListeners();
    console.log("已清理事件绑定");
    Voice.stop().catch();
  };
  const _isRecognizing = async () => {
    try {
      const status = await Voice.isRecognizing();
      console.log(status ? "正在识别" : "识别完成");
      return status;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpeechResult = (e) => {
    Voice.destroy().then(() => {
      let lastWords = e.value[e.value.length - 1];
      console.log("识别结果:" + lastWords);
      correct();
    });
  };
  const onSpeechStart = (e) => {
    console.log("开始识别");
  };
  const onSpeechEnd = (e) => {
    console.log("停止识别");
  };
  const onVolumeChanged = (e) => {};

  // todo: 引导开启语音识别服务

  useEffect(() => {
    console.log("传入:" + noteString);
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = handleSpeechResult;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechVolumeChanged = onVolumeChanged;
    Voice.start(lang).catch((err) => console.error(err));

    return _clear;
  }, [noteString]);

  return <View></View>;
}
