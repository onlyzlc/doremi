import { render } from "@testing-library/react-native";
import MusicalStave, { Note, Beat } from "../components/MusicalStave";

test("渲染小节", () => {
  const data = [1, 2, 3, 4];
  const tree = render(<Beat barData={data}></Beat>).toJSON();
  expect(tree).toMatchSnapshot();
});
