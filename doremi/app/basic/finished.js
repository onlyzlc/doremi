import { React } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Link, router } from "expo-router";

export default function FinishedPage() {
  return (
    <View>
      <Text>测试结果</Text>
      <Button title="返回主菜单" onPress={() => router.replace("/")} />
      <Button
        title="再来一次"
        onPress={() => router.replace("/basic/playing")}
      />
    </View>
  );
}
