import React from "react";
import styled from "styled-components";

export type LightTagColor = "GREEN100" | "GRAY";

export interface MemberProps {
  id: string;
  name: string;
  groups: string[];
}

const TagInner = styled.div<{
  color: LightTagColor;
  width: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isDropdown?: boolean;
  isInGroup?: boolean;
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
  ${({ isInGroup, theme }) =>
    isInGroup && `box-shadow: 0px 0 0 4px ${theme.colors.GRAY[200]}`};
`;

interface GroupsTagProps extends React.PropsWithChildren {
  color?: LightTagColor;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  rowId?: string;
  editData?: MemberProps[];
  isDropdown: boolean;
}

const GroupsTag: React.FC<GroupsTagProps> = ({
  children = <div />,
  color = "GREEN100",
  width = "fit-content",
  onClick = undefined,
  rowId = "",
  editData = [],
  isDropdown = false,
}) => {
  const isInGroup = editData.some(
    member =>
      member.id === rowId &&
      member.groups.includes(children ? children.toString() : ""),
  );

  return (
    <TagInner
      color={color}
      width={width}
      onClick={onClick}
      isDropdown={isDropdown}
      isInGroup={isInGroup}
    >
      {children}
    </TagInner>
  );
};

export default GroupsTag;
