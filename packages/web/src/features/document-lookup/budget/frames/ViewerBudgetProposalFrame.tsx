import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TotalTable, {
  TotalProps,
} from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import ViewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerIncomeTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";

import {
  DBExpenditureProps,
  DBIncomeProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";

interface ViewerBudgetProposalFrameProps {
  totalData: TotalProps[];
  incomeData: DBIncomeProps[];
  expenditureData: DBExpenditureProps[];
}

const ViewerBudgetProposalFrame = ({
  totalData,
  incomeData,
  expenditureData,
}: ViewerBudgetProposalFrameProps) => (
  <FlexWrapper direction="column" gap={48}>
    {/* 수입 테이블 */}
    <ViewerIncomeTable data={incomeData} />

    {/* 지출 테이블 */}
    <ViewerExpenditureTable data={expenditureData} type="proposal" pageId="1" />
    {/* 통합 테이블 */}
    <TotalTable data={totalData} />
  </FlexWrapper>
);

export default ViewerBudgetProposalFrame;
