"use client";

import React, { useState } from "react";

import Image from "next/image";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import StudentFeeChange from "@sparcs-students/web/features/studentFee/components/StudentFeeChange";
import StudentFeeStatus from "@sparcs-students/web/features/studentFee/components/StudentFeeStatus";

const mockSemesters = [
  {
    year: 2023,
    semester: "봄",
  },
  {
    year: 2023,
    semester: "가을",
  },
  {
    year: 2024,
    semester: "봄",
  },
  {
    year: 2024,
    semester: "가을",
  },
];

const mockChangeDate = new Date("2025-09-08");
const mockSemesterNow = {
  year: 2024,
  semester: "가을",
};

const StudentFee = () => {
  const [payment, setPayment] = useState<boolean>(true);

  return (
    <FlexWrapper direction="column" gap={60}>
      <Typography fs={30} lh={30} color="GREEN.800" fw="SEMIBOLD">
        학생회비 납부 조회
      </Typography>
      <FlexWrapper direction="column" gap={32}>
        <Typography fs={20} lh={20} fw="MEDIUM">
          학생회비 납부 학기
        </Typography>
        <StudentFeeStatus semesters={mockSemesters} />
        <Typography fs={16} lh={24} fw="REGULAR" color="GRAY.700">
          2015년 가을까지 모든 재적학기는 회비를 납부한 것으로 인정되며, 현재
          기록에 포함되어 있지 않습니다. <br />그 외 기록이 누락 된 경우
          kaistua@kaist.ac.kr로 문의해 주십시오. <br />
          8회 학생회비를 납부 완료하신 학우분들은 별도의 공제 신청 없이 자동
          공제가 적용됩니다. <br />
        </Typography>
      </FlexWrapper>
      <FlexWrapper direction="column" gap={32}>
        <Typography fs={20} lh={20} fw="MEDIUM">
          학생회비 공제 / 미공제 변경
        </Typography>
        <StudentFeeChange
          changeDate={mockChangeDate}
          semesterNow={mockSemesterNow}
          paymentStatus={payment}
          finishPayment={mockSemesters.length >= 8}
          setPayment={setPayment}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={32}>
        <Typography fs={20} lh={20} fw="MEDIUM">
          학생회비 관련 공지사항
        </Typography>
        {/* TODO: 임시 이미지 */}
        <Image
          src="/temp/student-fee.svg"
          alt="student-fee notice"
          width={840}
          height={240}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default StudentFee;
