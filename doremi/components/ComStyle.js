import { StyleSheet } from "react-native";

export const Colors = {
  light: "rgb(231, 238, 252)",
  main: "rgb(65, 35, 68)",
  cantrol: "rgb(65, 35, 68)",
  foreground: "rgb(255, 255, 255)",
  secondary: "rgb(255, 192, 60)",
  secondText: "#8B668E",
  secBackground: "#B1C4EC",
  red: "rgb(255, 37, 36)",
};

export const Fonts = {
  main: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "left",
    // color: Colors.main,
  },
  secondary: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: "left",
    // color: Colors.secondText,
  },
};

// 统一的容器两侧边距
const spacing1 = 16;

export const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  screenBackground: {
    flex: 1,
  },
  titleBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: spacing1,
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
  section: {
    padding: spacing1,
  },
  sectionTitle: {
    paddingVertical: spacing1,
  },
  card: {
    borderRadius: 8,
    justifyContent: "spaceBetween",
    padding: spacing1,
    gap: 8,
    backgroundColor: Colors.foreground,
    marginBottom: 16,
  },
});
