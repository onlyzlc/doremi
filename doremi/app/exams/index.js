import { React } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { H1 } from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { solfa, homophone } from "../../components/Data";
import { Colors, Styles } from "../../components/ComStyle";

export default function StartPage() {
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
        }}>
        {solfa.map((item, index) => (
          <View
            key={item}
            style={{ alignItems: "center", width: 30, rowGap: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>{index + 1}</Text>
            <MaterialIcons name="arrow-downward" size={16} color="#ECD1EF" />
            <Text>{item}</Text>
            <Text style={{ color: Colors.secondText }}>{homophone[index]}</Text>
          </View>
        ))}
      </View>
      {/* <Button title="开始" onPress={() => router.replace("exams/song?")} /> */}
    </View>
  );
}
