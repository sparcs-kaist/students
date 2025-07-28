"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import ViewResult from "@sparcs-students/web/features/document-lookup/components/ViewResult";

import { mockViewBudgetProposalResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import { UserPermission } from "@sparcs-students/web/constants/userPermission";

import ReviewerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ReviewerBudgetProposalFrame";
import { useRouter, useSearchParams } from "next/navigation";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import getMockUserPermission from "@sparcs-students/web/features/document-lookup/project/services/getMockUserPermission";
import ViewerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ViewerBudgetProposalFrame";
import ManagerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ManagerBudgetProposalFrame";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import ExcelDownloadButton from "@sparcs-students/web/features/document-lookup/budget/components/ExcelDownloadButton";

// 실제 mock 데이터 import
import {
  mockDBIncomeData,
  mockDBExpenditureData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";

// TotalTable용 mock 데이터는 별도로 import
import { mockTotalData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewerReviewerBudgetData";

const BudgetProposal = () => {
  const items: ThreeInputItem[] = mockData;
  const searchParams = useSearchParams();
  const queryYear = parseInt(searchParams.get("year") || "") || items[0].year;
  const queryIsSpring = searchParams.get("isSpring") === "true";
  const queryType = searchParams.get("type") as DocumentType | null;
  const queryKey = searchParams.get("key");
  const queryValue = searchParams.get("value");
  const queryId = parseInt(searchParams.get("id") || "");

  const [date, setDate] = useState(mockViewBudgetProposalResultData.submitDate);
  const [year, setYear] = useState<number>(queryYear);
  const [isSpring, setIsSpring] = useState<boolean | null>(queryIsSpring);
  const [type, setType] = useState<DocumentType | null>(queryType);
  const [selectedKey, setSelectedKey] = useState<string | null>(queryKey);
  const [selectedValue, setSelectedValue] = useState<string | null>(queryValue);
  const [selectedId, setSelectedId] = useState<number | null>(queryId);
  const userPermission = getMockUserPermission();

  const router = useRouter();

  const lookUp = (id: number) => {
    const query = new URLSearchParams({
      year: String(year),
      isSpring: String(isSpring),
      type: String(type),
      key: selectedKey ?? "",
      value: selectedValue ?? "",
      id: String(id),
    }).toString();

    switch (type) {
      case "사업 계획서":
        router.push(`/document-lookup/project-proposal/result/${id}?${query}`);
        break;
      case "사업 보고서":
        router.push(`/document-lookup/project-report/result/${id}?${query}`);
        break;
      case "예산안":
        router.push(`/document-lookup/budget-proposal/result/${id}?${query}`);
        break;
      case "결산":
        router.push(`/document-lookup/budget-report/result/${id}?${query}`);
        break;
      default:
        throw new Error(`잘못된 문서 유형: ${type}`);
    }
  };

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[
            { name: "예결산 조회", path: "/document-lookup" },
            { name: "예산안", path: "/budget-proposal" },
          ]}
        />
      </FlexWrapper>
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
              setSelectedId={setSelectedId}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <ModalTableButton
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={() => lookUp(selectedId as number)}
            />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockViewBudgetProposalResultData}
          submitDate={date}
          handleDateChange={setDate}
        />

        {/* 엑셀 다운로드 버튼 추가 */}
        <FlexWrapper
          direction="row"
          gap={8}
          style={{ justifyContent: "flex-end" }}
        >
          <ExcelDownloadButton
            totalData={mockTotalData}
            expenditureData={mockDBExpenditureData}
            incomeData={mockDBIncomeData}
            year={year}
            semester={isSpring ? "상반기" : "하반기"}
            documentType={type || "예산안"}
            organization="전산학부"
            submitter="김스튜"
          />
        </FlexWrapper>

        {userPermission === UserPermission.Viewer && (
          <ViewerBudgetProposalFrame />
        )}
        {userPermission === UserPermission.Reviewer && (
          <ReviewerBudgetProposalFrame />
        )}
        {userPermission === UserPermission.Manager && (
          <ManagerBudgetProposalFrame />
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default BudgetProposal;
