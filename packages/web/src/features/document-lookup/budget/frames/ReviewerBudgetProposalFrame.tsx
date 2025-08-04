"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";

import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewerReviewerBudgetData";

import styled from "styled-components";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import ReviewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerIncomeTable";
import ReviewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerExpenditureTable";

import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { mockViewBudgetProposalResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import PageButton from "@sparcs-students/web/common/components/Buttons/PageButton";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const ReviewerBudgetProposalFrame = () => {
  const { id } = useParams();
  const [resetKey, setResetKey] = useState(0);

  const initialReviewData = useMemo(() => {
    const income = mockIncomeData.map(item => ({
      code: item.code,
      reviewText: item.review,
      reviewStatus: item.status,
    }));

    const expenditure = mockExpenditureData.map(item => ({
      code: item.code,
      reviewText: item.review,
      reviewStatus: item.status,
    }));

    return { income, expenditure };
  }, [resetKey]);

  const [reviewData, setReviewData] = useState<{
    income: {
      code: number;
      reviewText: string;
      reviewStatus: DocumentReviewStatusEnum;
    }[];
    expenditure: {
      code: number;
      reviewText: string;
      reviewStatus: DocumentReviewStatusEnum;
    }[];
  }>(initialReviewData);

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들?
    const review = reviewData;
    console.log("리뷰하는 문서의 정보:", mockViewBudgetProposalResultData);
    console.log("제출된 리뷰:", review);
  };

  const handleResetAll = () => {
    setReviewData(initialReviewData);
    setResetKey(prev => prev + 1); // CHACHA: re-render
  };

  const updatedIncomeData = useMemo(
    () =>
      mockIncomeData.map(item => {
        const reviewEntry = reviewData.income.find(d => d.code === item.code);
        return reviewEntry
          ? {
              ...item,
              review: reviewEntry.reviewText,
              status: reviewEntry.reviewStatus,
            }
          : item;
      }),
    [reviewData.income],
  );

  const updatedExpenditureData = useMemo(
    () =>
      mockDBExpenditureData.map(item => {
        const reviewEntry = reviewData.expenditure.find(
          d => d.code === item.code,
        );
        return reviewEntry
          ? {
              ...item,
              review: reviewEntry.reviewText,
              status: reviewEntry.reviewStatus,
            }
          : item;
      }),
    [reviewData.expenditure],
  );

  const openSaveModal = () => {
    // TODO: add save logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent
          onConfirm={() => {
            handleSubmitAll();
            close();
          }}
        >
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
          onConfirm={() => {
            handleResetAll();
            close();
          }}
          onClose={() => close()}
        >
          임시저장 내역을{"\n"}모두 삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
      <ReviewerIncomeTable
        key={`income-${resetKey}`}
        initialData={updatedIncomeData}
        onReviewUpdate={({ code, reviewText, reviewStatus }) => {
          setReviewData(prev => {
            const newIncome = [...prev.income];
            const existingIndex = newIncome.findIndex(d => d.code === code);
            const newEntry = { code, reviewText, reviewStatus };

            if (existingIndex >= 0) {
              newIncome[existingIndex] = newEntry;
            } else {
              newIncome.push(newEntry);
            }

            return { ...prev, income: newIncome };
          });
        }}
      />
      <ReviewerExpenditureTable
        key={`expenditure-${resetKey}`}
        type="proposal"
        pageId={id}
        initialData={updatedExpenditureData}
        onReviewUpdate={({ code, reviewText, reviewStatus }) => {
          setReviewData(prev => {
            const newExpenditure = [...prev.expenditure];
            const existingIndex = newExpenditure.findIndex(
              d => d.code === code,
            );
            const newEntry = { code, reviewText, reviewStatus };

            if (existingIndex >= 0) {
              newExpenditure[existingIndex] = newEntry;
            } else {
              newExpenditure.push(newEntry);
            }

            return { ...prev, expenditure: newExpenditure };
          });
        }}
      />
      <TotalTable data={dataToTotal(mockIncomeData, mockExpenditureData)} />
      <ButtonWrapper>
        <PageButton
          type="reverse"
          onClick={openDiscardModal}
          style={{ width: "100px", padding: "8px 16px" }}
        >
          삭제
        </PageButton>
        <PageButton
          onClick={openSaveModal}
          style={{ width: "100px", padding: "8px 16px" }}
        >
          제출
        </PageButton>
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default ReviewerBudgetProposalFrame;
