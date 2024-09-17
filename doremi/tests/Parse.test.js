import { parse, parseNote, parseBar, parseNoteline } from "../components/Parse";
// " N: 1e. (2) (34) (5 (67)) | 1 2 3 - |||  "
/*
N: 1. (2)3. (1) | 3 1 3 0 | 2. (3)(44)(32) | 4 - - 0 |
Lw: Do, a deer, a fe-male deer. Re, a drop of gol-den sun.
---
N: 3. (4)5. (3) | 5 3 5 0 | 4. (5)(66)(54) | 6 - - 0 |
Lw: Mi, a name I call my-self. Fa, a long long way to run.
---
*/
const ns = "#1e.";
const input = `N: ${ns} ${ns} |  
Lr: xxxxx
--- 
N: ${ns} ${ns} | `;
let id = 0;
const X = {
  presign: "#",
  note: "1",
  overtones: "e",
  dot: ".",
  octave: 1,
  index: 0,
};
const ex = {
  body: [
    [X, X], //bar1
    [X, X], //bar2
  ],
};
test("测试解析函数", () => {
  expect(parse(input)).toStrictEqual(ex);
});

// const input = "1ed";
// const ex = { presign: "", note: "1", overtones: "ed", dot: "", octave: 0 };
// test("测试音符解析函数", () => {
//   expect(parseNote(input)).toStrictEqual(ex);
// });

// const input = "N:X(X(XX))||";
// const X = { presign: "", note: "X", overtones: "", dot: "", octave: 0 };
// const ex = [[X, [X, [X, X]]]];
// test("测试小节解析函数", () => {
//   expect(parseNoteline(input)).toStrictEqual(ex);
// });
