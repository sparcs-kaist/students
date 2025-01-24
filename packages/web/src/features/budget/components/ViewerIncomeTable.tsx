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
} from "@sparcs-students/web/features/documents/utils/tableTagList";
import {
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import DetailButton from "@sparcs-students/web/features/budget/components/_atomic/DetailButton";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";

export interface IncomeProps {
  code: number;
  budgetDomain: BudgetDomainE;
  budgetDivisionIncome: BudgetDivisionIncomeE;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: string;
}

interface IncomeTableProps {
  data: IncomeProps[];
}

const columnHelper = createColumnHelper<IncomeProps>();

const columns = [
  columnHelper.accessor("code", {
    id: "code",
    header: "코드",
    cell: info => {
      const { color, text } = getbudgetCodeTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 140,
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
    size: 140,
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
    size: 210,
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => info.getValue(),
    size: 420,
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
    size: 210,
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
    size: 210,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      const { color, text } = getbudgetRatioTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 157.5,
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
    size: 105,
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
    size: 157.5,
  }),
];

const ViewerIncomeTable: React.FC<IncomeTableProps> = ({ data }) => {
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
      <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
        수입
      </Typography>
      {loaded && <Table table={table} />}
    </FlexWrapper>
  );
};

export default ViewerIncomeTable;
