import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Table from "@sparcs-students/web/common/components/Table/Table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProjectTimelineProps,
  TimelineDateTypeEnum,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";

interface DocumentTimelineTableProps {
  data: ProjectTimelineProps[];
}

const columnHelper = createColumnHelper<ProjectTimelineProps>();

const getColumns = (dataLength: number) => [
  columnHelper.accessor("id", {
    id: "id",
    header: "번호",
    cell: info => dataLength - info.row.index, // CHACHA:
    size: 60,
  }),
  columnHelper.display({
    id: "date",
    header: "날짜",
    cell: info => {
      const { date } = info.row.original;
      if (date.type === TimelineDateTypeEnum.FirstHalf) {
        return "상반기";
      }
      if (date.type === TimelineDateTypeEnum.SecondHalf) {
        return "하반기";
      }
      return `${formatDotDate(date.value[0] as Date)} - ${formatDotDate(date.value[1] as Date)}`;
    },
    size: 260,
  }),
  columnHelper.accessor("content", {
    id: "content",
    header: "사업명",
    cell: info => info.getValue(),
    size: 0,
    minSize: 200,
  }),
  columnHelper.accessor("reason", {
    id: "reason",
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
  const columns = getColumns(data.length);

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
