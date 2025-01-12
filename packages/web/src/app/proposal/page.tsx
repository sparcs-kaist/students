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
} from "@sparcs-students/web/features/proposal/services/_mock/mockProposalTableData";

const Proposal = () => (
  // const [semester, setSemester] = useState<string>(""); // 2022~2028년, 봄학기/가을학기
  // const [documentType, setDocumentType] = useState<string>(""); // 예산안, 결산안, 사업보고서, 사업계획서
  // const [organization, setOrganization] = useState<string>("");

  <FlexWrapper direction="column" gap={16}>
    <Typography
      fs={30}
      lh={40}
      color="GREEN.800"
      fw="SEMIBOLD"
      style={{ padding: "0 80px" }}
    >
      예결산 조회
    </Typography>
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
        <ViewResult
          fileName="전산학부 24년도 예산안"
          organization="전산학부"
          period="2024년도 하반기"
          headPerson="김스튜"
          submitDate={new Date("2025-01-10")}
        />

        <IncomeTable data={mockIncomeData} />
        <ExpenditureTable data={mockExpenditureData} />
        <TotalTable data={mockTotalData} />
      </FlexWrapper>
    </FlexWrapper>
  </FlexWrapper>
);
export default Proposal;
