import React, { ReactNode } from "react";
import styled from "styled-components";
import colors from "@sparcs-students/web/styles/themes/colors";
import isPropValid from "@emotion/is-prop-valid";
import Icon from "../Icon";

interface TableCellProps {
  type: "Default" | "None" | "Tag" | "Header" | "HeaderSort";
  children: ReactNode;
  width?: string | number;
  minWidth?: number;
}

const CommonCellWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  isHeader: boolean;
  width: string | number;
  minWidth: number;
}>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  min-width: ${({ minWidth }) => `${minWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ isHeader }) => (isHeader ? "12px 8px" : "12px 20px")};
  height: ${({ isHeader }) => (isHeader ? "36px" : "48px")};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  background-color: ${({ theme, isHeader }) =>
    isHeader ? theme.colors.PRIMARY : "transparent"};
`;

const CellText = styled.table.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isGray: boolean }>`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[100] : theme.colors.BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeaderInner = styled.div`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 18px;
  line-height: 20px;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0px;
  padding-left: 20px;
`;

const TableCell: React.FC<TableCellProps> = ({
  type,
  children,
  width = "150px",
  minWidth = 60,
}) => {
  const isHeader = type === "Header" || type === "HeaderSort";
  let content;

  switch (type) {
    case "Default":
      content = <CellText isGray={false}>{children}</CellText>;
      break;
    case "None":
      content = <CellText isGray>{children}</CellText>;
      break;
    case "Tag":
      content = children;
      break;
    case "Header":
      content = <HeaderInner>{children}</HeaderInner>;
      break;
    case "HeaderSort":
      content = (
        <SortWrapper>
          <HeaderInner>{children}</HeaderInner>
          <Icon type="arrow_drop_down" size={24} color={colors.WHITE} />
        </SortWrapper>
      );
      break;
    default:
      throw new Error(`Unhandled cell type: ${type}`);
  }

  return (
    <CommonCellWrapper width={width} minWidth={minWidth} isHeader={isHeader}>
      {content}
    </CommonCellWrapper>
  );
};

export default TableCell;
