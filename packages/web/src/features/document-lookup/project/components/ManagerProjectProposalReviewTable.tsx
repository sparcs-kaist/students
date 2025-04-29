import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import { ProjectProposalDetailTotalReview } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { getbudgetStatusTag } from "@sparcs-students/web/features/document-lookup/util/tableTagList";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";

interface MemberTableProps {
  data: ProjectProposalDetailTotalReview[];
}

const columnHelper = createColumnHelper<ProjectProposalDetailTotalReview>();

const columns = [
  columnHelper.accessor("reviewStatus", {
    id: "reviewStatus",
    header: "현황",
    cell: info => {
      const { color, text } = getbudgetStatusTag(info.getValue());
      return (
        <TableCell type="Default" width="100px">
          {color !== "GRAY" ? (
            <DarkTag color={color as DarkTagColor}>{text}</DarkTag>
          ) : (
            <LightTag color={color as LightTagColor}>{text}</LightTag>
          )}
        </TableCell>
      );
    },
    size: 110,
  }),
  columnHelper.accessor("reviewText", {
    id: "reviewText",
    header: "설명",
    cell: info => info.getValue(),
    size: 0,
    minSize: 700,
  }),
];

const ManagerProjectProposalReviewTable: React.FC<MemberTableProps> = ({
  data,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      {loaded && <Table table={table} emptyMessage="검토 내역이 없습니다." />}
    </FlexWrapper>
  );
};

export default ManagerProjectProposalReviewTable;
