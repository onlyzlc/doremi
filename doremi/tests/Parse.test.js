import { parse } from "../components/Parse";
// " N: 1e. (2) (34) (5 (67)) | 1 2 3 - |||  "
/*
N: 1. (2)3. (1) | 3 1 3 0 | 2. (3)(44)(32) | 4 - - 0 |
Lw: Do, a deer, a fe-male deer. Re, a drop of gol-den sun.
---
N: 3. (4)5. (3) | 5 3 5 0 | 4. (5)(66)(54) | 6 - - 0 |
Lw: Mi, a name I call my-self. Fa, a long long way to run.
---
*/
const data = `N: 1 2 3 4 | 1 2 3 4 |
Lw: Do, a deer, a fe-male deer. Re, a drop of gol-den sun.
---
N: 1 2 3 4 | 1 2 3 4 | 
Lw: Mi, a name I call my-self. Fa, a long long way to run.`;
const ex = {
  body: [
    {
      N: [
        ["1", "2", "3", "4"],
        ["1", "2", "3", "4"],
      ],
    },
    {
      N: [
        ["1", "2", "3", "4"],
        ["1", "2", "3", "4"],
      ],
    },
  ],
};
test("测试解析函数", () => {
  expect(parse(data)).toStrictEqual(ex);
});
