import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";

interface ReviewModalProps {
  onConfirm: () => void;
  review: string;
  status: DocumentReviewStatusEnum;
  handleReviewChange: (detail: string) => void;
  handleStatusChange: (status: DocumentReviewStatusEnum) => void;
}

interface ReadOnlyReviewModalProps {
  onConfirm: () => void;
  review: string;
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
  justify-content: flex-start;
`;

const ThreeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  padding: 20px 25px;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  font-size: 16px;
  line-height: 20px;
  white-space: pre;
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
        placeholder="내용을 입력하세요."
        handleChange={setReviewText}
        value={reviewText}
      />
      <ButtonWrapper>
        <ModalTableButton onClick={onConfirm} type="reverse">
          취소
        </ModalTableButton>
        <ThreeButtonWrapper>
          <ModalTableButton
            onClick={() => {
              handleReviewChange(reviewText);
              handleStatusChange(DocumentReviewStatusEnum.ReviewRejected);
              onConfirm();
            }}
            type={
              status === DocumentReviewStatusEnum.Rejected ||
              status === DocumentReviewStatusEnum.ReviewRejected
                ? "disabled"
                : "default"
            }
            style={
              status === DocumentReviewStatusEnum.Rejected ||
              status === DocumentReviewStatusEnum.ReviewRejected
                ? {}
                : {
                    border: `1px solid ${theme.colors.RED[700]}`,
                    backgroundColor: theme.colors.RED[50],
                    color: theme.colors.RED[700],
                  }
            }
          >
            반려
          </ModalTableButton>
          <ModalTableButton
            onClick={() => {
              handleReviewChange(reviewText);
              handleStatusChange(DocumentReviewStatusEnum.ReviseNeeded);
              onConfirm();
            }}
            type={
              status === DocumentReviewStatusEnum.ReviseNeeded
                ? "disabled"
                : "default"
            }
            style={
              status === DocumentReviewStatusEnum.ReviseNeeded
                ? {}
                : {
                    border: `1px solid ${theme.colors.GREEN[600]}`,
                    backgroundColor: theme.colors.GREEN[50],
                    color: theme.colors.GREEN[600],
                  }
            }
          >
            수정 요청
          </ModalTableButton>
          <ModalTableButton
            onClick={() => {
              handleStatusChange(DocumentReviewStatusEnum.ReviewAccepted);
              onConfirm();
            }}
            type={
              status === DocumentReviewStatusEnum.Accepted ||
              status === DocumentReviewStatusEnum.ReviewAccepted ||
              reviewText !== ""
                ? "disabled"
                : "default"
            }
          >
            승인
          </ModalTableButton>
        </ThreeButtonWrapper>
      </ButtonWrapper>
    </ModalContentInner>
  );
};

export default ReviewModal;

export const ReadOnlyReviewModal: React.FC<ReadOnlyReviewModalProps> = ({
  onConfirm,
  review,
}) => (
  <ModalContentInner>
    <Typography fs={20} lh={28} fw="MEDIUM">
      검토 내용에 대한 설명
    </Typography>
    <ContentWrapper>{review}</ContentWrapper>
    <ButtonWrapper>
      <ModalTableButton onClick={onConfirm} type="default">
        닫기
      </ModalTableButton>
    </ButtonWrapper>
  </ModalContentInner>
);
