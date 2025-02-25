import React from "react";
import styled from "styled-components";
import {
  createColumnHelper,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";

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
  overflow: hidden;
  border-radius: 4px;
`;

const TimelineTable: React.FC<TimelineTableProps> = ({ contents }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const columnHelper = createColumnHelper<TimelineDetail>();
  const columns = [
    {
      id: "index", // custom accessor for the index column
      header: "번호",
      cell: ({ row }: { row: Row<TimelineDetail> }) => `${row.index + 1}`, // row.index를 사용하여 번호를 표시
      size: 60,
    },
    columnHelper.accessor("startDate", {
      header: "날짜",
      cell: ({ row }) => {
        const { startDate, endDate } = row.original; // row.original을 통해 원본 데이터를 접근
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      },
      size: 500,
    }),
    columnHelper.accessor("content", {
      header: "내용",
      cell: ({ row }) => {
        const rowContent = row.original.content;
        return `${rowContent === null ? "-" : rowContent}`;
      },
      size: 800,
    }),
    columnHelper.accessor("memo", {
      header: "비고",
      cell: ({ row }) => {
        const content = row.original.memo;
        return `${content === null ? "-" : content}`;
      },
      size: 1000,
    }),
  ];

  const table = useReactTable({
    columns,
    data: contents,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <TableWrapper>
      <Table table={table} />
    </TableWrapper>
  );
};

export default TimelineTable;
