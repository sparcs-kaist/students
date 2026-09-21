"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import {
  mockExpenditureData,
  mockIncomeData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewerReviewerBudgetData";
import ReviewerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerIncomeTable";
import ReviewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerExpenditureTable";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import styled from "styled-components";
import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { mockViewBudgetReportResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const RightButtonWrapper = styled.div`
  gap: 12px;
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
`;

const ReviewerBudgetReportFrame = () => {
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
    // eslint-disable-next-line no-console
    console.log("리뷰하는 문서의 정보:", mockViewBudgetReportResultData);
    // eslint-disable-next-line no-console
    console.log("제출된 리뷰:", review);
  };

  const handleResetAll = () => {
    setReviewData(initialReviewData);
    setResetKey(prev => prev + 1); // CHACHA: re-render
  };

  /** 모든 항목을 일괄 승인 상태로 변경 */
  const handleBulkApprove = () => {
    setReviewData(prev => ({
      income: prev.income.map(item => ({
        ...item,
        reviewStatus: DocumentReviewStatusEnum.ReviewAccepted,
      })),
      expenditure: prev.expenditure.map(item => ({
        ...item,
        reviewStatus: DocumentReviewStatusEnum.ReviewAccepted,
      })),
    }));
    setResetKey(prev => prev + 1);
  };

  /** 모든 항목을 일괄 반려 상태로 변경 */
  const handleBulkReject = () => {
    setReviewData(prev => ({
      income: prev.income.map(item => ({
        ...item,
        reviewStatus: DocumentReviewStatusEnum.ReviewRejected,
      })),
      expenditure: prev.expenditure.map(item => ({
        ...item,
        reviewStatus: DocumentReviewStatusEnum.ReviewRejected,
      })),
    }));
    setResetKey(prev => prev + 1);
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

  const openBulkApproveModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => {
            handleBulkApprove();
            close();
          }}
          onClose={() => close()}
        >
          모든 항목을 일괄 승인하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const openBulkRejectModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => {
            handleBulkReject();
            close();
          }}
          onClose={() => close()}
        >
          모든 항목을 일괄 반려하시겠습니까?
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
      <FlexWrapper direction="column" gap={16}>
        <ReviewerExpenditureTable
          key={`expenditure-${resetKey}`}
          type="proposal"
          pageId={id}
          title="지출"
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
        <RightButtonWrapper>
          <Button
            type="reverse"
            onClick={openBulkRejectModal}
            style={{ width: "120px", padding: "8px 16px" }}
          >
            일괄 반려
          </Button>
          <Button
            onClick={openBulkApproveModal}
            style={{ width: "120px", padding: "8px 16px" }}
          >
            일괄 승인
          </Button>
        </RightButtonWrapper>
      </FlexWrapper>
      <TotalTable data={dataToTotal(mockIncomeData, mockExpenditureData)} />

      {/* 임시저장 삭제 / 제출 버튼 */}
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
    </FlexWrapper>
  );
};
export default ReviewerBudgetReportFrame;
