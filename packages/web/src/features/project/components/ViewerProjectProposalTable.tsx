import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import { getbudgetStatusTag } from "@sparcs-students/web/features/documents/utils/tableTagList";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { useRouter } from "next/navigation";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

export interface ViewerProjectProposalProps {
  id: string;
  name: string;
  projectPeriod: string;
  status: DocumentReviewStatusEnum;
}

interface ProjectProposalTableProps {
  pageId: string | string[];
  data: ViewerProjectProposalProps[];
}

const columnHelper = createColumnHelper<ViewerProjectProposalProps>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "번호",
    cell: info => info.getValue(),
    size: 90,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "사업명",
    cell: info => info.getValue(),
    size: 861,
  }),
  columnHelper.accessor("projectPeriod", {
    id: "projectPeriod",
    header: "사업 기간",
    cell: info => info.getValue(),
    size: 390,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "현황",
    cell: info => {
      const { color, text } = getbudgetStatusTag(info.getValue());
      return color !== "GRAY" ? (
        <DarkTag color={color as DarkTagColor}>{text}</DarkTag>
      ) : (
        <LightTag color={color as LightTagColor}>{text}</LightTag>
      );
    },
    size: 165,
  }),
];

const ViewerProjectProposalTable: React.FC<ProjectProposalTableProps> = ({
  pageId,
  data,
}) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

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
      <FlexWrapper direction="row" gap={12}>
        <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
          사업계획서
        </Typography>
      </FlexWrapper>
      {loaded && (
        <Table
          table={table}
          onClick={row =>
            router.push(
              `/document-lookup/project-proposal/result/${pageId}/detail/${row.id}`,
            )
          }
          emptyMessage="사업계획서 정보가 없습니다."
        />
      )}
    </FlexWrapper>
  );
};

export default ViewerProjectProposalTable;
