import Button from "@sparcs-students/web/common/components/Buttons/Button";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";

interface ReviewModalProps {
  onConfirm: () => void;
  review: string;
  status: string;
  handleReviewChange: (detail: string) => void;
  handleStatusChange: (status: string) => void;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ThreeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ReviewModal: React.FC<ReviewModalProps> = ({
  onConfirm,
  review,
  status,
  handleReviewChange,
  handleStatusChange,
}) => {
  const theme = useTheme();
  const [reviewText, setReviewText] = useState(review);

  return (
    <ModalContentInner>
      <Typography fs={20} lh={28} fw="MEDIUM">
        검토 내용에 대한 설명
      </Typography>
      <TextAreaInput
        placeholder={review === "" ? "내용을 입력하세요." : review}
        handleChange={setReviewText}
        value={reviewText}
      />
      <ButtonWrapper>
        <Button onClick={onConfirm} type="reverse">
          취소
        </Button>
        <ThreeButtonWrapper>
          <Button
            onClick={() => {
              handleReviewChange(reviewText);
              handleStatusChange("검토반려");
              onConfirm();
            }}
            type={status === "반려" ? "disabled" : "default"}
            style={
              status === "반려"
                ? {}
                : {
                    border: `1px solid ${theme.colors.RED[700]}`,
                    backgroundColor: theme.colors.RED[50],
                    color: theme.colors.RED[700],
                  }
            }
          >
            반려
          </Button>
          <Button
            onClick={() => {
              handleReviewChange(reviewText);
              handleStatusChange("수정 요청");
              onConfirm();
            }}
            type={status === "수정 요청" ? "disabled" : "default"}
            style={
              status === "수정 요청"
                ? {}
                : {
                    border: `1px solid ${theme.colors.GREEN[600]}`,
                    backgroundColor: theme.colors.GREEN[50],
                    color: theme.colors.GREEN[600],
                  }
            }
          >
            수정 요청
          </Button>
          <Button
            onClick={() => {
              handleStatusChange("검토승인");
              onConfirm();
            }}
            type={
              status === "승인" || reviewText !== "" ? "disabled" : "default"
            }
          >
            승인
          </Button>
        </ThreeButtonWrapper>
      </ButtonWrapper>
    </ModalContentInner>
  );
};

export default ReviewModal;
