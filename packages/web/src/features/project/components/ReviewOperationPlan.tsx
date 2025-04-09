import React, { useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled, { useTheme } from "styled-components";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

interface ReviewOperationPlanProps {
  review?: string;
  reviewHandler: (text: string) => void;
  isProposal?: boolean;
}
const ThreeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

const ReviewOperationPlan: React.FC<ReviewOperationPlanProps> = ({
  review = "",
  reviewHandler,
  isProposal = true,
}) => {
  const theme = useTheme();
  const [reviewText, setReviewText] = useState(review);
  const [status, setStatus] = useState<DocumentReviewStatusEnum>(
    DocumentReviewStatusEnum.Progress,
  );

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
        운영{isProposal ? "계획" : "보고"} 검토
      </Typography>
      <TextAreaInput
        placeholder="검토에 대한 설명을 입력하세요."
        handleChange={setReviewText}
        value={reviewText}
        style={{ height: "100px" }}
      />
      <ThreeButtonWrapper>
        <Button
          onClick={() => {
            reviewHandler(reviewText);
            setStatus(DocumentReviewStatusEnum.ReviewRejected);
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
              ? {
                  width: "fit-content",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
              : {
                  border: `1px solid ${theme.colors.RED[700]}`,
                  backgroundColor: theme.colors.RED[50],
                  color: theme.colors.RED[700],
                  width: "fit-content",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
          }
        >
          반려
        </Button>
        <Button
          onClick={() => {
            reviewHandler(reviewText);
            setStatus(DocumentReviewStatusEnum.ReviseNeeded);
          }}
          type={
            status === DocumentReviewStatusEnum.ReviseNeeded
              ? "disabled"
              : "default"
          }
          style={
            status === DocumentReviewStatusEnum.ReviseNeeded
              ? {
                  width: "fit-content",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
              : {
                  border: `1px solid ${theme.colors.GREEN[600]}`,
                  backgroundColor: theme.colors.GREEN[50],
                  color: theme.colors.GREEN[600],
                  width: "fit-content",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
          }
        >
          수정 요청
        </Button>
        <Button
          onClick={() => {
            reviewHandler(reviewText);
            setStatus(DocumentReviewStatusEnum.ReviewAccepted);
          }}
          type={
            status === DocumentReviewStatusEnum.Accepted ||
            status === DocumentReviewStatusEnum.ReviewAccepted ||
            reviewText !== ""
              ? "disabled"
              : "default"
          }
          style={{
            width: "fit-content",
            height: "36px",
            fontSize: "14px",
            lineHeight: "14px",
          }}
        >
          승인
        </Button>
      </ThreeButtonWrapper>
    </FlexWrapper>
  );
};

export default ReviewOperationPlan;
