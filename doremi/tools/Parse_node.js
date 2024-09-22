const fs = require("fs");
const path = require("path");
fs.readdirSync("./input").forEach((fileName) => {
  const inputFile = path.join("./input", fileName);
  const outputFile = path.join("./output", fileName.replace("txt", "json"));
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(data);
    const content = JSON.stringify(parse(data));
    fs.writeFile(outputFile, content, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
});

// 解析整个简谱
function parse(rowData = "") {
  if (typeof rowData != "string") return false;

  // 解析音乐属性
  function parseProps(rowData = "") {
    const reg =
      /^P: *(?<key>1=[#b$%]?[A-G]\d?) +(?<time>\d\/\d(T|S|s)?) +(?<tempo>(hpm|qpm|spm|h.pm|q.pm|s.pm)=\d+)/m;
    const propsStr = rowData.match(reg);
    // const props = { time: 4, tempo: 60, key: "C4" };
    if (propsStr) {
      const props = propsStr.groups;
      console.log(props);
      return props;
    } else {
      return {};
    }
  }

  // 解析音符
  let noteIndex = 0;
  function parseNote(noteString = "") {
    // (?<presign>[#b=]*) 捕获音符左侧的升降号; (?<note>[0-9XYZ\-]):捕获音符;
    // (?<overtones>[ed]*) 捕获倍音记号; (?<dot>\.?) 捕获附点(若有多个点只取一个)
    const noteContent = noteString.match(
      /(?<presign>(^##|^bb|^#|^b|^=)?)(?<noteNumber>[0-9XYZ-])(?<overtones>[ed]*)(?<dot>\.?)/
    );
    if (noteContent) {
      const { presign, noteNumber, overtones, dot } = noteContent.groups;
      let octave = 0;
      for (let i = 0; i < overtones.length; i++) {
        // 升8度,降8度
        octave += overtones.charAt(i) == "e" ? 1 : 0;
        octave += overtones.charAt(i) == "d" ? -1 : 0;
      }
      return {
        ...noteContent.groups,
        octave: octave,
        nodeIndex: noteIndex++,
      };
    } else {
      throw new Error(`音符(${noteString})解析错误`);
    }
  }

  // 解析小节,将切分好的小节字符转换为嵌套形式的数组
  function parseBar(strArr = []) {
    // console.log("parseBar输入:", strArr);
    // 每层输出
    const bar = [];
    while (strArr.length > 0) {
      // console.log("处理:", strArr[0]);
      if (strArr[0] === "(") {
        strArr.shift();
        const subBeat = parseBar(strArr);
        bar.push(subBeat);
      } else if (strArr[0] === ")") {
        strArr.shift();
        // 结束本层循环
        break;
      } else if (strArr[0] !== undefined) {
        const noteObject = parseNote(strArr.shift());
        bar.push(noteObject);
      }
    }
    // console.log("parseBar输出:", bar);
    return bar;
  }

  // 解析单行(以N:开头)
  function parseNoteline(lineString = "") {
    // console.log("parseNoteline 输入:", lineString);
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
    if (barStrArr[barStrArr.length] == "") barStrArr.pop();
    const noteLine = barStrArr.map((barStr) => {
      // 正则表达式: ()~-符号各占一位, 数字可带升降号或高低8度标记或附点标记 占一位
      // "1e. b2 (34) (5 (67)) " => ["1e.","(","2",")","(","3","4",")","(","5","(","6","7",")",")",]
      const strArr = barStr.match(/([()~])|([#b=]*[0-9XYZ-][ed]*\.*)/g);
      if (strArr) return parseBar(strArr);
    });
    // console.log("parseNoteline 输出:", noteLine);
    return noteLine;
  }

  // // 章节
  // const chapters = rowData.split("===")

  // 按横线分割为片段
  const sections = rowData.split("---");
  // 旋律部分解析
  let body = [];
  sections.forEach((sec) => {
    const noteLines = sec.trim().match(/^N:.+/m);
    if (noteLines) {
      body = body.concat(parseNoteline(noteLines[0]));
    }
  });

  const stave = {
    ...parseProps(rowData),
    length: noteIndex - 1,
    body: body,
  };
  // console.log("parse输出:", stave);
  // console.log("============================================");

  return stave;
}

// export { parse };
