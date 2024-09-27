import AsyncStorage from "@react-native-async-storage/async-storage";
import { rate2Stars } from "./tools";

export async function save(key = "", value = "") {
  if (key == "") return;
  try {
    const json = JSON.stringify(value);
    console.log("保存 %s : %s", key, json);
    return await AsyncStorage.setItem(key, json);
  } catch (error) {
    throw new Error("保存失败,", error);
  }
}
/**
 *
 * @param {*} key 若key=空则返回空字符串
 * @returns
 */
export async function read(key = "") {
  if (!key) return "";
  // console.log("读取 %s", key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      const json = JSON.parse(value);
      console.log("成功读取 %s:%o", key, json);
      return json;
    } else {
      console.log("找不到存储项：%s", key);
    }
  } catch (error) {
    throw new Error("读取失败:", error);
  }
}

function Arch() {
  this.exams = {};
}
function ExamRsl(rate) {
  this.rate = rate;
  this.stars = rate2Stars(this.rate);
}

export async function readArch() {
  let arch = await read("archiving");
  if (!arch) {
    arch = new Arch();
  }
  return arch;
}
export async function saveExamsResult(song = "", rate = 0) {
  let newArch = await readArch();

  const exam = new ExamRsl(rate);
  newArch.exams[song] = exam;

  console.log("更新存档：", newArch);
  save("archiving", newArch);
}
