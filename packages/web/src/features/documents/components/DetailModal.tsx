import Button from "@sparcs-students/web/common/components/Buttons/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";

interface DetailModalProps {
  onConfirm: () => void;
  title: string;
  detail: string;
}

interface EditableDetailModalProps {
  onConfirm: () => void;
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
`;

const DetailWrapper = styled.div`
  padding: 20px 25px;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  font-size: 16px;
  line-height: 20px;
  white-space: pre;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DetailModal: React.FC<DetailModalProps> = ({
  onConfirm,
  title,
  detail,
}) => (
  <ModalContentInner>
    <Typography fs={20} lh={28} fw="MEDIUM">
      {title}
    </Typography>
    <DetailWrapper>{detail}</DetailWrapper>
    <ButtonWrapper>
      <Button onClick={onConfirm}>닫기</Button>
    </ButtonWrapper>
  </ModalContentInner>
);

export default DetailModal;

export const EditableDetailModal: React.FC<EditableDetailModalProps> = ({
  onConfirm,
  title,
  value,
  onChange,
}) => {
  const [localText, setLocalText] = useState<string>(value);

  useEffect(() => {
    setLocalText(value);
  }, [value]);

  return (
    <ModalContentInner>
      <Typography fs={20} lh={28} fw="MEDIUM">
        {title}
      </Typography>
      <TextAreaInput
        placeholder="설명을 입력하세요."
        value={localText}
        handleChange={setLocalText}
      />
      <ButtonWrapper>
        <Button
          onClick={() => {
            onChange(localText);
            onConfirm();
          }}
        >
          닫기
        </Button>
      </ButtonWrapper>
    </ModalContentInner>
  );
};
