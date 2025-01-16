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
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import LightTag from "@sparcs-students/web/common/components/Tag/LightTag";
import {
  getDarkTagDetail,
  getTagDetail,
} from "@sparcs-students/web/utils/getTagDetail";
import {
  budgetClassExpenseTagList,
  budgetDivisionIncomeTagList,
  budgetDomainTagList,
} from "@sparcs-students/web/constants/tableTagList";
import { useFormatter } from "next-intl";
import DetailButton from "@sparcs-students/web/features/proposal/components/_atomic/DetailButton";
import DarkTag from "@sparcs-students/web/common/components/Tag/DarkTag";
import ExpenditureHelpButton from "./_atomic/ExpenditureHelpButton";

export interface ExpenditureProps {
  code: number;
  budgetDomain: BudgetDomainE;
  budgetDivisionIncome: BudgetDivisionIncomeE;
  name: string;
  item: BudgetClassExpenseE;
  lastYear: number;
  thisYear: number;
  ratio: number;
  reason: string;
  status: string;
}

interface ExpenditureTableProps {
  data: ExpenditureProps[];
}

const columnHelper = createColumnHelper<ExpenditureProps>();

const columns = [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => {
      switch (Math.trunc(info.getValue() / 100)) {
        case 1:
        case 4:
          return <LightTag color="BLUE">{info.getValue()}</LightTag>;
        case 2:
        case 5:
          return <LightTag color="YELLOW">{info.getValue()}</LightTag>;
        case 3:
        case 6:
          return <LightTag color="PINK">{info.getValue()}</LightTag>;
        default:
          return <LightTag color="GRAY">-</LightTag>;
      }
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
    size: 80,
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
    size: 120,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "사업명",
    cell: info => info.getValue(),
    size: 80,
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
    size: 100,
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
    size: 120,
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
    size: 120,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      if (info.getValue() > 100) {
        return (
          <LightTag color="CHERRY">{info.getValue().toFixed(1)}%</LightTag>
        );
      }
      if (info.getValue() <= 100) {
        return (
          <LightTag color="THISTLE">{info.getValue().toFixed(1)}%</LightTag>
        );
      }
      return <LightTag color="GRAY">-</LightTag>;
    },
    size: 90,
  }),
  columnHelper.accessor("reason", {
    id: "reason",
    header: "근거",
    cell: info => <DetailButton detail={info.getValue()} />,
    size: 60,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "현황",
    cell: info => {
      switch (info.getValue()) {
        case "승인":
          return <DarkTag color="BLUE">{info.getValue()}</DarkTag>;
        case "반려":
          return <DarkTag color="RED">{info.getValue()}</DarkTag>;
        case "사후승인":
          return <DarkTag color="TEAL">{info.getValue()}</DarkTag>;
        default:
          return <LightTag color="GRAY">-</LightTag>;
      }
    },
    // TODO: Add LightTag by enum
    size: 90,
  }),
];

const ViewerExpenditureTable: React.FC<ExpenditureTableProps> = ({ data }) => {
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
      <FlexWrapper direction="row" gap={12}>
        <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
          지출
        </Typography>
        <ExpenditureHelpButton />
      </FlexWrapper>
      {loaded && <Table table={table} />}
    </FlexWrapper>
  );
};

export default ViewerExpenditureTable;
