import React from "react";

import styled from "styled-components";

import { Theme } from "@sparcs-students/web/styles/themes";

interface TypographyPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type ColorKeys = keyof Theme["colors"];
type NestedColorKeys<C extends ColorKeys> = C extends keyof Theme["colors"]
  ? Theme["colors"][C] extends string | number
    ? never
    : keyof Theme["colors"][C] & (string | number)
  : never;

type NestedColors = {
  [C in ColorKeys]: NestedColorKeys<C> extends never
    ? never
    : `${C}.${NestedColorKeys<C>}`;
}[ColorKeys];

type ThemeColors = ColorKeys | NestedColors;

const getColorFromTheme = (theme: Theme, colorString: ThemeColors) => {
  if (typeof colorString === "string" && colorString.includes(".")) {
    const [colorKey, shade] = colorString.split(".");
    const colorValue = theme.colors[colorKey as keyof Theme["colors"]];

    if (typeof colorValue === "object" && shade in colorValue) {
      return colorValue[shade as keyof typeof colorValue];
    }
  }

  return theme.colors[colorString as keyof Theme["colors"]];
};

interface TypographyProps extends TypographyPropsBase {
  fs?: number;
  lh?: number;
  fw?: keyof Theme["fonts"]["WEIGHT"];
  ff?: keyof Theme["fonts"]["FAMILY"];
  color?: ThemeColors;
}

const TypographyInner = styled.div<TypographyProps>`
  color: ${({ color, theme }) =>
    color ? getColorFromTheme(theme, color) : "inherit"};
  font-family: ${({ theme, ff }) =>
    ff ? theme.fonts.FAMILY[ff] : theme.fonts.FAMILY.PRETENDARD};
  font-size: ${({ fs }) => (fs ? `${fs}px` : "inherit")};
  line-height: ${({ lh }) => (lh ? `${lh}px` : "inherit")};
  font-weight: ${({ fw, theme }) => (fw ? theme.fonts.WEIGHT[fw] : "inherit")};
`;

/**
 * ## Typography component.
 * @param {Object} props - Props for the Typography component.
 * @param {React.ReactNode} props.children - Content to be rendered inside the typography element.
 * @param {number} [props.fs] - Font size of the typography element in pixels.
 * @param {number} [props.lh] - Line height of the typography element in pixels.
 * @param {keyof Theme["fonts"]["WEIGHT"]} [props.fw] - Font weight of the typography element.
 * @param {ThemeColors} [props.color] - Color of the typography element.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.divProps] - Additional props to be passed to the underlying div element.
 *
 * The Typography component is a versatile component that allows rendering text with different styles and types.
 * It accepts individual style props (`fs`, `lh`, `fw`, `color`) to customize the appearance.
 *
 * The `color` prop accepts either a top-level color key from `Theme["colors"]` or a nested color key in the format `"ColorKey.NestedColorKey"`.
 * The available color keys are defined in the `ThemeColors` type, which is generated based on the structure of `Theme["colors"]`.
 *
 */

const Typography: React.FC<TypographyProps> = ({ children, ...rest }) => (
  <TypographyInner {...rest}>{children}</TypographyInner>
);

export default Typography;
