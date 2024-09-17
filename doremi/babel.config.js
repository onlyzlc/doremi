module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-syntax-import-attributes",
      "react-native-reanimated/plugin",
    ],
    // react-native-reanimated/plugin必须列在最后。
  };
};
