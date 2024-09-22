import { React, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Link, router, useLocalSearchParams } from "expo-router";
import { H1 } from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { solfa, homophone } from "../../data/pronunciations";
import { Colors, Styles } from "../../components/ComStyle";
import { Note } from "../../components/MusicalStave";
import example from "../../data/example.json";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";

export default function StartPage() {
  const targetSong = useLocalSearchParams().song;
  const [pointer, setPointer] = useState(-1);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (pointer < example.length) {
      setTimer(
        setTimeout(() => {
          setPointer((p) => p + 1);
        }, 1000)
      );
    } else {
      setPointer(0);
    }
    return () => clearTimeout(timer);
  }, [pointer]);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        rowGap: 16,
        flex: 1,
        justifyContent: "center",
      }}>
      <H1 title="提示" />
      <Text>跟随指示框念出唱名</Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-evenly",
          height: 100,
        }}>
        {example.body[0].map((item, index) => (
          <View
            key={item.index}
            style={{ alignItems: "center", width: 30, rowGap: 8 }}>
            <Note
              noteObject={item}
              status={pointer == index && "pointing"}
              style={{ flex: "" }}
            />
            <MaterialIcons name="arrow-downward" size={16} color="#ECD1EF" />
            {pointer == index && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={{
                  borderRadius: 24,
                  width: 48,
                  height: 48,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.secondary,
                }}>
                <Text>{solfa[item.note - 1]}</Text>
              </Animated.View>
            )}
          </View>
        ))}
      </View>
      <Button
        title="开始"
        onPress={() => router.replace(`exams/${targetSong}`)}
      />
    </View>
  );
}
