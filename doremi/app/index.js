import { Link, router } from "expo-router";
import { React, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { H1 } from "../components/Header";
import Doremipop from "../assets/doremipop";
import { Fonts, Styles } from "../components/ComStyle";
import MenuCard from "../components/MenuCard";
import { read } from "../components/Storage";
import Stars from "../components/Stars";
import songs from "../data/song/index.json";

export default function Solfege() {
  const [examsResult, setExamsResult] = useState([]);
  const songList = songs.exams;
  // useEffect(() => {
  //   console.log("songlist:", songs);
  //   songList.forEach((song) => setExamsResult([...examsResult, read(song)]));
  // }, []);
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
          const result = read(song);
          return (
            <MenuCard
              key={index}
              title={song}
              onPress={() => router.navigate(`/exams?song=${song}`)}>
              {result > 0 ? <Stars value={result[1]} /> : <Text>暂无评分</Text>}
            </MenuCard>
          );
        })}
      </View>
    </View>
  );
}
