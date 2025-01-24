"use client";

import React, { useState } from "react";
// import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import ViewResult from "@sparcs-students/web/features/proposal/components/ViewResult";
import ViewerIncomeTable from "@sparcs-students/web/features/proposal/components/ViewerIncomeTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/proposal/components/ViewerExpenditureTable";
import TotalTable from "@sparcs-students/web/features/proposal/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
  mockTotalData,
  mockViewResultData,
} from "@sparcs-students/web/features/proposal/services/_mock/mockProposalTableData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/documents/components/ThreeInput/mock";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/documents/components/ThreeInput";

const Proposal = () => {
  // const { id } = useParams();
  const items: ThreeInputItem[] = mockData;
  const [date, setDate] = useState(mockViewResultData.submitDate);
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean>(items[0].value.isSpring);
  const [type, setType] = useState<DocumentType>(DocumentType.BudgetProposal);
  const [selectedKey, setSelectedKey] = useState<string>(""); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string>(""); // TODO: enum으로 변경

  return (
    <FlexWrapper direction="column" gap={48}>
      <PageTitle>예결산 조회</PageTitle>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <FlexWrapper direction="column" gap={32}>
          <FlexWrapper direction="column" gap={16}>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              조회 가이드
            </Typography>
            <ThreeInput
              itemList={items}
              year={year}
              setYear={setYear}
              isSpring={isSpring}
              setIsSpring={setIsSpring}
              type={type}
              setType={setType}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <Button buttonText="조회" style={{ marginLeft: "auto" }} />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockViewResultData}
          submitDate={date}
          handleDateChange={setDate}
        />
        <ViewerIncomeTable data={mockIncomeData} />
        <ViewerExpenditureTable data={mockExpenditureData} />
        <TotalTable data={mockTotalData} />
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default Proposal;
