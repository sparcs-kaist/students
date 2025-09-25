import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import React from "react";
import styled from "styled-components";

interface DeleteModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteModalContent: React.FC<DeleteModalContentProps> = ({
  onClose,
  onConfirm,
  children,
}) => (
  <ModalContentInner>
    {children}
    <ButtonWrapper>
      <ModalTableButton
        type="reverse"
        onClick={onClose}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        취소
      </ModalTableButton>
      <ModalTableButton
        onClick={onConfirm}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        확인
      </ModalTableButton>
    </ButtonWrapper>
  </ModalContentInner>
);

export default DeleteModalContent;
