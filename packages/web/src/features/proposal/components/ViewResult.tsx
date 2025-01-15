import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table";

export interface ViewResultProps {
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
    size: 200,
  }),
  columnHelper.accessor("organization", {
    id: "organization",
    header: "기구명",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor("period", {
    id: "period",
    header: "반기",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor("headPerson", {
    id: "headPerson",
    header: "기구장",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor("submitDate", {
    id: "submitDate",
    header: "제출연월일",
    cell: info => formatDotDate(info.getValue() as Date),
    size: 200,
  }),
];

const ViewResult: React.FC<ViewResultProps> = ({
  fileName,
  organization,
  period,
  headPerson,
  submitDate,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
      {loaded && <Table table={table} />}
    </FlexWrapper>
  );
};

export default ViewResult;
