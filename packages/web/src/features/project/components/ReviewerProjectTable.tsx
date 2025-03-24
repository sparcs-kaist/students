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
import ReviewButton from "@sparcs-students/web/features/documents/components/_atomic/ReviewButton";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

export interface ReviewerProjectProps {
  id: string;
  name: string;
  projectPeriod: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

interface ReviewerProjectTableProps {
  pageId: string | string[];
  initialData: ReviewerProjectProps[];
  isProposal?: boolean;
}

const columnHelper = createColumnHelper<ReviewerProjectProps>();

const getColumns = (
  handleReviewChange: (id: string, newReview: string) => void,
  handleStatusChange: (id: string, newStatus: DocumentReviewStatusEnum) => void,
) => [
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
  columnHelper.accessor("review", {
    id: "review",
    header: "검토",
    cell: info => (
      <ReviewButton
        status={info.row.original.status}
        review={info.getValue()}
        handleReviewChange={newReview =>
          handleReviewChange(info.row.original.id, newReview)
        }
        handleStatusChange={newStatus =>
          handleStatusChange(info.row.original.id, newStatus)
        }
      />
    ),
    size: 90,
  }),
];

const ReviewerProjectTable: React.FC<ReviewerProjectTableProps> = ({
  pageId,
  initialData,
  isProposal = true,
}) => {
  const [data, setData] = useState<ReviewerProjectProps[]>(initialData);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleReviewChange = (id: string, newReview: string) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, review: newReview } : item,
      ),
    );
  };

  const handleStatusChange = (
    id: string,
    newStatus: DocumentReviewStatusEnum,
  ) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const columns = getColumns(handleReviewChange, handleStatusChange);
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
              `/document-lookup/${isProposal ? "project-proposal" : "project-report"}/result/${pageId}/detail/${row.id}`,
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

export default ReviewerProjectTable;
