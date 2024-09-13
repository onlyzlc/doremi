import { useLocalSearchParams } from "expo-router";
import { songs } from "../../components/Data";
import MusicalStave from "../../components/MusicalStave";
import { View } from "react-native";
import { H1 } from "../../components/Header";
import { Colors, Styles } from "../../components/ComStyle";

export default function Song() {
  const song = useLocalSearchParams().song;
  console.log("local param:", song);
  return (
    <View>
      <View style={Styles.titleBar}>
        <H1 title="唱谱" />
      </View>
      <View style={Styles.section}>
        <MusicalStave staveDoc={songs[song]} />
      </View>
    </View>
  );
}
