/* eslint-disable react/react-in-jsx-scope */
import { render } from "@testing-library/react-native";
import MusicalStave, { Chip, Bar } from "../components/MusicalStave";
import { song1 } from "../components/Data";

// test("渲染小节", () => {
//   const data = ["1e", "b2"];
//   const tree = render(<Bar barData={data} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test("渲染碎片", () => {
//   const data = [
//     ["1", "2"],
//     ["3", "4"],
//   ];
//   const tree = render(<Chip chipData={data} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
test("渲染简谱", () => {
  const tree = render(<MusicalStave staveDoc={song1} />).toJSON();
  expect(tree).toMatchSnapshot();
});
