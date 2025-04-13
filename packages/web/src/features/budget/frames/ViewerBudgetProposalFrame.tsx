"use client";

import React from "react";
import { useParams } from "next/navigation";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";

import ViewerIncomeTable from "@sparcs-students/web/features/budget/components/ViewerIncomeTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/documents/components/ViewerExpenditureTable";
import TotalTable from "@sparcs-students/web/features/documents/components/TotalTable";
import {
  mockViewerExpenditureData,
  mockViewerIncomeData,
} from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";

import { dataToTotal } from "@sparcs-students/web/features/budget/util/dataToTotal";

const ViewerBudgetProposal = () => {
  const { id } = useParams();

  return (
    <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
      <ViewerIncomeTable data={mockViewerIncomeData} />
      <ViewerExpenditureTable
        data={mockViewerExpenditureData}
        type="proposal"
        pageId={id}
      />
      <TotalTable
        data={dataToTotal(mockViewerIncomeData, mockViewerExpenditureData)}
      />
    </FlexWrapper>
  );
};
export default ViewerBudgetProposal;
