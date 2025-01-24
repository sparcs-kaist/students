import React from "react";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import TextButton from "../Buttons/TextButton";

interface TableProps {
  header: string;
  clickable?: boolean;
  rows: { tag?: string; content: string; date?: Date; link?: string }[];
  buttonEnable?: boolean;
  mini?: boolean;
  moreLink?: string;
}

interface TableRowProps {
  clickable?: boolean;
  mini?: boolean;
}

const TableWrapper = styled.div<TableRowProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${({ mini }) => (mini ? "4px" : "8px")};
  overflow: hidden;

  & > *:last-child {
    border-radius: ${({ mini }) =>
      mini ? "0px 0px 4px 4px" : "0px 0px 8px 8px"};
  }
`;

const HeaderText = styled.div<TableRowProps>`
  font-size: ${({ mini }) => (mini ? "14px" : "18px")};
  line-height: ${({ mini }) => (mini ? "12px" : "20px")};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  color: ${({ theme }) => theme.colors.WHITE};
`;

const TableHeader = styled.div<TableRowProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  background-color: ${({ theme }) => theme.colors.GREEN[600]};
  padding: ${({ mini }) => (mini ? "8px 12px" : "8px 20px")};
  font-weight: bold;
`;

const TableRow = styled.div<TableRowProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};

  background-color: transparent;
  color: ${({ theme }) => theme.colors.BLACK};
  padding: ${({ mini }) => (mini ? "8px 12px" : "12px 20px")};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  white-space: nowrap;

  overflow: hidden;

  & > *:not(:last-child) {
    margin-right: ${({ mini }) => (mini ? "5px" : "10px")};
  }
`;

const TableRowText = styled.div<TableRowProps>`
  font-size: ${({ mini }) => (mini ? "12px" : "16px")};
  line-height: ${({ mini }) => (mini ? "12px" : "20px")};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const EmptyRowText = styled.div<TableRowProps>`
  font-size: ${({ mini }) => (mini ? "12px" : "16px")};
  line-height: ${({ mini }) => (mini ? "12px" : "20px")};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const TableRowContents = styled.div<TableRowProps>`
  gap: ${({ mini }) => (mini ? "5px" : "10px")};
  justify-content: flex-start;
  align-items: center;
  display: flex;
  white-space: nowrap;
  flex-grow: 1;

  overflow: hidden;
  flex-shrink: 1;

  & > *:not(:first-child) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SingleColumnTable: React.FC<TableProps> = ({
  header,
  clickable = true,
  rows,
  buttonEnable = true,
  mini = false,
  moreLink = null,
}) => {
  const router = useRouter();

  function formatDate(date?: Date): string {
    if (date) {
      const today = new Date();
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

      if (diffDays === 0) {
        return "오늘";
      }
      if (diffDays === 1) {
        return "어제";
      }
      if (diffDays >= 2 && diffDays <= 5) {
        return `${diffDays}일 전`;
      }
      if (diffDays > 5) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    }
    return "";
  }

  const handleRowClick = (link: string) => {
    if (link) {
      router.push(link);
    }
  };

  const handleMoreButtonClick = () => {
    if (moreLink) {
      router.push(moreLink);
    }
  };

  return (
    <TableWrapper mini={mini}>
      <TableHeader mini={mini}>
        <HeaderText mini={mini}>{header}</HeaderText>
        {buttonEnable && (
          <TextButton
            text="더보기"
            onClick={() => {
              handleMoreButtonClick();
            }}
            white
            light
            mini={mini}
          />
        )}
      </TableHeader>

      {rows.length > 0 ? (
        rows.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => {
              if (clickable && row.link) {
                handleRowClick(row.link);
              }
            }}
            clickable={clickable}
            mini={mini}
          >
            <TableRowContents mini={mini}>
              {row.tag && (
                <TableRowText mini={mini}>{`[${row.tag}]`}</TableRowText>
              )}
              <TableRowText mini={mini}>{row.content}</TableRowText>
            </TableRowContents>
            <TableRowText mini={mini}>{formatDate(row.date)}</TableRowText>
          </TableRow>
        ))
      ) : (
        <TableRow mini={mini}>
          <EmptyRowText mini={mini}>테이블이 비어있습니다.</EmptyRowText>
        </TableRow>
      )}
    </TableWrapper>
  );
};

export default SingleColumnTable;
