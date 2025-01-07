import React from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table";

interface ViewResultProps {
  fileName: string;
  organization: string;
  period: string;
  headPerson: string;
  submitDate: Date | string;
}

const columnHelper = createColumnHelper<ViewResultProps>();

const columns = [
  columnHelper.accessor("fileName", {
    id: "fileName",
    header: "파일명",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("organization", {
    id: "organization",
    header: "기구명",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("period", {
    id: "period",
    header: "반기",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("headPerson", {
    id: "headPerson",
    header: "기구장",
    cell: info => info.getValue(),
    size: 64,
  }),
  columnHelper.accessor("submitDate", {
    id: "submitDate",
    header: "제출연월일",
    cell: info => formatDotDate(info.getValue() as Date),
    size: 64,
  }),
];

const ViewResult: React.FC<ViewResultProps> = ({
  fileName = "전산학부 24년도 예산안",
  organization = "전산학부",
  period = "2024년도 하반기",
  headPerson = "김스튜",
  submitDate = new Date(),
}) => {
  const tableData = [
    {
      fileName,
      organization,
      period,
      headPerson,
      submitDate,
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
        조회 결과
      </Typography>
      <Table table={table} />
    </FlexWrapper>
  );
};

export default ViewResult;
