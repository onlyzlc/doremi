/* eslint-disable react/react-in-jsx-scope */
import { render } from "@testing-library/react-native";
import MusicalStave, { Note, Chip, BarNotes } from "../components/MusicalStave";
import { song1 } from "../components/Data";

test("渲染音符", () => {
  const input = {
    presign: "",
    note: "1",
    overtones: "e",
    dot: "",
    octave: 1,
    index: 0,
  };
  const tree = render(<Note noteObject={input} />).toJSON();
  expect(tree).toMatchSnapshot();
});
// test("渲染小节", () => {
//   const input = ["1e", "b2"];
//   const tree = render(<BarNotes barData={input} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test("渲染碎片", () => {
//   const input = [
//     ["1", "2"],
//     ["3", "4"],
//   ];
//   const tree = render(<Chip chipData={input} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test("渲染简谱", () => {
//   const tree = render(<MusicalStave staveDoc={song1} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
