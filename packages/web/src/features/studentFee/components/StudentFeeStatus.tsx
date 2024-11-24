import isPropValid from "@emotion/is-prop-valid";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";

const StudentFeeStatusWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  // TODO: 반응형
  gap: 24px;
`;

const StudentFeeStatusItem = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isPaid: boolean }>`
  width: 192px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isPaid }) =>
    isPaid ? theme.colors.GREEN[100] : theme.colors.GRAY[400]};
  border-radius: 20px;
`;

const StudentFeeStatus: React.FC = () => (
  <StudentFeeStatusWrapper>
    <StudentFeeStatusItem isPaid>
      <Typography fw="MEDIUM" fs={18} lh={40}>
        2024 가을학기
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid>
      <Typography fw="MEDIUM" fs={18} lh={40}>
        2024 가을학기
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid>
      <Typography fw="MEDIUM" fs={18} lh={40}>
        2024 가을학기
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid>
      <Typography fw="MEDIUM" fs={18} lh={40}>
        2024 가을학기
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid>
      <Typography fw="MEDIUM" fs={18} lh={40}>
        2024 가을학기
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid={false}>
      <Typography fw="MEDIUM" fs={18} lh={40} color="WHITE">
        -
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid={false}>
      <Typography fw="MEDIUM" fs={18} lh={40} color="WHITE">
        -
      </Typography>
    </StudentFeeStatusItem>
    <StudentFeeStatusItem isPaid={false}>
      <Typography fw="MEDIUM" fs={18} lh={40} color="WHITE">
        -
      </Typography>
    </StudentFeeStatusItem>
  </StudentFeeStatusWrapper>
);
export default StudentFeeStatus;
