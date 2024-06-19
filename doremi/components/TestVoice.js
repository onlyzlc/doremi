/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import { View, Text } from "react-native";

export default function TestVoice({ noteString = "", correct }) {
  const lang = "zh-CN";

  const _clear = async () => {
    Voice.removeAllListeners();
    try {
      await Voice.destroy();
      console.log("已关闭语音");
    } catch (error) {
      console.error(error);
    }
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
    Voice.stop()
      .then(() => {
        let lastWords = e.value[e.value.length - 1];
        console.log("识别结果:" + lastWords);
        correct();
      })
      .catch((err) => console.error(err));
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
    console.log("挂载");
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = handleSpeechResult;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechVolumeChanged = onVolumeChanged;

    return _clear;
  }, []);

  // noteString 变化时，启动语音
  useEffect(() => {
    Voice.start(lang).catch((err) => console.error(err));
    return () => {
      Voice.stop().catch();
    };
  }, [noteString]);

  const note = noteString[noteString.langth - 1];

  return (
    <View>
      <Text>{note}</Text>
    </View>
  );
}
