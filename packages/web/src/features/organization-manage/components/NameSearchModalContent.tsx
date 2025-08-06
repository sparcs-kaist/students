import React from "react";
import styled from "styled-components";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";

interface NameSearchModalContentProps {
  onCancel: () => void;
  confirmButtonText?: string;
  children: React.ReactNode;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const NameSearchModalContent: React.FC<NameSearchModalContentProps> = ({
  onCancel,
  children,
  confirmButtonText = "취소",
}) => (
  <ModalContentInner>
    {children}
    <ButtonWrapper>
      <ModalTableButton
        onClick={onCancel}
        style={{ fontSize: "14px", lineHeight: "12px" }}
        type="reverse"
      >
        {confirmButtonText}
      </ModalTableButton>
    </ButtonWrapper>
  </ModalContentInner>
);

export default NameSearchModalContent;
