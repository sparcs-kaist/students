import React from "react";
import styled from "styled-components";

export type LightTagColor = "GREEN100" | "GRAY";

const TagInner = styled.div<{
  color: LightTagColor;
  width: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isDropdown?: boolean;
}>`
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
  border-width: 1px;
  border-color: ${({ theme, color }) => {
    if (color === "GRAY") {
      return theme.colors.GRAY[700];
    }
    if (color === "GREEN100") {
      return theme.colors.GREEN[700];
    }
    return theme.colors[color][700];
  }};
  color: ${({ theme, color }) => {
    if (color === "GRAY") {
      return theme.colors.GRAY[700];
    }
    if (color === "GREEN100") {
      return theme.colors.GREEN[700];
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
    return theme.colors[color][300];
  }};
  border-radius: ${({ theme }) => theme.round.sm};
  text-align: center;
  // TODO-JM: isDropdown일 떄만 작동하도록 수정. 호버일 때만 패딩 값 늘리고 다시 감싸서 배경 색 주자...ㅋㅋ 디테일 따져야될까? 그냥 4px로 통일하고, 나중에 수정하는 편이 나을듯...ㅋㅋㅋ
  &:hover {
    ${({ isDropdown, theme }) =>
      isDropdown && `box-shadow: 0px 0 0 4px ${theme.colors.GRAY[200]}`};
  }
`;

interface GroupsTagProps extends React.PropsWithChildren {
  color?: LightTagColor;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isDropdown?: boolean; // TODO-JM: 필수로 바꿔야 됨.
}

const GroupsTag: React.FC<GroupsTagProps> = ({
  children = <div />,
  color = "GREEN100",
  width = "fit-content",
  onClick = undefined,
  isDropdown = false,
}) => (
  <TagInner
    color={color}
    width={width}
    onClick={onClick}
    isDropdown={isDropdown}
  >
    {children}
  </TagInner>
);

export default GroupsTag;
