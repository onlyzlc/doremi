import { useLocalSearchParams } from "expo-router";
import { song1 } from "../../components/Data";

export default function Song() {
  const song = useLocalSearchParams().song;
  console.log("local param:", song);

  const notes = song1.notes;
}
