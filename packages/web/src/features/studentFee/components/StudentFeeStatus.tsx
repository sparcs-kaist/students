import React from "react";
import styled from "styled-components";
import { Semester } from "@sparcs-students/web/types/semester.type";
import StudentFeePaid from "./_atomic/StudentFeePaid";
import StudentFeeNotPaid from "./_atomic/StudentFeeNotPaid";

interface StudentFeeStatusProp {
  semesters: Semester[];
}

const StudentFeeStatusWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  // TODO: 반응형
  gap: 24px;
`;

const StudentFeeStatus: React.FC<StudentFeeStatusProp> = ({ semesters }) => (
  <StudentFeeStatusWrapper>
    {semesters.map(semester => (
      <StudentFeePaid
        key={`${semester.year}-${semester.semester}`}
        year={semester.year}
        semester={semester.semester}
      />
    ))}
    {Array.from({ length: 8 - semesters.length }).map(_ => (
      <StudentFeeNotPaid />
    ))}
  </StudentFeeStatusWrapper>
);

export default StudentFeeStatus;
