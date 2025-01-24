import React from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import TextButton from "../Buttons/TextButton";

interface TableButtonCellProps {
  text: string[];
  onClick: (() => void)[];
  width?: string | number;
  minWidth?: number;
}

const CommonCellWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  width: string | number;
  minWidth: number;
}>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  min-width: ${({ width }) => `${width}px`};
  display: flex;
  justify-content: center;
  height: 48px;
  padding: 12px 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CellText = styled.table.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[100] : theme.colors.BLACK};
`;

const TableButtonCell: React.FC<TableButtonCellProps> = ({
  text,
  onClick,
  width = "150px",
  minWidth = 100,
}) => (
  <CommonCellWrapper width={width} minWidth={minWidth}>
    <ButtonsWrapper>
      {text.map((item, index) => (
        <React.Fragment key={item}>
          <TextButton text={item} onClick={onClick[index]} />
          {index < text.length - 1 && <CellText isGray>/</CellText>}
        </React.Fragment>
      ))}
    </ButtonsWrapper>
  </CommonCellWrapper>
);

export default TableButtonCell;
