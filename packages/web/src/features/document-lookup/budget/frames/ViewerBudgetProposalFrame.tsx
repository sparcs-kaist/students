import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import ViewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerIncomeTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";

// 실제 mock 데이터 import
import {
  mockDBIncomeData,
  mockDBExpenditureData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";

// TotalTable용 mock 데이터는 별도로 import
import { mockTotalData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewerReviewerBudgetData";

const ViewerBudgetProposalFrame = () => (
  <FlexWrapper direction="column" gap={48}>
    {/* 수입 테이블 */}
    <ViewerIncomeTable data={mockDBIncomeData} />

    {/* 지출 테이블 */}
    <ViewerExpenditureTable
      data={mockDBExpenditureData}
      type="proposal"
      pageId="1"
    />
    {/* 통합 테이블 */}
    <TotalTable data={mockTotalData} />
  </FlexWrapper>
);

export default ViewerBudgetProposalFrame;
