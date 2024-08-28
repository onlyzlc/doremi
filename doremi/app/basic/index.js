import { React } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Link, router } from "expo-router";

export default function StartPage() {
  return (
    <View>
      <Text>提示</Text>
      <Button title="开始" onPress={() => router.replace("basic/playing")} />
    </View>
  );
}
