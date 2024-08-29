import { React } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { H1 } from "../../components/Header";

export default function FinishedPage() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 16,
        flex: 1,
      }}>
      <H1 title="完成" />
      <Button title="返回" onPress={() => router.replace("/")} />
      <Button
        title="再来一次"
        onPress={() => router.replace("/basic/playing")}
      />
    </View>
  );
}
