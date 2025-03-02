import React, { useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled, { useTheme } from "styled-components";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

interface ReviewOperationPlanProps {
  review?: string;
  reviewHandler: (text: string) => void;
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
}) => {
  const theme = useTheme();
  const [reviewText, setReviewText] = useState(review);
  const [status, setStatus] = useState<string>("");

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
        운영계획 검토
      </Typography>
      <TextAreaInput
        placeholder="검토에 대한 설명을 입력하세요."
        handleChange={setReviewText}
        value={reviewText}
      />
      <ThreeButtonWrapper>
        <Button
          onClick={() => {
            reviewHandler(reviewText);
            setStatus("검토반려");
          }}
          type={
            status === "반려" || status === "검토반려" ? "disabled" : "default"
          }
          style={
            status === "반려" || status === "검토반려"
              ? {
                  width: "85px",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
              : {
                  border: `1px solid ${theme.colors.RED[700]}`,
                  backgroundColor: theme.colors.RED[50],
                  color: theme.colors.RED[700],
                  width: "85px",
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
            setStatus("수정 요청");
          }}
          type={status === "수정 요청" ? "disabled" : "default"}
          style={
            status === "수정 요청"
              ? {
                  width: "85px",
                  height: "36px",
                  fontSize: "14px",
                  lineHeight: "14px",
                }
              : {
                  border: `1px solid ${theme.colors.GREEN[600]}`,
                  backgroundColor: theme.colors.GREEN[50],
                  color: theme.colors.GREEN[600],
                  width: "85px",
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
            setStatus("검토승인");
          }}
          type={
            status === "승인" || status === "검토승인" || reviewText !== ""
              ? "disabled"
              : "default"
          }
          style={{
            width: "85px",
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
