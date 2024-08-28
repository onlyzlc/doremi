import { Link, router, Stack } from "expo-router";
import { React } from "react";
import { View } from "react-native";
import Button from "../components/Button";
import { H1 } from "../components/Header";

export default function Solfege() {
  return (
    <View>
      {/* <Link href={"/basic"}>唱名基础练习</Link> */}
      <H1 title="唱名记忆"></H1>
      <Button onPress={() => router.navigate("/basic")} title="唱名基础练习" />
    </View>
  );
}
