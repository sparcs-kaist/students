import React from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table";

interface IncomeTableProps {
  code: number;
  division: string;
  budgetType: string;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number;
  reason: string;
  status: string;
}

const columnHelper = createColumnHelper<IncomeTableProps>();

const columns = [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => info.getValue(),
    // TODO: Add Tag
    // const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
    // return <Tag color={color}>{text}</Tag>;
    size: 64,
  }),
  columnHelper.accessor("division", {
    id: "division",
    header: "구분",
    cell: info => info.getValue(),
    // TODO: Add Tag
    size: 64,
  }),
  columnHelper.accessor("budgetType", {
    id: "budgetType",
    header: "예산 분류",
    cell: info => info.getValue(),
    // TODO: Add Tag
    size: 64,
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => info.getValue(),
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
  columnHelper.accessor("reason", {
    id: "reason",
    header: "근거",
    cell: info => info.getValue(),
    // TODO: Add Button (Componentize)
    size: 64,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "현황",
    cell: info => info.getValue(),
    // TODO: Add Tag
    size: 64,
  }),
];

const IncomeTable: React.FC<IncomeTableProps> = ({
  code = 101,
  division = "학생회비",
  budgetType = "기층기구회계",
  item = "기층기구회계 지원금",
  lastYear = 125000,
  thisYear = 125000,
  ratio = 100.0,
  reason = "대충 어쩌구저쩌구한 근거",
  status = "승인",
}) => {
  const tableData = [
    // mock data
    {
      code,
      division,
      budgetType,
      item,
      lastYear,
      thisYear,
      ratio,
      reason,
      status,
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
        수입
      </Typography>
      <Table table={table} />
    </FlexWrapper>
  );
};

export default IncomeTable;
