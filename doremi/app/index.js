import { Link, router, Stack } from "expo-router";
import { React } from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";
import { H1 } from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Doremipop from "../assets/doremipop";
import { Colors, Fonts, Styles } from "../components/ComStyle";
import MenuCard from "../components/MenuCard";
export default function Solfege() {
  return (
    <View>
      {/* <Link href={"/basic"}>唱名基础练习</Link> */}
      <View style={Styles.titleBar}>
        <H1 title="唱名记忆"></H1>
      </View>
      <Doremipop viewBox="50 50 400 300" height={300} />
      <View style={Styles.section}>
        <MenuCard
          title="唱名基础练习"
          onPress={() => router.navigate("/basic")}>
          <Text>⭐⭐⭐</Text>
        </MenuCard>
        <Text style={[Fonts.secondary, Styles.sectionTitle]}>简谱测试</Text>
        <MenuCard
          title="未知歌曲1"
          onPress={() => router.navigate("/exams?song=song1")}>
          <Text>⭐</Text>
        </MenuCard>
        <MenuCard
          title="未知歌曲2"
          onPress={() => router.navigate("/exams?song=song2")}>
          <Text>⭐</Text>
        </MenuCard>
      </View>
    </View>
  );
}
