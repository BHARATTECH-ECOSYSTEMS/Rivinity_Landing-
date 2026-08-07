import type { NextPage } from "next";
import { useMemo, type CSSProperties, useCallback } from "react";
import Image from "next/image";

export type Component1Type = {
  className?: string;
  vector1: string;
  vector2: string;
  vector3: string;
  vector4: string;
  vector5: string;
  vector6: string;

  /** Variant props */
  variant?: CSSProperties["variant"];

  /** Style props */
  component1Width?: CSSProperties["width"];
  component1Height?: CSSProperties["height"];
  component1Flex?: CSSProperties["flex"];

  /** Action props */
  onComponent1ContainerClick?: () => void;
};

const getComponent1ContainerStyle = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[flex-shrink:unset]";
    case "27":
      return "[&]:[flex-shrink:unset] [&]:flex [&]:items-start [&]:isolate";
  }
};
const getVectorIconStyle = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[51.67%] [&]:w-[27.36%] [&]:top-[24.17%] [&]:right-[71.91%] [&]:bottom-[24.17%] [&]:left-[0.73%]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[54.58%] [&]:w-[20.64%] [&]:top-[23.96%] [&]:right-[0%] [&]:bottom-[21.46%] [&]:left-[79.36%] [&]:!!m-[0 important] [&]:z-[0]";
    case "44":
      return "[&]:h-[85%] [&]:w-[17.57%] [&]:right-[82.43%] [&]:bottom-[15%]";
    case "48":
      return "[&]:h-[97.14%] [&]:right-[0%] [&]:bottom-[2.86%]";
  }
};
const getVectorIcon1Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[15.09%] [&]:top-[35.21%] [&]:right-[33.64%] [&]:bottom-[46.04%] [&]:left-[51.27%]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[71.04%] [&]:w-[21.36%] [&]:top-[23.96%] [&]:right-[21.91%] [&]:bottom-[5%] [&]:left-[56.73%] [&]:!!m-[0 important] [&]:z-[1]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[69.38%] [&]:w-[9.82%] [&]:top-[10.31%] [&]:right-[0.22%] [&]:bottom-[20.31%] [&]:left-[89.96%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[36.43%] [&]:w-[9.65%] [&]:top-[32.14%] [&]:right-[11.53%] [&]:bottom-[31.43%] [&]:left-[78.82%] [&]:z-[1]";
  }
};
const getVectorIcon2Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[10.55%] [&]:top-[35.21%] [&]:right-[26.73%] [&]:bottom-[46.04%] [&]:left-[62.73%] [&]:z-[1]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[15.42%] [&]:w-[7%] [&]:top-[5%] [&]:right-[45.82%] [&]:bottom-[79.58%] [&]:left-[47.18%] [&]:!!m-[0 important] [&]:z-[2]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[68.44%] [&]:w-[3.54%] [&]:top-[10.31%] [&]:right-[11.55%] [&]:bottom-[21.25%] [&]:left-[84.91%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[34.29%] [&]:w-[5.41%] [&]:top-[31.07%] [&]:right-[45.65%] [&]:bottom-[34.64%] [&]:left-[48.94%] [&]:z-[1]";
  }
};
const getVectorIcon3Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[16.64%] [&]:top-[35.21%] [&]:right-[13.36%] [&]:bottom-[46.04%] [&]:left-[70%] [&]:z-[2]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[52.71%] [&]:w-[7%] [&]:top-[25%] [&]:right-[45.82%] [&]:left-[47.18%] [&]:!!m-[0 important] [&]:z-[3]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[72.81%] [&]:w-[3.32%] [&]:top-[5.94%] [&]:right-[17.96%] [&]:bottom-[21.25%] [&]:left-[78.72%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[26.07%] [&]:w-[7.29%] [&]:top-[38.93%] [&]:right-[51.76%] [&]:bottom-[35%] [&]:left-[40.94%] [&]:z-[1]";
  }
};
const getVectorIcon4Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[15.09%] [&]:top-[35%] [&]:right-[0.73%] [&]:bottom-[46.25%] [&]:left-[84.18%] [&]:z-[3]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[53.33%] [&]:w-[12.18%] [&]:top-[24.38%] [&]:right-[54.55%] [&]:bottom-[22.29%] [&]:left-[33.27%] [&]:!!m-[0 important] [&]:z-[4]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[73.59%] [&]:w-[14.29%] [&]:top-[26.41%] [&]:right-[23.63%] [&]:bottom-[0%] [&]:left-[62.08%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[26.79%] [&]:w-[8%] [&]:top-[38.93%] [&]:right-[60.12%] [&]:bottom-[34.29%] [&]:left-[31.88%] [&]:z-[1]";
  }
};
const getVectorIcon5Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[15.18%] [&]:top-[35.21%] [&]:right-[46.18%] [&]:bottom-[46.04%] [&]:left-[38.64%] [&]:z-[1]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[66.67%] [&]:w-[12.09%] [&]:top-[11.88%] [&]:right-[68.91%] [&]:bottom-[21.46%] [&]:left-[19%] [&]:!!m-[0 important] [&]:z-[5]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[53.91%] [&]:w-[13.94%] [&]:top-[26.41%] [&]:right-[40.18%] [&]:bottom-[19.69%] [&]:left-[45.88%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[37.5%] [&]:w-[8.12%] [&]:top-[38.93%] [&]:right-[69.29%] [&]:bottom-[23.57%] [&]:left-[22.59%] [&]:z-[1]";
  }
};
const getVectorIcon6Style = (styleKey: string) => {
  switch (styleKey) {
    case "18":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[18.75%] [&]:w-[16.27%] [&]:top-[35.21%] [&]:right-[59.82%] [&]:bottom-[46.04%] [&]:left-[23.91%] [&]:z-[2]";
    case "27":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(10%)_saturate(298%)_hue-rotate(187deg)_brightness(98%)_contrast(89%)] [&]:h-[54.79%] [&]:w-[17.64%] [&]:top-[23.96%] [&]:right-[82.36%] [&]:bottom-[21.25%] [&]:left-[0%] [&]:!!m-[0 important] [&]:z-[6]";
    case "44":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(90%)_saturate(7461%)_hue-rotate(146deg)_brightness(107%)_contrast(109%)] [&]:h-[72.81%] [&]:w-[15.62%] [&]:top-[5.94%] [&]:right-[55.71%] [&]:bottom-[21.25%] [&]:left-[28.67%]";
    case "48":
      return "[&]:[filter:brightness(0)_saturate(100%)_invert(96%)_sepia(2%)_saturate(542%)_hue-rotate(339deg)_brightness(103%)_contrast(96%)] [&]:h-[36.43%] [&]:w-[11.88%] [&]:top-[28.57%] [&]:right-[77.53%] [&]:bottom-[35%] [&]:left-[10.59%] [&]:z-[1]";
  }
};

const Component1: NextPage<Component1Type> = ({
  className = "",
  variant = 1,
  onComponent1ContainerClick,
  component1Width,
  component1Height,
  component1Flex,
  vector1,
  vector2,
  vector3,
  vector4,
  vector5,
  vector6,
}) => {
  const variantKey = `${variant}`;

  const component1Style: CSSProperties = useMemo(() => {
    return {
      width: component1Width,
      height: component1Height,
      flex: component1Flex,
    };
  }, [component1Width, component1Height, component1Flex]);

  const onComponent1ContainerClick1 = useCallback(() => {
    window.open("https://replit.com/");
  }, []);

  return (
    <div
      className={`w-[122px] h-[35px] relative overflow-hidden shrink-0 cursor-pointer ${getComponent1ContainerStyle(variantKey)} ${className}`}
      onClick={onComponent1ContainerClick}
      style={component1Style}
    >
      <Image
        className={`absolute h-[84%] w-[17.62%] top-[0%] right-[82.38%] bottom-[16%] left-[0%] max-w-full overflow-hidden max-h-full ${getVectorIconStyle(variantKey)}`}
        width={21.5}
        height={29.4}
        sizes="100vw"
        alt=""
        src="/Vector.svg"
      />
      <Image
        className={`absolute h-[68.57%] w-[9.84%] top-[10.29%] right-[0%] bottom-[21.14%] left-[90.16%] max-w-full overflow-hidden max-h-full ${getVectorIcon1Style(variantKey)}`}
        width={12}
        height={24}
        sizes="100vw"
        alt=""
        src={vector1}
      />
      <Image
        className={`absolute h-[67.71%] w-[3.52%] top-[10.29%] right-[11.39%] bottom-[22%] left-[85.08%] max-w-full overflow-hidden max-h-full ${getVectorIcon2Style(variantKey)}`}
        width={4.3}
        height={23.7}
        sizes="100vw"
        alt=""
        src={vector2}
      />
      <Image
        className={`absolute h-[72%] w-[3.36%] top-[5.71%] right-[17.7%] bottom-[22.29%] left-[78.93%] max-w-full overflow-hidden max-h-full ${getVectorIcon3Style(variantKey)}`}
        width={4.1}
        height={25.2}
        sizes="100vw"
        alt=""
        src={vector3}
      />
      <Image
        className={`absolute h-[72.86%] w-[14.34%] top-[26.29%] right-[23.44%] bottom-[0.86%] left-[62.21%] max-w-full overflow-hidden max-h-full ${getVectorIcon4Style(variantKey)}`}
        width={17.5}
        height={25.5}
        sizes="100vw"
        alt=""
        src={vector4}
      />
      <Image
        className={`absolute h-[53.43%] w-[13.93%] top-[26.29%] right-[40.08%] bottom-[20.29%] left-[45.98%] max-w-full overflow-hidden max-h-full ${getVectorIcon5Style(variantKey)}`}
        width={17}
        height={18.7}
        sizes="100vw"
        alt=""
        src={vector5}
      />
      <Image
        className={`absolute h-[72%] w-[15.66%] top-[5.71%] right-[55.57%] bottom-[22.29%] left-[28.77%] max-w-full overflow-hidden max-h-full ${getVectorIcon6Style(variantKey)}`}
        width={19.1}
        height={25.2}
        sizes="100vw"
        alt=""
        src={vector6}
      />
    </div>
  );
};

export default Component1;
