import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import ModalTableButton from "../Buttons/ModalTableButton";

interface ConsentModalContentProps {
  onAgree: () => void;
  onDisagree: () => void;
  agreeButtonText?: string;
  disagreeButtonText?: string;
  children: React.ReactNode;
  // 변경: 특정 변수(또는 조건)가 바뀌었을 때만 동의 버튼 활성화
  checked?: boolean;
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

const ConsentModalContent: React.FC<ConsentModalContentProps> = ({
  onAgree,
  onDisagree,
  children,
  agreeButtonText = "동의",
  disagreeButtonText = "비동의",
  checked = false,
}) => (
  <ModalContentInner>
    <Typography
      fs={20}
      lh={28}
      fw="MEDIUM"
      style={{ fontSize: "16px", lineHeight: "20px" }}
    >
      {children}
    </Typography>
    <ButtonWrapper>
      <ModalTableButton
        type="reverse"
        onClick={onDisagree}
        style={{ fontSize: "14px", lineHeight: "12px", width: "174px" }}
      >
        {disagreeButtonText}
      </ModalTableButton>
      <ModalTableButton
        // isValueChanged가 true일 때만 활성화, 아니면 disabled 타입 사용
        type={checked ? "default" : "disabled"}
        onClick={onAgree}
        style={{ fontSize: "14px", lineHeight: "12px", width: "174px" }}
      >
        {agreeButtonText}
      </ModalTableButton>
    </ButtonWrapper>
  </ModalContentInner>
);

export default ConsentModalContent;
