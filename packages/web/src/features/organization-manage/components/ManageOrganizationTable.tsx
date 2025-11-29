import isPropValid from "@emotion/is-prop-valid";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Icon from "@sparcs-students/web/common/components/Icon";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import Typography from "@sparcs-students/web/common/components/Typography";
import React, { useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderWrapper = styled.tr`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.GREEN[700]};
  color: white;
  height: 40px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
`;

const TableContentWrapper = styled.tbody``;

const TableRowWrapper = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.WHITE};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: ${({ isLast }) => (isLast ? "0 0 4px 4px" : "0")};
  height: 48px;
`;

export interface OrganizationProps {
  id: number;
  name: string;
  memberCount: number;
  repStudentId: string;
  repName: string;
}

export interface ManageOrganizationTableProps {
  data: OrganizationProps[];
  title: string;
  onAppointPresident?: (id: number) => void;
  onRetirePresident?: (id: number) => void;
  onAddOrganization?: () => void;
}

const COL_WIDTHS = {
  idx: "80px",
  name: 0, // flex 1
  count: "120px",
  repId: "120px",
  repName: "120px",
  changeRep: "120px",
  delete: "120px",
};

const OrganizationRow: React.FC<{
  row: OrganizationProps;
  rowIndex: number;
  isLast: boolean;
  onAppointPresident?: (id: number) => void;
  onRetirePresident?: (id: number) => void;
}> = ({
  row,
  rowIndex,
  isLast,
  onAppointPresident = undefined,
  onRetirePresident = undefined,
}) => (
  <TableRowWrapper isLast={isLast}>
    <TableCell type="Default" width={COL_WIDTHS.idx}>
      {rowIndex + 1}
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.name}>
      {row.name}
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.count}>
      {row.memberCount}
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.repId}>
      {row.repStudentId}
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.repName}>
      {row.repName}
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.changeRep}>
      <Icon
        type="subdirectory_arrow_left" // Using a similar icon for "Change" or "Return"
        size={16}
        onClick={() => {
          if (onAppointPresident) onAppointPresident(row.id);
        }}
        color="BLACK"
      />
    </TableCell>
    <TableCell type="Default" width={COL_WIDTHS.delete}>
      <Icon
        type="delete"
        size={16}
        onClick={() => {
          if (onRetirePresident) onRetirePresident(row.id);
        }}
        color="BLACK"
      />
    </TableCell>
  </TableRowWrapper>
);

const ManageOrganizationTable: React.FC<ManageOrganizationTableProps> = ({
  data,
  title,
  onAppointPresident = undefined,
  onRetirePresident = undefined,
  onAddOrganization = undefined,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dynamicHeight, setDynamicHeight] = useState<number>(
    36 + (data.length + 1) * 48 + 125,
  );

  return (
    <FlexWrapper direction="column" gap={16}>
      <FlexWrapper
        direction="row"
        justify="space-between"
        gap={10}
        style={{ alignItems: "center" }}
      >
        <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
          {title}
        </Typography>
        {onAddOrganization && (
          <Button
            onClick={onAddOrganization}
            style={{ width: "80px", padding: "8px", fontSize: "14px" }}
          >
            기구 추가
          </Button>
        )}
      </FlexWrapper>
      <FlexWrapper
        direction="column"
        gap={16}
        height={`${dynamicHeight}px`}
        xOverflow
      >
        <TableWrapper>
          <thead>
            <TableHeaderWrapper>
              <TableCell type="Header" width={COL_WIDTHS.idx}>
                번호
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.name}>
                기구명
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.count}>
                기구 인원
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.repId}>
                대표자 학번
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.repName}>
                대표자 이름
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.changeRep}>
                대표자 변경
              </TableCell>
              <TableCell type="Header" width={COL_WIDTHS.delete}>
                기구 삭제
              </TableCell>
            </TableHeaderWrapper>
          </thead>
          <TableContentWrapper>
            {data.map((row, idx) => (
              <OrganizationRow
                key={row.id}
                row={row}
                rowIndex={idx}
                isLast={idx === data.length - 1}
                onAppointPresident={onAppointPresident}
                onRetirePresident={onRetirePresident}
              />
            ))}
          </TableContentWrapper>
        </TableWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default ManageOrganizationTable;
