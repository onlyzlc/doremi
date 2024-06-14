// 音量指示器
/* eslint-disable react/prop-types */
import * as React from "react";
import { Svg, Circle } from "react-native-svg";
import { Svg_Microphone } from "./SvgIcons";
import { View, Text, StyleSheet, Easing } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { Colors } from "./ComStyle";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function VoiceIndicator({ volume, heard = null }) {
  const minSize = 60;
  const r = useSharedValue(minSize);
  r.value = volume + minSize;
  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value, { duration: 100 }),
  }));

  return (
    <View style={styles.feedback}>
      <View style={styles.circleContainer}>
        <Svg style={{ height: "100%" }}>
          <AnimatedCircle
            fill={Colors.secondary}
            cx="50%"
            cy="50%"
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      {/* 有结果显示结果，无结果显示图标 */}
      <View style={styles.textContainer}>
        {heard ? (
          <Animated.View entering={ZoomIn} exiting={ZoomOut}>
            <Text
              style={{ fontSize: 64, fontWeight: 300, textAlign: "center" }}>
              {heard}
            </Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Svg_Microphone color={Colors.main} size={48} />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    height: 320,
    position: "relative",
  },
  circleContainer: {
    // height: 160,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
