import Button from "@sparcs-students/web/common/components/Buttons/Button";
import React, { useState } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import FlexWrapper from "../FlexWrapper";
import TextInput from "../Forms/TextInput";

interface TelEditingModalContentProps {
  onClose: () => void;
  onConfirm: (newTel: string) => void;
  closeButtonText?: string;
  confirmButtonText?: string;
  default?: string;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

const TelEditingModalContent: React.FC<TelEditingModalContentProps> = ({
  onClose,
  onConfirm,
  closeButtonText = "취소",
  confirmButtonText = "저장",
  default: defaultTel = "",
}) => {
  const [value, setValue] = useState(defaultTel);
  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, "");

    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };
  const isValidPhoneNumber = (input: string) => /^010-\d{4}-\d{4}$/.test(input);

  const isValid = isValidPhoneNumber(value);

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (val: string) => {
    setValue(formatPhoneNumber(val));

    if (!/^010-\d{4}-\d{4}$/.test(val)) {
      setErrorMessage("유효한 전화번호 형식이 아닙니다.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <ModalContentInner>
      <FlexWrapper direction="column" gap={16}>
        <Typography
          fs={20}
          lh={28}
          fw="MEDIUM"
          style={{ textAlign: "center", whiteSpace: "pre" }}
        >
          전화번호 변경
        </Typography>
        <TextInput
          placeholder="010-xxxx-xxxx"
          value={value}
          onChange={e => handleInputChange(e.target.value)}
          errorMessage={errorMessage}
        />
      </FlexWrapper>
      <ButtonWrapper>
        <Button
          type="reverse"
          onClick={onClose}
          style={{
            fontSize: "14px",
            lineHeight: "12px",
            width: "100px",
            height: "36px",
          }}
        >
          {closeButtonText}
        </Button>
        <Button
          onClick={() => onConfirm(value)}
          type={`${isValid && value !== defaultTel ? "default" : "disabled"}`}
          style={{
            fontSize: "14px",
            lineHeight: "12px",
            width: "100px",
            height: "36px",
          }}
        >
          {confirmButtonText}
        </Button>
      </ButtonWrapper>
    </ModalContentInner>
  );
};

export default TelEditingModalContent;
