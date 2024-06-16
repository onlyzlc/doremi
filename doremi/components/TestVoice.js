/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import { View, Text } from "react-native";
import Button from "./Button";
import { err } from "react-native-svg";

export default function TestVoice({ noteString = "", correct }) {
  const lang = "zh-CN";

  const _clear = () => {
    Voice.removeAllListeners();

    Voice.destroy()
      .then(() => {
        console.log("已关闭语音");
      })
      .catch((err) => {
        console.error(err);
      });
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
    Voice.stop().then(() => {
      let lastWords = e.value[e.value.length - 1];
      console.log("识别结果:" + lastWords);

      Voice.start(lang);
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

  // noteString 变化时，重新绑定事件
  useEffect(() => {
    console.log("挂载");
    Voice.onSpeechStart = onSpeechStart;
    if (Voice.onSpeechResults == undefined)
      Voice.onSpeechResults = handleSpeechResult;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechVolumeChanged = onVolumeChanged;
    Voice.start(lang);

    return _clear;
  }, []);

  return (
    <>
      <Button onPress={correct} title="测试"></Button>
    </>
  );
}

// export default function TestVoice({ correct }) {
//   return (
//     <View>
//       <Text>你好</Text>
//     </View>
//   );
// }
