import React from "react";
import styled from "styled-components";

export type LightTagColor =
  | "GREEN800"
  | "GREEN600"
  | "GREEN100"
  | "BLUE"
  | "PINK"
  | "YELLOW"
  | "GRAY"
  | "CYAN"
  | "MAROON"
  | "AMBER"
  | "LEMON"
  | "MELON"
  | "TEAL"
  | "MARINE"
  | "ORCHID"
  | "THISTLE"
  | "CHERRY";

const TagInner = styled.div<{ color: LightTagColor; width: string }>`
  position: relative;
  width: ${({ width }) => width};
  padding: ${({ width }) => (width === "fit-content" ? "4px 12px" : "4px 0px")};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 12px;
    line-height: 14px;
    padding: 2px 8px;
  }
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  border-style: solid;
  border-width: ${({ color }) => (color === "GREEN100" ? "1px" : "0px")};
  border-color: ${({ theme, color }) =>
    color === "GREEN100" && theme.colors.GREEN[700]};
  color: ${({ theme, color }) => {
    if (color === "GRAY") {
      return theme.colors.BLACK;
    }
    if (color === "GREEN100") {
      return theme.colors.GREEN[700];
    }
    if (color === "GREEN600") {
      return theme.colors.WHITE;
    }
    if (color === "GREEN800") {
      return theme.colors.WHITE;
    }
    if (color === "BLUE") {
      return theme.colors.BLUE[900];
    }
    if (color === "PINK") {
      return theme.colors.PINK[900];
    }
    if (color === "YELLOW") {
      return theme.colors.YELLOW[900];
    }
    if (color === "THISTLE") {
      return theme.colors.THISTLE[900];
    }
    if (color === "CHERRY") {
      return theme.colors.CHERRY[900];
    }
    return theme.colors[color][700];
  }};
  background-color: ${({ theme, color }) => {
    if (color === "GRAY") {
      return theme.colors.GRAY[100];
    }
    if (color === "GREEN100") {
      return theme.colors.GREEN[100];
    }
    if (color === "GREEN600") {
      return theme.colors.GREEN[600];
    }
    if (color === "GREEN800") {
      return theme.colors.GREEN[800];
    }
    if (color === "THISTLE") {
      return theme.colors.THISTLE[100];
    }
    if (color === "CHERRY") {
      return theme.colors.CHERRY[100];
    }
    return theme.colors[color][300];
  }};
  border-radius: ${({ theme }) => theme.round.sm};
  text-align: center;
`;

interface TagProps extends React.PropsWithChildren {
  color?: LightTagColor;
  width?: string;
}

const LightTag: React.FC<TagProps> = ({
  children = <div />,
  color = "BLUE",
  width = "fit-content",
}) => (
  <TagInner color={color} width={width}>
    {children}
  </TagInner>
);

export default LightTag;
