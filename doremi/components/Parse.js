// 解析小节,将切分好的小节字符转换为嵌套形式的数组
function parseBar(strArr = []) {
  console.log("parseBar输入:", strArr);
  // const strArr = barStr.match(/[()-~]|([0-9]|[XYZ_])[ed]?\.?/g);
  // 输入的数组在下面的操作中会逐步缩短, 故需先记录其长度用于循环判断
  const l = strArr.length;
  // 每层输出
  const bar = [];
  for (let i = 0; i < l; i++) {
    if (strArr.length === 0) break;
    // console.log("处理:", strArr[0]);
    if (strArr[0] === "(") {
      strArr.shift();
      const subBeat = parseBar(strArr);
      bar.push(subBeat);
    } else if (strArr[0] === ")") {
      strArr.shift();
      // 结束循环
      break;
    } else if (strArr[0] !== undefined) {
      bar.push(strArr.shift());
    }
  }
  console.log("parseBar输出:", bar);
  return bar;
}

// 解析单行(以N:开头)
function parseNoteline(lineString = "") {
  console.log("parseNoteline 输入:", lineString);

  if (!lineString.startsWith("N:")) return [];
  // " N: 1e. (2) (34) (5 (67)) | 1 2 3 - |||  "
  let l = lineString.substring(2).trim();
  // "1e. (2) (34) (5 (67)) | 1 2 3 - |||"
  if (l.endsWith("||")) {
    l = l.slice(0, -2);
    // "1e. (2) (34) (5 (67)) | 1 2 3 - |"
  }
  if (l.endsWith("|")) {
    l = l.slice(0, -1);
    // "1e. (2) (34) (5 (67)) | 1 2 3 - "
  }
  const barStrArr = l.split("|");
  // 行 barStrArr = ["1e. (2) (34) (5 (67)) " , "1 2 3 - " , ""]
  const noteLine = barStrArr.map((barStr) => {
    // 正则表达式: ()~-符号各占一位, 数字可带升降号或高低8度标记或附点标记 占一位
    // "1e. b2 (34) (5 (67)) " => ["1e.","(","2",")","(","3","4",")","(","5","(","6","7",")",")",]
    const strArr = barStr.match(/([()~-])|([#b]?[0-9][ed]?\.?)/g);
    if (strArr) return parseBar(strArr);
  });
  console.log("parseNoteline 输出:", noteLine);
  return noteLine;
}

// 解析整个简谱
function parse(rowData = "") {
  if (typeof rowData != "string") return false;
  // 正则表达式:匹配以横线-开头的行
  // 按横线分割为片段
  const sections = rowData.split("---");
  // 将字符串数组形式的简谱转换为结构化的简谱,每个item一个对象
  console.log("sections:", sections);

  // 旋律部分解析
  const body = sections.map((sec) => {
    // 仅支持单声部(添加修饰符g后,将匹配多行,否则仅匹配第一个)
    const noteLine = sec.trim().match(/^N:.+/m);
    console.log("noteLine:", noteLine);

    if (noteLine) {
      return {
        N: parseNoteline(noteLine[0]),
      };
    }
  });

  const stave = {
    // 调号
    // 拍号
    // 作者
    body: body,
  };
  console.log("parse输出:", stave);
  console.log("============================================");

  return stave;
}

export { parse, parseNoteline, parseBar };
