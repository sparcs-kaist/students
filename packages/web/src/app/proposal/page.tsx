"use client";

import React from "react";
// import { useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import SearchThreeInput from "@sparcs-students/web/features/proposal/components/SearchThreeInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import ViewResult from "@sparcs-students/web/features/proposal/components/ViewResult";
import IncomeTable from "@sparcs-students/web/features/proposal/components/IncomeTable";
import ExpenditureTable from "@sparcs-students/web/features/proposal/components/ExpenditureTable";
import TotalTable from "@sparcs-students/web/features/proposal/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
  mockTotalData,
  mockViewResultData,
} from "@sparcs-students/web/features/proposal/services/_mock/mockProposalTableData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";

const Proposal = () => (
  // const [semester, setSemester] = useState<string>(""); // 2022~2028년, 봄학기/가을학기
  // const [documentType, setDocumentType] = useState<string>(""); // 예산안, 결산안, 사업보고서, 사업계획서
  // const [organization, setOrganization] = useState<string>("");

  <FlexWrapper direction="column" gap={16}>
    <PageTitle>예결산 조회</PageTitle>
    <FlexWrapper direction="column" gap={60} style={{ padding: "32 0px" }}>
      <FlexWrapper direction="column" gap={32} style={{ padding: "0 100px" }}>
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
            조회 가이드
          </Typography>
          <SearchThreeInput />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={8}>
          <Button buttonText="조회" style={{ marginLeft: "auto" }} />
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper direction="column" gap={32} style={{ padding: "0 100px" }}>
        <ViewResult {...mockViewResultData} />
        <IncomeTable data={mockIncomeData} />
        <ExpenditureTable data={mockExpenditureData} />
        <TotalTable data={mockTotalData} />
      </FlexWrapper>
    </FlexWrapper>
  </FlexWrapper>
);
export default Proposal;
