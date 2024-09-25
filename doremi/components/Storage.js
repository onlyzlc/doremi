import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key = "", value = "") {
  if (key == "") return;
  console.log("保存 %s,%s", key, value);
  try {
    const json = value ? JSON.stringify(value) : "";
    await AsyncStorage.setItem(key, json);
    console.log("成功保存 %s,%s", key, json);
  } catch (error) {
    throw new Error("保存失败,", error);
  }
}
export async function read(key = "") {
  if (key == "") return;
  console.log("读取 %s", key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      const json = JSON.parse(value);
      console.log("成功读取 %s:%s", key, json);
      return json;
    } else {
      console.log("跳过读取 %s:%s", key, value);
      return "";
    }
  } catch (error) {
    throw new Error("读取失败:", error);
  }
}
