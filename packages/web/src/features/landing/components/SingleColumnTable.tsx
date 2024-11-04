import React from "react";
import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import { Typography } from "@mui/material";
import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";

interface TableRowData {
  id: string;
  contents: string;
}

const data: TableRowData[] = [
  { id: "1", contents: "첫 번째 내용" },
  { id: "2", contents: "두 번째 내용" },
  { id: "3", contents: "세 번째 내용" },
];

const TableWrapper = styled.div`
  width: 100%;
  max-width: 567px;
  border-radius: 4px;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;

const TableRow = styled.div`
  display: flex;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 2px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-right: 2px solid ${({ theme }) => theme.colors.GRAY[100]};
  &:first-child {
    border-bottom: none;
    border-left: 2px solid ${({ theme }) => theme.colors.GREEN[600]};
    border-right: 2px solid ${({ theme }) => theme.colors.GREEN[600]};
    cursor: none;
  }
  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const SingleColumnTable: React.FC = () => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="100%">
        <HeaderWrapper>
          <Typography fontSize={20} fontWeight={700} lineHeight={1}>
            안건지/회의록
          </Typography>
          <TextButton text="더보기" />
        </HeaderWrapper>
      </TableCell>
    </TableRow>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell type="Default" width="100%">
          <ContentsWrapper>{row.contents}</ContentsWrapper>
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default SingleColumnTable;
