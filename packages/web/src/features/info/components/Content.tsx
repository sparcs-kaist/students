import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import styled, { DefaultTheme } from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ContentProps {
  content: string;
  withArrow?: boolean;
  isSubContent?: boolean;
  selected: boolean;
  onClick: () => void;
}

const getTextColor = (props: {
  theme: DefaultTheme;
  selected: boolean;
  isSubContent: boolean;
}) => {
  const { theme, selected, isSubContent } = props;

  if (selected && !isSubContent) return theme.colors.WHITE;
  if (selected && isSubContent) return theme.colors.PRIMARY;
  return theme.colors.BLACK;
};

const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  isSubContent: boolean;
  selected: boolean;
}>`
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  background-color: ${({ theme, selected, isSubContent }) =>
    selected && !isSubContent && theme.colors.PRIMARY};
  border-left: ${({ theme, isSubContent }) =>
    isSubContent && `1px solid ${theme.colors.GRAY[200]}`};
  border-right: ${({ theme, isSubContent }) =>
    isSubContent && `1px solid ${theme.colors.GRAY[200]}`};
  border: ${({ theme, isSubContent }) =>
    !isSubContent && `1px solid ${theme.colors.PRIMARY}`};
  padding: ${({ isSubContent }) => (isSubContent ? "12px 48px" : "12px 24px")};
  gap: 10px;

  color: ${getTextColor};
  font-weight: ${({ theme, selected }) =>
    selected && theme.fonts.WEIGHT.SEMIBOLD};
`;

const Content: React.FC<ContentProps> = ({
  content,
  withArrow = false,
  isSubContent = false,
  selected,
  onClick,
}) => (
  <ContentWrapper
    isSubContent={isSubContent}
    selected={selected}
    onClick={onClick}
  >
    {content}
    {withArrow &&
      !isSubContent &&
      (selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
  </ContentWrapper>
);

export default Content;
