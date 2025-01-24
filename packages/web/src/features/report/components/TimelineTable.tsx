import isPropValid from "@emotion/is-prop-valid";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import React from "react";
import styled from "styled-components";

interface TimelineDetail {
  startDate: Date;
  endDate: Date;
  content?: string;
  memo?: string;
}

interface TimelineTableProps {
  contents: TimelineDetail[];
}

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
`;

const TableRow = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLast: boolean }>`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-bottom-left-radius: ${({ isLast }) => (isLast ? "4px" : "0px")};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? "4px" : "0px")};
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const TimelineTable: React.FC<TimelineTableProps> = ({ contents }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 해줘야 함
    const day = date.getDate().toString().padStart(2, "0"); // 일도 2자리로 맞추기 위해 padStart 사용

    return `${year}.${month}.${day}`;
  };

  return (
    <TableWrapper>
      <TableHeader>
        <TableCell type="Header" width="60px">
          번호
        </TableCell>
        <TableCell type="Header" width="260px">
          날짜
        </TableCell>
        <TableCell type="Header" width="302px">
          내용
        </TableCell>
        <TableCell type="Header" width="170px">
          비고
        </TableCell>
      </TableHeader>
      {contents.map((elm, index) => (
        <React.Fragment key={index}>
          <TableRow isLast={index === contents.length - 1}>
            <TableCell type="Default" width="60px">
              {index + 1}
            </TableCell>
            <TableCell
              type="Default"
              width="260px"
            >{`${formatDate(elm.startDate)} - ${formatDate(elm.endDate)}`}</TableCell>
            <TableCell type="Default" width="302px">
              {elm.content == null ? "-" : elm.content}
            </TableCell>
            <TableCell type="Default" width="170px">
              {elm.memo == null ? "-" : elm.memo}
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </TableWrapper>
  );
};

export default TimelineTable;
