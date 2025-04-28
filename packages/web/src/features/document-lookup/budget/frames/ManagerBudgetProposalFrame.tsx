"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

import TotalTable from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import {
  mockDBExpenditureData,
  mockDBIncomeData,
  mockManagerProjectNameCandidateList,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { mockViewBudgetProposalResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import styled from "styled-components";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import ManagerIncomeTable from "@sparcs-students/web/features/document-lookup/budget/components/ManagerIncomeTable";
import ManagerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ManagerExpenditureTable";
import {
  FormValues,
  DBExpenditureProps,
  DBIncomeProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";

import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const ManagerBudgetProposalFrame = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      incomes: mockDBIncomeData,
      expenditures: mockDBExpenditureData,
    },
  });

  const [dirtyExpenditures, setDirtyExpenditures] = useState<{
    updatedRows: DBExpenditureProps[];
    createdRows: DBExpenditureProps[];
    deletedRows: DBExpenditureProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });

  const [dirtyIncomes, setDirtyIncomes] = useState<{
    updatedRows: DBIncomeProps[];
    createdRows: DBIncomeProps[];
    deletedRows: DBIncomeProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들
    const submissionDate = mockViewBudgetProposalResultData.submitDate;

    console.log("제출 날짜:", submissionDate);
    console.log("제출하는 문서의 정보:", mockViewBudgetProposalResultData);
    console.log("제출 시 diff income 데이터:", dirtyIncomes);
    console.log("제출 시 diff expenditure 데이터:", dirtyExpenditures);
    // CHACHA: 여기서 추가된 row들에 부여된 id와 rowId는 현재 작업 중인 매니저의 프론트를 기준으로 할 뿐이지, db 기준이 아닙니다.
    // 따라서 createdRows의 rowId는 DB에 들어가는대로 쓰여야 합니다.
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
        <ManagerIncomeTable
          formMethods={formMethods}
          isProposal
          initialData={mockDBIncomeData}
          onDiffExtract={setDirtyIncomes}
        />
        <ManagerExpenditureTable
          formMethods={formMethods} // CHACHA: 예산안 쪽이랑 사계 상세 쪽이랑 받는 formValues 형태가 달라서 문제
          projectNameCandidate={mockManagerProjectNameCandidateList}
          isProposal
          initialData={mockDBExpenditureData}
          onDiffExtract={setDirtyExpenditures}
        />
        <TotalTable
          data={dataToTotal(
            formMethods.getValues("incomes"),
            formMethods.getValues("expenditures"),
          )}
        />
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
    </FlexWrapper>
  );
};
export default ManagerBudgetProposalFrame;
