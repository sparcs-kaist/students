import React from "react";

import Typography from "@sparcs-students/web/common/components/Typography";
import { Semester } from "@sparcs-students/web/types/semester.type";
import styled from "styled-components";

const StudentFeePaidWrapper = styled.div`
  width: 192px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.GREEN[100]};
  border-radius: 20px;
`;

const StudentFeePaid: React.FC<Semester> = ({ year, semester }) => (
  <StudentFeePaidWrapper>
    <Typography fw="MEDIUM" fs={18} lh={40}>
      {year} {semester}학기
    </Typography>
  </StudentFeePaidWrapper>
);
export default StudentFeePaid;
