function parseBar(strArr = ["1", "2", "(", "3", "(", "4", "5", ")", ")", "6"]) {
  const barArr = strArr.reduce((preBarArr, curStr, curIndex, curArr) => {
    if (curStr === "(") {
      // 截取括号内的字符,递归解析
      // [ "3", "(", "4", "5", ")", ")", "6"]
      const subBeat = parseBar(curArr.slice(curIndex + 1));
      // 递归后,上层剔除相应长度的元素(加上一对括号)
      curArr.splice(curIndex, subBeat.length + 2);
      preBarArr.push(subBeat);
      // => ["1", "2", ["3","4"]]
      return preBarArr;
    } else if (curStr === ")") {
      // 剔除括号)及其后的元素,使迭代停止
      curArr.splice(curIndex);
      return preBarArr;
    } else {
      preBarArr.push(curStr);
      return preBarArr;
    }
  }, []);
  return barArr;
}

function parseNote(
  strArr = ["1e", "2", "(", "3", "4", ")", "(", "5", "6", ")"]
) {
  console.log("输入:", strArr);
  const l = strArr.length;
  const beat = [];
  for (let i = 0; i < l; i++) {
    if (strArr.length === 0) break;
    console.log("处理:", strArr[0]);
    if (strArr[0] === "(") {
      strArr.shift();
      const subBeat = parseNote(strArr);
      beat.push(subBeat);
    } else if (strArr[0] === ")") {
      strArr.shift();
      // 结束循环
      break;
    } else if (strArr[0] !== undefined) {
      beat.push(strArr.shift());
    }
  }
  console.log("输出:", beat);
  return beat;
}
parseNote();
// console.log(parseNote());
