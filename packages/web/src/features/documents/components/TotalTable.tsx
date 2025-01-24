import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import { BudgetDomainE } from "@sparcs-students/interface/common/enum/budget.enum";
import { useFormatter } from "next-intl";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import { getTagDetail } from "@sparcs-students/web/utils/getTagDetail";
import {
  budgetDomainTagList,
  getbudgetRatioTag,
  getbudgetTypeTag,
} from "@sparcs-students/web/features/documents/utils/tableTagList";

export interface TotalProps {
  budgetDomain: BudgetDomainE;
  type: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
}

interface TotalTableProps {
  data: TotalProps[];
}

const columnHelper = createColumnHelper<TotalProps>();

const columns = [
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
    size: 270,
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "분류",
    cell: info => {
      const { color, text } = getbudgetTypeTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 216,
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
    size: 522,
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
    size: 522,
  }),
  columnHelper.accessor("ratio", {
    id: "ratio",
    header: "비율",
    cell: info => {
      const { color, text } = getbudgetRatioTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 270,
  }),
];

const TotalTable: React.FC<TotalTableProps> = ({ data }) => {
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
        통합
      </Typography>
      {loaded && <Table table={table} />}
    </FlexWrapper>
  );
};

export default TotalTable;
