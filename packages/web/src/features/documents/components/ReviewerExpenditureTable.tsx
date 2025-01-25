import React, { useEffect, useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import {
  BudgetClassExpenseE,
  BudgetDivisionExpenseE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import {
  getDarkTagDetail,
  getTagDetail,
} from "@sparcs-students/web/utils/getTagDetail";
import {
  budgetClassExpenseTagList,
  budgetDivisionExpenseTagList,
  budgetDomainTagList,
  getbudgetCodeTag,
  getbudgetRatioTag,
  getbudgetStatusTag,
} from "@sparcs-students/web/features/documents/utils/tableTagList";
import { useFormatter } from "next-intl";
import DetailButton from "@sparcs-students/web/features/documents/components/_atomic/DetailButton";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { budgetExpenseToString } from "@sparcs-students/web/features/documents/utils/enumToItem";
import ExpenditureHelpButton from "@sparcs-students/web/features/documents/components/_atomic/ExpenditureHelpButton";
import ReviewButton from "@sparcs-students/web/features/documents/components/_atomic/ReviewButton";

// ExpenditureProps 인터페이스는 위에 정의된 대로 사용

export interface ExpenditureProps {
  code: number;
  budgetDomain: BudgetDomainE;
  budgetDivisionExpense: BudgetDivisionExpenseE;
  name: string;
  item: BudgetClassExpenseE;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: string;
  review: string;
}

interface ExpenditureTableProps {
  initialData: ExpenditureProps[];
}

const columnHelper = createColumnHelper<ExpenditureProps>();

// columns를 외부 함수로 정의
const getColumns = (
  handleReviewChange: (code: number, newReview: string) => void,
  handleStatusChange: (code: number, newStatus: string) => void,
) => [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => {
      const { color, text } = getbudgetCodeTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 120,
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
    size: 157.5,
  }),
  columnHelper.accessor("budgetDivisionExpense", {
    id: "budgetDivisionExpense",
    header: "예산 분류",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        budgetDivisionExpenseTagList,
      );
      return <LightTag color={color}>{text}</LightTag>;
    },
    size: 195,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "사업명",
    cell: info => info.getValue(),
    size: 210,
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => {
      const { color, text } = getDarkTagDetail(
        info.getValue(),
        budgetClassExpenseTagList,
      );
      return <DarkTag color={color}>{text}</DarkTag>;
    },
    size: 180,
  }),
  columnHelper.accessor("lastYear", {
    id: "lastYear",
    header: "작년 결산",
    cell: info => {
      const format = useFormatter();
      return format.number(info.getValue(), {
        style: "currency",
        currency: "KRW",
      });
    },
    size: 180,
  }),
  columnHelper.accessor("thisYear", {
    id: "thisYear",
    header: "올해 예산",
    cell: info => {
      const format = useFormatter();
      return format.number(info.getValue(), {
        style: "currency",
        currency: "KRW",
      });
    },
    size: 180,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      const { color, text } = getbudgetRatioTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 177,
  }),
  columnHelper.accessor("reason", {
    id: "reason",
    header: "근거",
    cell: info => (
      <DetailButton
        title={`${info.row.original.name}의 ${budgetExpenseToString(
          info.row.original.item,
        )}에 대한 근거`}
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

const ReviewerExpenditureTable: React.FC<ExpenditureTableProps> = ({
  initialData,
}) => {
  const [data, setData] = useState<ExpenditureProps[]>(initialData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleReviewChange = (code: number, newReview: string) => {
    setData(prevData =>
      prevData.map(item =>
        item.code === code ? { ...item, review: newReview } : item,
      ),
    );
  };

  const handleStatusChange = (code: number, newStatus: string) => {
    setData(prevData =>
      prevData.map(item =>
        item.code === code ? { ...item, status: newStatus } : item,
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
        <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
          지출
        </Typography>
        <ExpenditureHelpButton />
      </FlexWrapper>
      {loaded && <Table table={table} emptyMessage="테이블 정보가 없습니다." />}
    </FlexWrapper>
  );
};

export default ReviewerExpenditureTable;
