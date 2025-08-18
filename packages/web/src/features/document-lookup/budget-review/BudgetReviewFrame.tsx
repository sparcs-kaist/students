"use client";

import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import { useForm } from "react-hook-form";

import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import {
  mockDBExpenditureData,
  mockDBIncomeData,
  mockManagerProjectNameCandidateList,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { FormValues } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import { mockViewBudgetReportResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";
import BudgetReviewExpenditureTable from "./table/BudgetReviewExpenditureTable";
import BudgetReviewIncomeTable from "./table/BudgetReviewIncomeTable";
import BudgetReviewTotalTable from "./table/BudgetReviewTotalTable";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const BudgetReviewFrame = ({ isPostApproval }: { isPostApproval: boolean }) => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      incomes: mockDBIncomeData,
      expenditures: mockDBExpenditureData,
    },
  });

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들?
    const incomeData = formMethods.getValues("incomes");
    const expenditureData = formMethods.getValues("expenditures");
    const submissionDate = mockViewBudgetReportResultData.submitDate;

    console.log("제출할 income 데이터:", incomeData);
    console.log("제출할 expenditure 데이터:", expenditureData);
    console.log("제출 날짜:", submissionDate);
    console.log("제출하는 문서의 정보:", mockViewBudgetReportResultData);
  };

  const handleResetAll = () => {
    formMethods.reset({
      incomes: mockDBIncomeData,
      expenditures: mockDBExpenditureData,
    });
  };

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
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <BudgetReviewIncomeTable
          formMethods={formMethods}
          isPostApproval={isPostApproval}
          initialData={mockDBIncomeData}
        />
        <BudgetReviewExpenditureTable
          formMethods={formMethods}
          projectNameCandidate={mockManagerProjectNameCandidateList}
          isPostApproval={isPostApproval}
          initialData={mockDBExpenditureData}
        />
        <BudgetReviewTotalTable
          isPostApproval={isPostApproval}
          data={dataToTotal(
            formMethods.getValues("incomes"),
            formMethods.getValues("expenditures"),
          )}
        />
        <ButtonWrapper>
          {/* TODO: Button 활성화 로직 추가 */}
          <Button
            type="reverse"
            onClick={openDiscardModal}
            style={{ width: "100px", height: "36px", padding: "16px 8px" }}
          >
            삭제
          </Button>
          <Button
            onClick={openSaveModal}
            style={{ width: "100px", height: "36px", padding: "16px 8px" }}
          >
            임시저장
          </Button>
          <Button
            type="disabled"
            onClick={openSaveModal}
            style={{ width: "100px", height: "36px", padding: "16px 8px" }}
          >
            중운위 제출
          </Button>
          <Button
            type="disabled"
            onClick={openSaveModal}
            style={{ width: "100px", height: "36px", padding: "16px 8px" }}
          >
            전학 제출
          </Button>
        </ButtonWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default BudgetReviewFrame;
