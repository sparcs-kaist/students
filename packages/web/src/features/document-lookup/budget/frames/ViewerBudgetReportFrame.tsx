"use client";

import React from "react";
import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";

import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";

import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";
import ViewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerIncomeTable";
import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";
import {
  mockDBExpenditureData,
  mockDBIncomeData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";

const ViewerBudgetReportFrame = () => {
  const { id } = useParams();
  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <ViewerIncomeTable data={mockDBIncomeData} />
        <ViewerExpenditureTable
          data={mockDBExpenditureData}
          type="report"
          pageId={id}
        />
        <TotalTable
          data={dataToTotal(mockDBIncomeData, mockDBExpenditureData)}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default ViewerBudgetReportFrame;
