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
import { getTagDetail } from "@sparcs-students/web/utils/getTagDetail";
import {
  budgetDivisionIncomeTagList,
  budgetDomainTagList,
  getbudgetCodeTag,
  getbudgetRatioTag,
  getbudgetStatusTag,
} from "@sparcs-students/web/features/document-lookup/util/tableTagList";
import {
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
import DetailButton from "@sparcs-students/web/features/document-lookup/project/components/_atomic/DetailButton";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import ReviewButton from "@sparcs-students/web/features/document-lookup/project/components/_atomic/ReviewButton";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";

export interface IncomeProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

interface IncomeTableProps {
  initialData: IncomeProps[];
  onReviewUpdate: (data: {
    code: number;
    reviewText: string;
    reviewStatus: DocumentReviewStatusEnum;
  }) => void;
}

const columnHelper = createColumnHelper<IncomeProps>();

const getColumns = (
  handleReviewChange: (code: number, newReview: string) => void,
  handleStatusChange: (
    code: number,
    newStatus: DocumentReviewStatusEnum,
  ) => void,
) => [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => {
      const { color, text } = getbudgetCodeTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 130,
  }),
  columnHelper.accessor("budgetDomain", {
    id: "budgetDomain",
    header: "구분",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        budgetDomainTagList,
      );
      return <LightTag color={color}>{text}</LightTag>;
    },
    size: 160,
  }),
  columnHelper.accessor("budgetDivisionIncome", {
    id: "budgetDivisionIncome",
    header: "예산 분류",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        budgetDivisionIncomeTagList,
      );
      return <LightTag color={color}>{text}</LightTag>;
    },
    size: 200,
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => info.getValue(),
    size: 0,
    minSize: 275,
  }),
  columnHelper.accessor("lastYear", {
    id: "lastYear",
    header: "작년 결산",
    cell: info => {
      const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      });
      return formatter.format(info.getValue());
    },
    size: 185,
  }),
  columnHelper.accessor("thisYear", {
    id: "thisYear",
    header: "올해 예산",
    cell: info => {
      const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      });
      return formatter.format(info.getValue());
    },
    size: 185,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      const { color, text } = getbudgetRatioTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 180,
  }),
  columnHelper.accessor("reason", {
    id: "reason",
    header: "비고",
    cell: info => (
      <DetailButton
        title={`${info.row.original.item}에 대한 비고`}
        detail={info.getValue()}
      />
    ),
    size: 90,
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
    size: 170,
  }),
  columnHelper.accessor("review", {
    id: "review",
    header: "검토",
    cell: info => (
      <ReviewButton
        status={info.row.original.status}
        review={info.getValue()}
        handleReviewChange={newReview =>
          handleReviewChange(info.row.original.code, newReview)
        }
        handleStatusChange={newStatus =>
          handleStatusChange(info.row.original.code, newStatus)
        }
      />
    ),
    size: 90,
  }),
];

const ReviewerIncomeTable: React.FC<IncomeTableProps> = ({
  initialData,
  onReviewUpdate,
}) => {
  const [data, setData] = useState(initialData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleReviewChange = (code: number, newReview: string) => {
    setData(prevData => {
      const newData = prevData.map(item =>
        item.code === code ? { ...item, review: newReview } : item,
      );

      const matched = newData.find(d => d.code === code);
      if (matched) {
        onReviewUpdate({
          code,
          reviewText: matched.review,
          reviewStatus: matched.status,
        });
      }

      return newData;
    });
  };

  const handleStatusChange = (
    code: number,
    newStatus: DocumentReviewStatusEnum,
  ) => {
    setData(prevData => {
      const newData = prevData.map(item =>
        item.code === code ? { ...item, status: newStatus } : item,
      );

      const matched = newData.find(d => d.code === code);
      if (matched) {
        onReviewUpdate({
          code,
          reviewText: matched.review,
          reviewStatus: matched.status,
        });
      }

      return newData;
    });
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
      <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
        수입
      </Typography>
      {loaded && <Table table={table} emptyMessage="테이블 정보가 없습니다." />}
    </FlexWrapper>
  );
};

export default ReviewerIncomeTable;
