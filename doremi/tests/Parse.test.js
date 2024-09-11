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
const data = `N: #1e. b2d 3. #4 |`;
const ex = {
  body: [
    {
      N: [
        [
          {
            presign: "#",
            note: "1",
            overtones: "e",
            dot: ".",
            octave: 1,
            index: 0,
          },
          {
            presign: "b",
            note: "2",
            overtones: "d",
            dot: "",
            octave: -1,
            index: 1,
          },
          {
            presign: "",
            note: "3",
            overtones: "",
            dot: ".",
            octave: 0,
            index: 2,
          },
          {
            presign: "#",
            note: "4",
            overtones: "",
            dot: "",
            octave: 0,
            index: 3,
          },
        ],
      ],
    },
  ],
};
test("测试解析函数", () => {
  expect(parse(data)).toStrictEqual(ex);
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
