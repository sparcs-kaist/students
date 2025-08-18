import React, { useEffect, useState } from "react";

import { BudgetDomainEnum } from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Table from "@sparcs-students/web/common/components/Table/Table";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  getbudgetRatioTag,
  getbudgetTypeTag,
} from "@sparcs-students/web/common/util/tableTagList";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useFormatter } from "next-intl";
import { useTheme } from "styled-components";

export interface TotalProps {
  budgetDomain: BudgetDomainEnum;
  type: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
}

interface BudgetReviewTotalTableProps {
  isPostApproval: boolean;
  data: TotalProps[];
}

const renderTypeCell = (value: string) => {
  const { color, text } = getbudgetTypeTag(value);
  return <LightTag color={color as LightTagColor}>{text}</LightTag>;
};

const renderRatioCell = (value: number | null) => {
  const { color, text } = getbudgetRatioTag(value);
  return <LightTag color={color as LightTagColor}>{text}</LightTag>;
};

const BudgetReviewTotalTable: React.FC<BudgetReviewTotalTableProps> = ({
  isPostApproval,
  data,
}) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const format = useFormatter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const columnHelper = createColumnHelper<TotalProps>();

  const columns = [
    // TODO: total logic 예산 추가 심의에 맞게수정
    columnHelper.accessor("type", {
      id: "type",
      header: "분류",
      cell: info => renderTypeCell(info.getValue()),
      size: 120,
    }),
    columnHelper.accessor("lastYear", {
      id: "lastYear",
      header: "기 편성 예산 총지출",
      cell: info =>
        format.number(info.getValue(), {
          style: "currency",
          currency: "KRW",
        }),
      size: 0,
      minSize: 445,
    }),
    columnHelper.accessor("thisYear", {
      id: "thisYear",
      header: isPostApproval ? "사후승인 예산" : "추경 예산",
      cell: info =>
        format.number(info.getValue(), {
          style: "currency",
          currency: "KRW",
        }),
      size: 0,
      minSize: 445,
    }),
    columnHelper.accessor("ratio", {
      id: "ratio",
      header: "비율",
      cell: info => renderRatioCell(info.getValue()),
      size: 150,
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  const rowStyleResolver = (row: TotalProps): React.CSSProperties => {
    if (row.type === "총계") {
      return {
        backgroundColor: theme.colors.GREEN[50],
      };
    }
    return {};
  };

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
        통합
      </Typography>
      {loaded && (
        <Table
          table={table}
          rowStyleResolver={rowStyleResolver}
          emptyMessage="테이블 정보가 없습니다."
        />
      )}
    </FlexWrapper>
  );
};

export default BudgetReviewTotalTable;
