import Button from "@sparcs-students/web/common/components/Buttons/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

interface ConfirmModalContentProps {
  onConfirm: () => void;
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
  justify-content: flex-end;
  gap: 10px;
`;

const ConfirmModalContent: React.FC<ConfirmModalContentProps> = ({
  onConfirm,
  children,
  confirmButtonText = "확인",
}) => (
  <ModalContentInner>
    <Typography
      fs={20}
      lh={28}
      fw="MEDIUM"
      style={{ textAlign: "center", padding: "16px" }}
    >
      {children}
    </Typography>
    <ButtonWrapper>
      <Button
        onClick={onConfirm}
        style={{ fontSize: "14px", lineHeight: "12px" }}
      >
        {confirmButtonText}
      </Button>
    </ButtonWrapper>
  </ModalContentInner>
);

export default ConfirmModalContent;
