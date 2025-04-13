"use client";

import React from "react";
import { useForm } from "react-hook-form";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

import TotalTable from "@sparcs-students/web/features/documents/components/TotalTable";
import {
  mockManagerExpenditureData,
  mockManagerIncomeData,
  mockManagerProjectNameCandidateList,
  mockViewResultData,
} from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";
import styled from "styled-components";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import ManagerIncomeTable from "@sparcs-students/web/features/budget/components/ManagerIncomeTable";
import ManagerExpenditureTable from "@sparcs-students/web/features/documents/components/ManagerExpenditureTable";
import { FormValues } from "@sparcs-students/web/features/budget/type/managerFormValues";

import { dataToTotal } from "@sparcs-students/web/features/budget/util/dataToTotal";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const Proposal = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      incomes: mockManagerIncomeData,
      expenditures: mockManagerExpenditureData,
    },
  });

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들?
    const incomeData = formMethods.getValues("incomes");
    const expenditureData = formMethods.getValues("expenditures");
    const submissionDate = mockViewResultData.submitDate;

    console.log("제출할 income 데이터:", incomeData);
    console.log("제출할 expenditure 데이터:", expenditureData);
    console.log("제출 날짜:", submissionDate);
    console.log("제출하는 문서의 정보:", mockViewResultData);
  };

  const handleResetAll = () => {
    formMethods.reset({
      incomes: mockManagerIncomeData,
      expenditures: mockManagerExpenditureData,
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
        <ManagerIncomeTable formMethods={formMethods} isProposal />
        <ManagerExpenditureTable
          formMethods={formMethods}
          projectNameCandidate={mockManagerProjectNameCandidateList}
          isProposal
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
export default Proposal;
