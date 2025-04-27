"use client";

import React from "react";
import { useParams } from "next/navigation";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";

import ViewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerIncomeTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";
import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewerReviewerBudgetData";

import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";

const ViewerBudgetProposalFrame = () => {
  const { id } = useParams();

  return (
    <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
      <ViewerIncomeTable data={mockIncomeData} />
      <ViewerExpenditureTable
        data={mockExpenditureData}
        type="proposal"
        pageId={id}
      />
      <TotalTable data={dataToTotal(mockIncomeData, mockExpenditureData)} />
    </FlexWrapper>
  );
};
export default ViewerBudgetProposalFrame;
