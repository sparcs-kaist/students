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
import { getbudgetStatusTag } from "@sparcs-students/web/common/util/tableTagList";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { useRouter } from "next/navigation";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";
import HoverClickText from "@sparcs-students/web/common/components/HoverClickText";

export interface ViewerProjectProps {
  id: string;
  name: string;
  projectPeriod: string;
  status: DocumentReviewStatusEnum;
}

export interface ReviewerProjectProps {
  id: string;
  name: string;
  projectPeriod: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

interface ProjectTableProps {
  pageId: number;
  data: ViewerProjectProps[];
  isProposal?: boolean;
  query?: string;
}

const columnHelper = createColumnHelper<ViewerProjectProps>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "번호",
    cell: info => parseInt(info.getValue()) + 1, // CHACHA: 1부터 시작하게 하자
    size: 90,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "사업명",
    cell: info => (
      <HoverClickText
        text={info.getValue()}
        // onClick={() =>
        //   router.push(
        //     `/document-lookup/${isProposal ? "project-proposal" : "project-report"}/result/${pageId}/${query}/detail/${row.id}`,
        //   )
        // }
      />
    ),
    minSize: 861,
    size: 0,
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

const ProjectTable: React.FC<ProjectTableProps> = ({
  pageId,
  data,
  isProposal = true,
  query = "",
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
          {isProposal ? "사업계획서" : "사업보고서"}
        </Typography>
      </FlexWrapper>
      {loaded && (
        <Table
          table={table}
          onClick={row =>
            router.push(
              `/document-lookup/${isProposal ? "project-proposal" : "project-report"}/result/${pageId}/detail/${row.id}?${query}`,
            )
          }
          emptyMessage={
            isProposal
              ? "사업계획서 정보가 없습니다."
              : "사업보고서 정보가 없습니다."
          }
        />
      )}
    </FlexWrapper>
  );
};

export default ProjectTable;
