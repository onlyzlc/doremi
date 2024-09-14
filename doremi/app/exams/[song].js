import { useLocalSearchParams } from "expo-router";
import { songs } from "../../components/Data";
import MusicalStave from "../../components/MusicalStave";
import { View, Text } from "react-native";
import { H1 } from "../../components/Header";
import { Colors, Styles } from "../../components/ComStyle";
// import SpeechRecognition from "../../components/SpeechRecognition";
import { parse } from "../../components/Parse";
import { useEffect, useState } from "react";

export default function Song() {
  function handleCorrect() {}
  function handleMiss(params) {}
  const song = useLocalSearchParams().song;
  const [stave, setStave] = useState({});
  useEffect(() => {
    setStave(parse(songs[song]));
  }, []);
  console.log("local param:", song);
  return (
    <View>
      <View style={Styles.titleBar}>
        <H1 title="唱谱" />
      </View>
      <View style={Styles.section}>
        <MusicalStave stave={stave} />
      </View>
      <View>
        {/* <SpeechRecognition
          noteString={noteString}
          correct={handleCorrect}
          miss={handleMiss}>
          <Text>语音识别不可用</Text>
        </SpeechRecognition> */}
      </View>
    </View>
  );
}
