import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";

const StudentFeeChangeWrapper = styled.div`
  width: 840px; // TODO: 반응형
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY[400]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[400]};
  padding: 20px 12px;
  align-items: center;
`;

const StudentFeeChange: React.FC = () => (
  <StudentFeeChangeWrapper>
    <FlexWrapper direction="row" gap={12}>
      <Typography fw="MEDIUM" fs={20} lh={20}>
        2024 가을학기
      </Typography>
      <Typography fs={14} lh={20} color="PRIMARY">
        9월 8일까지 변경 가능
      </Typography>
    </FlexWrapper>
    <Typography fs={20} lh={20} color="PRIMARY" fw="SEMIBOLD">
      학생회비 납부 (공제) 예정
    </Typography>
    <Button>변경</Button>
  </StudentFeeChangeWrapper>
);
export default StudentFeeChange;
