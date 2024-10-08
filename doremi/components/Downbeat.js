// 起拍指示符
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "./ComStyle";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import React, { useEffect, useState } from "react";

function Dot({ delay = 0, onTimeout }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onTimeout();
    }, delay);
    return () => {
      clearTimeout(timer);
      setShow(true);
    };
  }, [delay]);
  return (
    <View>
      {show && (
        <Animated.View style={styles.dot} exiting={FadeOut}></Animated.View>
      )}
    </View>
  );
}

export default function DownBeat({ tempo = 60, time = 4, ending }) {
  // 每拍时长(毫秒)
  const dur = 60000 / tempo;

  // 生成一个序列再渲染的方式
  // const dots = Array.from({ length: time }, (v, i) => i);
  // return (
  //   <View style={styles.container}>
  //     {dots.map((i) => (
  //       <Dot delay={dur * (time - i)} key={i} />
  //     ))}
  //   </View>
  // );
  const dots = [];
  for (let i = 0; i < time; i++) {
    dots.push(
      <Dot
        delay={dur * (time - i)}
        key={i}
        onTimeout={() => {
          if (i == 0) ending();
        }}
      />
    );
  }
  return <View style={styles.container}>{dots}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 32,
    height: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: Colors.secondary,
  },
});
