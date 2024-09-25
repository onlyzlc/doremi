import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key = "", value = null) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw new Error("保存失败");
  }
}
export async function read(key = "") {
  try {
    const value = await AsyncStorage.getItem(key);
    // console.log("读取到 %s: %s", key, value);
    return value;
  } catch (error) {
    throw new Error("读取失败");
  }
}
