/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import VoiceIndicator from "./VoiceIndicator";
import Button from "./Button";

export default function SpeechRecognition({
  solfa,
  noteString = "",
  correct,
  miss,
  children,
}) {
  const lang = "zh-CN";
  const note = parseInt(noteString[noteString.length - 1]);
  // doremi同音汉字
  const homophone = [
    "Do朵多躲夺剁哆堕都兜",
    "Re来瑞锐蕊睿锐",
    "M咪蜜米迷密秘",
    "Fa发法罚伐乏阀珐",
    "Sol搜说手首艘受收瘦",
    "La啦拉辣喇蜡垃剌",
    "Cc嘻戏洗系西喜细",
  ];
  const [isAvailable, setIsAvailable] = useState(false);

  // 识别结果, 记0~6索引号
  const [speechResult, setSpeechResult] = useState(4);
  // const [speechResultInt, setSpeechResultInt] = useState("请唱...");
  const [volume, setVolume] = useState(0);

  const [testTimer, setTestTimer] = useState(null);

  const handleSpeechResult = (e) => {
    Voice.stop()
      .then(() => {
        // 取最后一句识别结果
        let lastWords = e.value[e.value.length - 1];
        // lastWords = lastWords[lastWords.length - 1];
        console.log("识别结果:" + lastWords);

        // 匹配doremi同音汉字, 得出用户可能说的唱名, 以索引号记录, 可识别的记索引号, 不识别的记-1
        const matched = homophone.findIndex((words) =>
          new RegExp(`[${words}]`).test(lastWords)
        );

        if (matched != -1) {
          // 能识别发音，判断是否匹配当前测试唱名
          setSpeechResult(matched);
          setVolume(0);
          console.log("能匹配");
          if (matched + 1 == note) {
            Voice.destroy().then(correct);
          } else {
            miss();
            return Voice.start(lang);
          }
        } else {
          console.log("不能匹配");
          // 不能识别发音
          return Voice.start(lang);
        }
      })
      .catch();

    return false;
  };

  const onVolumeChanged = (e) => {
    setVolume(e.value);
    return null;
  };

  const onSpeechStart = (e) => {
    console.log("开始识别");
  };
  const onSpeechEnd = (e) => {
    console.log("停止识别");
  };

  function start() {
    Voice.start(lang).then(() => setSpeechResult(null));
  }

  const close = () => {
    if (isAvailable) {
      Voice.removeAllListeners();
      Voice.destroy().then(() => console.log("已关闭语音"));
    }
  };

  // todo: 引导开启语音识别服务
  const handleServiceDisabled = () => {};

  // noteString 变化时，重新绑定事件
  useEffect(() => {
    setSpeechResult(null);
    Voice.isAvailable()
      .then((rsl) => {
        setIsAvailable(rsl);
        if (rsl) {
          console.log("语音识别服务可用");
        } else {
          throw new Error("语音识别服务禁用", { cause: "ServiceDisabled" });
        }
      })
      .then(() => {
        console.log("绑定");
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = handleSpeechResult;
        Voice.onSpeechVolumeChanged = onVolumeChanged;
        return Voice.start(lang);
      })
      .catch((err) => {
        console.log(err);
        if (err.cause && err.cause === "ServiceDisabled") {
          handleServiceDisabled();
        }
        setIsAvailable(false);
      });
    return close;
  }, [noteString]);

  const feedback = (
    <>
      <VoiceIndicator
        volume={volume}
        heard={speechResult && solfa[speechResult]}
      />
      {/* <Button onPress={testVolumeChange} title="测试" /> */}
    </>
  );

  return isAvailable ? feedback : children;
}
