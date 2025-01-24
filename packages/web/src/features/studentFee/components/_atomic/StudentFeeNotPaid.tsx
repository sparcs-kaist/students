import React from "react";

import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";

const StudentFeeNotPaidWrapper = styled.div`
  width: 192px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.GRAY[400]};
  border-radius: 20px;
`;

const StudentFeeNotPaid: React.FC = () => (
  <StudentFeeNotPaidWrapper>
    <Typography fw="MEDIUM" fs={18} lh={40} color="WHITE">
      -
    </Typography>
  </StudentFeeNotPaidWrapper>
);
export default StudentFeeNotPaid;
