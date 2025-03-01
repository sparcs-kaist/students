import Button from "@sparcs-students/web/common/components/Buttons/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

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
      <Button
        type="outlined"
        onClick={onClose}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        {closeButtonText}
      </Button>
      <Button
        onClick={onConfirm}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        {confirmButtonText}
      </Button>
    </ButtonWrapper>
  </ModalContentInner>
);

export default CancellableModalContent;
