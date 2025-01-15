import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table";
import LightTag from "@sparcs-students/web/common/components/Tag/LightTag";
import { getTagDetail } from "@sparcs-students/web/utils/getTagDetail";
import {
  budgetDivisionIncomeTagList,
  budgetDomainTagList,
} from "@sparcs-students/web/constants/tableTagList";
import {
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import DetailButton from "@sparcs-students/web/features/proposal/components/_atomic/DetailButton";
import DarkTag from "@sparcs-students/web/common/components/Tag/DarkTag";

export interface IncomeProps {
  code: number;
  budgetDomain: BudgetDomainE;
  budgetDivisionIncome: BudgetDivisionIncomeE;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number;
  reason: string;
  status: string;
  explanation: string;
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
  columnHelper.accessor("item", {
    id: "item",
    header: "항목",
    cell: info => info.getValue(),
    size: 180,
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
    size: 120,
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
  columnHelper.accessor("explanation", {
    id: "explanation",
    header: "설명",
    cell: info => <DetailButton detail={info.getValue()} />,
    size: 60,
  }),
];

const IncomeTable: React.FC<IncomeTableProps> = ({ data }) => {
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

export default IncomeTable;
