import React, { useState } from "react";
import { View } from "react-native";
import SolfegeRecognition from "../../components/SolfegeRecognition";
import { solfa } from "../../data/pronunciations";
import Button from "../../components/Button";

export default function Test() {
  const [point, setPoint] = useState(0);
  const correct = () => {};
  const miss = () => {};
  return (
    <View style={{ padding: 24 }}>
      <SolfegeRecognition
        noteIndex={point}
        noteNumber={point}
        correct={correct}
        miss={miss}
      />
      <Button title="下一个" onPress={() => setPoint(point + 1)} />
    </View>
  );
}
