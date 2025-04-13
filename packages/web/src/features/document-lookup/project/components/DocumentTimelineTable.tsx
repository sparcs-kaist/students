import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Table from "@sparcs-students/web/common/components/Table/Table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface DocumentTimelineProps {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  memo: string | null;
}

interface DocumentTimelineTableProps {
  data: DocumentTimelineProps[];
}

const columnHelper = createColumnHelper<DocumentTimelineProps>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "번호",
    cell: info => info.getValue(),
    size: 60,
  }),
  columnHelper.display({
    id: "dateRange",
    header: "날짜",
    cell: info => {
      const { startDate, endDate } = info.row.original;
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    },
    size: 260,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "사업명",
    cell: info => info.getValue(),
    size: 0,
    minSize: 200,
  }),
  columnHelper.accessor("memo", {
    id: "memo",
    header: "비고",
    cell: info => info.getValue() ?? "-",
    size: 0,
    minSize: 200,
  }),
];

const TableWrapper = styled.table`
  position: relative;
  height: fit-content;
  overflow-x: visible;
  border-collapse: collapse;
  min-width: 100%;
`;

const DocumentTimelineTable: React.FC<DocumentTimelineTableProps> = ({
  data,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <FlexWrapper direction="column" gap={16} xOverflow>
      <TableWrapper>
        {loaded && (
          <Table table={table} emptyMessage="테이블 정보가 없습니다." />
        )}
      </TableWrapper>
    </FlexWrapper>
  );
};

export default DocumentTimelineTable;
