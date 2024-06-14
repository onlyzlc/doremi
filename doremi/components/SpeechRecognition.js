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
    Voice.stop();

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
      matched + 1 == note ? correct() : miss();
    } else {
      // 不能识别发音
      Voice.start(lang);
      setSpeechResult(null);
    }
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

  const close = () => {
    if (isAvailable) {
      Voice.destroy()
        .then(Voice.removeAllListeners)
        .then(() => console.log("已关闭语音"));
    }
  };

  // todo: 引导开启语音识别服务
  const handleServiceDisabled = () => {};

  function testVolumeChange() {
    if (testTimer) {
      clearInterval(testTimer);
      setTestTimer(null);
      setSpeechResult(1);
      setVolume(0);
      correct();
      return null;
    }
    setTestTimer(
      setInterval(() => {
        setVolume(Math.random() * 60 + 20);
      }, 100)
    );
  }

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
      .then(Voice.stop)
      .then(Voice.removeAllListeners)
      .then(() => {
        console.log("重新绑定");
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechResults = handleSpeechResult;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechVolumeChanged = onVolumeChanged;
        return Voice.start(lang);
      })
      .catch((err) => {
        // console.log(err);
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
