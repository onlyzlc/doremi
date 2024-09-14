/* eslint-disable react/react-in-jsx-scope */
import { render } from "@testing-library/react-native";
import MusicalStave, { Note, Chip, BarNotes } from "../components/MusicalStave";
import { songs } from "../components/Data";

const nx = {
  presign: "",
  note: "1",
  overtones: "e",
  dot: "",
  octave: -2,
  index: 0,
};
// test("渲染音符", () => {
//   const tree = render(<Note noteObject={nx} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
const bx = [nx, [nx, nx]];
// test("渲染小节", () => {
//   const tree = render(<BarNotes barData={bx} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

const cx = [bx, bx];
// test("渲染碎片", () => {
//   const tree = render(<Chip chipData={cx} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
test("渲染简谱", () => {
  const tree = render(<MusicalStave staveDoc={songs.song1} />).toJSON();
  expect(tree).toMatchSnapshot();
});
