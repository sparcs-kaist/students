"use client";

import React, { useState } from "react";
// import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import ViewResult from "@sparcs-students/web/features/documents/components/ViewResult";
// import ViewerIncomeTable, {
//   ViewerIncomeProps,
// } from "@sparcs-students/web/features/budget/components/ViewerIncomeTable";
// import ViewerExpenditureTable, {
//   ViewerExpenditureProps,
// } from "@sparcs-students/web/features/documents/components/ViewerExpenditureTable";
import TotalTable, {
  TotalProps,
} from "@sparcs-students/web/features/documents/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
  mockViewerExpenditureData,
  mockViewerIncomeData,
  mockViewResultData,
} from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/documents/components/ThreeInput/mock";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/documents/components/ThreeInput";
import { BudgetDomainE } from "@sparcs-students/interface/common/enum/budget.enum";
import ReviewerIncomeTable from "@sparcs-students/web/features/budget/components/ReviewerIncomeTable";
import ReviewerExpenditureTable from "@sparcs-students/web/features/documents/components/ReviewerExpenditureTable";
import { ViewerIncomeProps } from "@sparcs-students/web/features/budget/components/ViewerIncomeTable";
import { ViewerExpenditureProps } from "@sparcs-students/web/features/documents/components/ViewerExpenditureTable";
import styled from "styled-components";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";

interface DomainAccum {
  incomeLastYear: number;
  incomeThisYear: number;
  expenditureLastYear: number;
  expenditureThisYear: number;
}

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const dataToTotal = (
  incomeData: ViewerIncomeProps[],
  expenditureData: ViewerExpenditureProps[],
) => {
  const incomeMap = incomeData.reduce<Record<BudgetDomainE, DomainAccum>>(
    (acc, cur) => {
      const { budgetDomain, lastYear, thisYear } = cur;

      const prev = acc[budgetDomain] ?? {
        incomeLastYear: 0,
        incomeThisYear: 0,
        expenditureLastYear: 0,
        expenditureThisYear: 0,
      };

      return {
        ...acc,
        [budgetDomain]: {
          ...prev,
          incomeLastYear: prev.incomeLastYear + lastYear,
          incomeThisYear: prev.incomeThisYear + thisYear,
        },
      };
    },
    {} as Record<BudgetDomainE, DomainAccum>,
  );

  const combinedMap = expenditureData.reduce<
    Record<BudgetDomainE, DomainAccum>
  >((acc, cur) => {
    const { budgetDomain, lastYear, thisYear } = cur;

    const prev = acc[budgetDomain] ?? {
      incomeLastYear: 0,
      incomeThisYear: 0,
      expenditureLastYear: 0,
      expenditureThisYear: 0,
    };

    return {
      ...acc,
      [budgetDomain]: {
        ...prev,
        expenditureLastYear: prev.expenditureLastYear + lastYear,
        expenditureThisYear: prev.expenditureThisYear + thisYear,
      },
    };
  }, incomeMap);

  const resultArray = Object.entries(combinedMap).reduce<TotalProps[]>(
    (acc, [key, sums]) => {
      const domain = Number(key) as BudgetDomainE;

      const incomeRow = {
        budgetDomain: domain,
        type: "수입",
        lastYear: sums.incomeLastYear,
        thisYear: sums.incomeThisYear,
        ratio:
          sums.incomeLastYear === 0
            ? null
            : (sums.incomeThisYear / sums.incomeLastYear) * 100,
      };

      const expenditureRow = {
        budgetDomain: domain,
        type: "지출",
        lastYear: sums.expenditureLastYear,
        thisYear: sums.expenditureThisYear,
        ratio:
          sums.expenditureLastYear === 0
            ? null
            : (sums.expenditureThisYear / sums.expenditureLastYear) * 100,
      };

      const totalLastYear = sums.incomeLastYear - sums.expenditureLastYear;
      const totalThisYear = sums.incomeThisYear - sums.expenditureThisYear;
      const totalRow = {
        budgetDomain: domain,
        type: "총계",
        lastYear: totalLastYear,
        thisYear: totalThisYear,
        ratio:
          totalLastYear === 0 ? null : (totalThisYear / totalLastYear) * 100,
      };

      return [...acc, incomeRow, expenditureRow, totalRow];
    },
    [] as {
      budgetDomain: BudgetDomainE;
      type: string;
      lastYear: number;
      thisYear: number;
      ratio: number;
    }[],
  );

  return resultArray;
};

const Proposal = () => {
  // const { id } = useParams();
  const items: ThreeInputItem[] = mockData;
  const [date, setDate] = useState(mockViewResultData.submitDate);
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean>(items[0].value.isSpring);
  const [type, setType] = useState<DocumentType>(DocumentType.BudgetProposal);
  const [selectedKey, setSelectedKey] = useState<string>(""); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string>(""); // TODO: enum으로 변경
  const userPermission = 2; // 1: viewer, 2: reviewer, 3: manager TODO: 실제 권한으로 변경

  const openSaveModal = () => {
    // TODO: add save logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent onConfirm={() => close()}>
          저장되었습니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const openDiscardModal = () => {
    // TODO: add discard logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => close()}
          onClose={() => close()}
        >
          임시저장 내역을{"\n"}모두 삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

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
        {/* {userPermission === 1 && <ViewerIncomeTable data={mockViewerIncomeData} />} */}
        {userPermission === 2 && <ReviewerIncomeTable data={mockIncomeData} />}
        {/* {userPermission === 3 && <ViewerIncomeTable data={mockViewerIncomeData} />} */}

        {/* {userPermission === 1 && <ViewerExpenditureTable data={mockViewerExpenditureData} />} */}
        {userPermission === 2 && (
          <ReviewerExpenditureTable initialData={mockExpenditureData} />
        )}
        <TotalTable
          data={dataToTotal(mockViewerIncomeData, mockViewerExpenditureData)}
        />
        {userPermission === 2 && (
          <ButtonWrapper>
            <Button
              type="reverse"
              onClick={openDiscardModal}
              style={{ width: "100px", padding: "8px 16px" }}
            >
              삭제
            </Button>
            <Button
              onClick={openSaveModal}
              style={{ width: "100px", padding: "8px 16px" }}
            >
              제출
            </Button>
          </ButtonWrapper>
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default Proposal;
