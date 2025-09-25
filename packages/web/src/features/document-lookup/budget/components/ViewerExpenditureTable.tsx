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
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
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
} from "@sparcs-students/web/common/util/tableTagList";
import { useFormatter } from "next-intl";
import DetailButton from "@sparcs-students/web/features/document-lookup/project/components/_atomic/DetailButton";
import DarkTag, {
  DarkTagColor,
  isDarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { budgetExpenseToString } from "@sparcs-students/web/common/util/enumToItem";
import HelpButton from "@sparcs-students/web/common/components/Buttons/HelperButton";
import { useRouter } from "next/navigation";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";
import HoverClickText from "@sparcs-students/web/common/components/HoverClickText";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DBExpenditureProps } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";

export interface ViewerExpenditureProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpense: BudgetDivisionExpenseEnum;
  name: string;
  item: BudgetClassExpenseEnum;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
}

interface ExpenditureTableProps {
  title?: string;
  data: DBExpenditureProps[];
  type: string; // "proposal" || "report"
  pageId: string | string[];
  isInsideDetailPage?: boolean;
}

const columnHelper = createColumnHelper<DBExpenditureProps>();

const getColumns = (
  type: string,
  pageId: string | string[],
  router: AppRouterInstance,
  isInsideDetailPage: boolean,
) => [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => {
      const { color, text } = getbudgetCodeTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 80,
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
    size: 105,
  }),
  columnHelper.accessor("budgetDivisionExpenditure", {
    id: "budgetDivisionExpenditure",
    header: "예산 분류",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue() as number,
        budgetDivisionExpenseTagList,
      );
      return <LightTag color={color}>{text}</LightTag>;
    },
    size: 130,
  }),
  columnHelper.accessor("projectName", {
    id: "projectName",
    header: "사업명",
    cell: info => {
      if (!isInsideDetailPage)
        return (
          <HoverClickText
            text={info.getValue()}
            onClick={() =>
              router.push(
                `/document-lookup/project-${type}/result/${pageId}/detail/${info.row.id}`,
                // CHACHA: 만약 n개의 row가 같은 상세 페이지 내의 항목이라면? row.id가 not unique...?
              )
            }
          />
        );
      return <Typography>{info.getValue()}</Typography>;
    },
    minSize: 140,
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => {
      const { color, text } = getDarkTagDetail(
        info.getValue(),
        budgetClassExpenseTagList,
      );
      return isDarkTagColor(color) ? (
        <DarkTag color={color}>{text}</DarkTag>
      ) : (
        <LightTag color={color}>{text}</LightTag>
      );
    },
    size: 120,
  }),
  columnHelper.accessor("lastYear", {
    id: "lastYear",
    header: "작년 결산",
    cell: info => {
      const format = useFormatter();
      return format.number(parseInt(info.getValue() as string), {
        style: "currency",
        currency: "KRW",
      });
    },
    size: 120,
  }),
  columnHelper.accessor("thisYear", {
    id: "thisYear",
    header: "올해 예산",
    cell: info => {
      const format = useFormatter();
      return format.number(parseInt(info.getValue() as string), {
        style: "currency",
        currency: "KRW",
      });
    },
    size: 120,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      const { color, text } = getbudgetRatioTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 118,
  }),
  columnHelper.accessor("reason", {
    id: "reason",
    header: "근거",
    cell: info => (
      <DetailButton
        title={`${info.row.original.projectName}의 ${budgetExpenseToString(info.row.original.item)}에 대한 근거`}
        detail={info.getValue()}
      />
    ),
    size: 60,
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
    size: 110,
  }),
];

const ViewerExpenditureTable: React.FC<ExpenditureTableProps> = ({
  title = "지출",
  data,
  type,
  pageId,
  isInsideDetailPage = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoaded(true);
  }, []);

  const columns = getColumns(type, pageId, router, isInsideDetailPage);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <FlexWrapper direction="row" gap={12} style={{ whiteSpace: "nowrap" }}>
        <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
          {title}
        </Typography>
        {!isInsideDetailPage && (
          <HelpButton tooltip="사업명을 클릭하면 각 사업의 상세 설명을 확인할 수 있습니다." />
        )}
      </FlexWrapper>
      {loaded && <Table table={table} emptyMessage="테이블 정보가 없습니다." />}
    </FlexWrapper>
  );
};

export default ViewerExpenditureTable;
