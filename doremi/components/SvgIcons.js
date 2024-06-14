// 转换地址：
// https://react-svgr.com/playground/?native=true

import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const Svg_Complete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 200}
    height={props.size || 200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}>
    <Path d="M1024 518.315C1024 794.795 794.773 1024 505.685 1024 229.205 1024 0 794.773 0 518.315 0 229.227 229.227 0 505.685 0 794.773 0 1024 229.227 1024 518.315zm-755.093 49.962 145.6 150.656a21.205 21.205 0 0 0 30.229.47l341.333-335.936a20.95 20.95 0 0 0 .128-30.016l.704.704a24.15 24.15 0 0 0-31.68-1.216L445.952 610.56c-9.024 7.53-24.107 7.893-33.515.704l-111.85-85.717a20.821 20.821 0 0 0-29.76 4.266l-4.139 5.654c-7.04 9.557-6.037 24.256 2.219 32.81z" />
  </Svg>
);
export const Svg_Microphone = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 200}
    height={props.size || 200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}>
    <Path d="M512 672c70.4 0 128-57.6 128-128V224c0-70.4-57.6-128-128-128s-128 57.6-128 128v320c0 70.4 57.6 128 128 128z" />
    <Path d="M704 384c-15.4 0-28 12.6-28 28v138c0 90.4-73.6 164-164 164s-164-73.6-164-164V412c0-15.4-12.6-28-28-28s-28 12.6-28 28v138c0 111.8 83.8 204.4 192 218.2V872h-72c-15.4 0-28 12.6-28 28s12.6 28 28 28h200c15.4 0 28-12.6 28-28s-12.6-28-28-28h-72V768.2C648.2 754.4 732 661.8 732 550V412c0-15.4-12.6-28-28-28z" />
  </Svg>
);
