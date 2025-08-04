import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import ModalTableButton from "../Buttons/ModalTableButton";

interface CancellableModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  closeButtonText?: string;
  confirmButtonText?: string;
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

const CancellableModalContent: React.FC<CancellableModalContentProps> = ({
  onClose,
  onConfirm,
  children,
  closeButtonText = "취소",
  confirmButtonText = "확인",
}) => (
  <ModalContentInner>
    <Typography
      fs={20}
      lh={28}
      fw="MEDIUM"
      style={{ textAlign: "center", padding: "16px", whiteSpace: "pre" }}
    >
      {children}
    </Typography>
    <ButtonWrapper>
      <ModalTableButton
        type="reverse"
        onClick={onClose}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        {closeButtonText}
      </ModalTableButton>
      <ModalTableButton
        onClick={onConfirm}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        {confirmButtonText}
      </ModalTableButton>
    </ButtonWrapper>
  </ModalContentInner>
);

export default CancellableModalContent;
