"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { overlay } from "overlay-kit";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import PageButton from "@sparcs-students/web/common/components/Buttons/PageButton";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";

import { delegateUapresident } from "@sparcs-students/web/features/uapresident/api/delegateApi";

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.WHITE};
  max-width: 480px;
`;

const WarningBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 6px;
  background: #ffeeeb;
  border: 1px solid #f5a3a8;
  max-width: 480px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DelegateUapresidentFrame: React.FC = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [startTerm, setStartTerm] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const isValid =
    studentNumber.trim().length > 0 &&
    /^\d+$/.test(studentNumber.trim()) &&
    startTerm.trim().length > 0;

  const openSuccessModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent onConfirm={close}>
          총학생회장 권한이 성공적으로 위임되었습니다.{"\n"}
          해당 학생이 총학생회장 권한을 갖게 됩니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const openErrorModal = (message: string) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent onConfirm={close}>
          권한 위임에 실패했습니다.{"\n"}
          {message}
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const handleDelegate = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="420px">
        <CancellableModalContent
          onConfirm={async () => {
            try {
              await delegateUapresident({
                studentNumber: parseInt(studentNumber.trim()),
                startTerm: new Date(startTerm),
              });
              close();
              openSuccessModal();
              setStudentNumber("");
            } catch (err: unknown) {
              close();
              const message =
                err instanceof Error ? err.message : "알 수 없는 오류";
              openErrorModal(message);
            }
          }}
          onClose={close}
        >
          <FlexWrapper direction="column" gap={12}>
            <Typography fs={18} lh={24} fw="BOLD" color="BLACK">
              총학생회장 권한 위임
            </Typography>
            <Typography fs={14} lh={20} color="BLACK">
              학번 {studentNumber} 학생에게 총학생회장 권한을 위임합니다.{"\n"}
              현재 총학생회장의 임기가 종료되며, 이 작업은 되돌릴 수 없습니다.
            </Typography>
            <Typography fs={14} lh={20} color="BLACK">
              정말로 위임하시겠습니까?
            </Typography>
          </FlexWrapper>
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <WarningBox>
        <Typography fs={14} lh={20} fw="BOLD" color="BLACK">
          ⚠ 주의사항
        </Typography>
        <Typography fs={13} lh={18} color="BLACK">
          · 권한 위임 즉시 현재 총학생회장의 권한이 종료됩니다.
        </Typography>
        <Typography fs={13} lh={18} color="BLACK">
          · 위임 후에는 이 페이지에 더 이상 접근할 수 없습니다.
        </Typography>
        <Typography fs={13} lh={18} color="BLACK">
          · 다음 총학생회장의 학번을 정확하게 입력해 주세요.
        </Typography>
      </WarningBox>

      <FormCard>
        <Typography fs={20} lh={26} fw="BOLD" color="BLACK">
          다음 총학생회장 지정
        </Typography>

        <FlexWrapper direction="column" gap={8}>
          <Typography fs={14} lh={18} fw="MEDIUM" color="BLACK">
            다음 총학생회장 학번
          </Typography>
          <TableTextInput
            value={studentNumber}
            handleChange={setStudentNumber}
            placeholder="학번 입력 (숫자만)"
          />
        </FlexWrapper>

        <FlexWrapper direction="column" gap={8}>
          <Typography fs={14} lh={18} fw="MEDIUM" color="BLACK">
            임기 시작일
          </Typography>
          <TableTextInput
            value={startTerm}
            handleChange={setStartTerm}
            placeholder="YYYY-MM-DD"
          />
        </FlexWrapper>

        <ButtonWrapper>
          <PageButton
            onClick={handleDelegate}
            style={{
              width: "120px",
              padding: "10px 20px",
              opacity: isValid ? 1 : 0.5,
              pointerEvents: isValid ? "auto" : "none",
            }}
          >
            권한 위임
          </PageButton>
        </ButtonWrapper>
      </FormCard>
    </FlexWrapper>
  );
};

export default DelegateUapresidentFrame;
