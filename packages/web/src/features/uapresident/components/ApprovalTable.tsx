import React from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Icon from "@sparcs-students/web/common/components/Icon";
import Table from "@sparcs-students/web/common/components/Table/Table";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";

export interface ApprovalItem {
  id: number;
  type: string;
  orgName: string;
  submissionDate: string;
  totalItems: number;
  approvedItems: number;
  status: string;
}

export interface ApprovalTableProps {
  data: ApprovalItem[];
}

const columnHelper = createColumnHelper<ApprovalItem>();

const columns = [
  columnHelper.accessor("id", {
    header: "번호",
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("type", {
    header: "종류",
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("orgName", {
    header: "기구명",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor("submissionDate", {
    header: "제출연월일",
    cell: info => info.getValue(),
    size: 160,
  }),
  columnHelper.accessor("totalItems", {
    header: "총 항목 수",
    cell: info => info.getValue(),
    size: 160,
  }),
  columnHelper.accessor("approvedItems", {
    header: "승인 항목 수",
    cell: info => info.getValue(),
    size: 160,
  }),
  columnHelper.display({
    id: "view",
    header: "보기",
    cell: info => (
      <Icon
        type="subdirectory_arrow_left"
        size={16}
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log("View", info.row.original.id);
        }}
        color="BLACK"
      />
    ),
    size: 80,
  }),
  columnHelper.display({
    id: "result",
    header: "검토 결과",
    cell: info => (
      <FlexWrapper
        direction="row"
        gap={8}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <DarkTag
          color={
            (info.row.original.status === "승인"
              ? "BLUE"
              : "GRAY.200") as DarkTagColor
          }
          width="60px"
        >
          {info.row.original.status}
        </DarkTag>
        <Icon type="expand_more" size={20} color="BLACK" />
      </FlexWrapper>
    ),
    size: 120,
  }),
];

const ApprovalTable: React.FC<ApprovalTableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Table table={table} />;
};

export default ApprovalTable;
