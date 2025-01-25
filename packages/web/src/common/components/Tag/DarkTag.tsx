import React from "react";
import styled from "styled-components";

export type DarkTagColor =
  | "MAROON"
  | "MARINE"
  | "LEMON"
  | "MELON"
  | "CYAN"
  | "ORCHID"
  | "BLUE"
  | "RED500"
  | "RED700"
  | "TEAL"
  | "YELLOW";

const TagInner = styled.div<{ color: DarkTagColor; width: string }>`
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
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme, color }) => {
    if (color === "BLUE") {
      return theme.colors.BLUE[900];
    }
    if (color === "YELLOW") {
      return theme.colors.YELLOW[600];
    }
    if (color === "RED500") {
      return theme.colors.RED[500];
    }
    if (color === "RED700") {
      return theme.colors.RED[700];
    }
    return theme.colors[color][700];
  }};
  border-radius: ${({ theme }) => theme.round.sm};
  text-align: center;
`;

interface TagProps extends React.PropsWithChildren {
  color?: DarkTagColor;
  width?: string;
}

const DarkTag: React.FC<TagProps> = ({
  children = <div />,
  color = "MELON",
  width = "fit-content",
}) => (
  <TagInner color={color} width={width}>
    {children}
  </TagInner>
);

export default DarkTag;
