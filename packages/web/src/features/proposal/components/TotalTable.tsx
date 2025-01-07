import React from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table";

interface TotalTableProps {
  division: string;
  type: string;
  lastYear: number;
  thisYear: number;
  ratio: number;
}

const columnHelper = createColumnHelper<TotalTableProps>();

const columns = [
  columnHelper.accessor("division", {
    id: "division",
    header: "구분",
    cell: info => info.getValue(),
    // TODO: Add Tag
    // const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
    // return <Tag color={color}>{text}</Tag>;
    size: 64,
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "기구명",
    cell: info => info.getValue(),
    // TODO: Add Tag
    size: 64,
  }),
  columnHelper.accessor("lastYear", {
    id: "lastYear",
    header: "작년 결산",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("thisYear", {
    id: "thisYear",
    header: "올해 예산",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => info.getValue(),
    // TODO: Add Tag
    size: 64,
  }),
];

const TotalTable: React.FC<TotalTableProps> = ({
  division = "학생회비",
  type = "수입",
  lastYear = 125000,
  thisYear = 125000,
  ratio = 100.0,
}) => {
  const tableData = [
    // mock data
    {
      division,
      type,
      lastYear,
      thisYear,
      ratio,
    },
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
        통합
      </Typography>
      <Table table={table} />
    </FlexWrapper>
  );
};

export default TotalTable;
