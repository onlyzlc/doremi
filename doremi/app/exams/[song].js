import { useLocalSearchParams } from "expo-router";
import { song1 } from "../../components/Data";
import MusicalStave from "../../components/MusicalStave";
import { View } from "react-native";
import { H1 } from "../../components/Header";

export default function Song() {
  const song = useLocalSearchParams().song;
  console.log("local param:", song);
  return (
    <View>
      <H1 title="唱谱" />
      <MusicalStave staveDoc={song1} />
    </View>
  );
}
