import { router } from "expo-router";
import { React, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { H1 } from "../components/Header";
import Doremipop from "../assets/doremipop";
import { Fonts, Styles } from "../components/ComStyle";
import MenuCard from "../components/MenuCard";
import { readArch } from "../components/Storage";
import Stars from "../components/Stars";
import songs from "../data/song/index.json";

export default function Solfege() {
  const [examsResult, setExamsResult] = useState({});
  const songList = songs.exams;
  useEffect(() => {
    readArch().then((arch) => setExamsResult(arch.exams)).catch;
    return () => setExamsResult([]);
  }, []);
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
        {songList.map((song, index) => {
          console.log("%s=%o", song, examsResult[song]);
          const stars = !examsResult[song] ? null : examsResult[song].stars;
          return (
            <MenuCard
              key={index}
              title={song}
              onPress={() => router.navigate(`/exams?song=${song}`)}>
              <Stars value={stars} />
            </MenuCard>
          );
        })}
      </View>
    </View>
  );
}
