import React from "react";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import { formatSimpleDate } from "@sparcs-students/web/utils/Date/formatDate";
import styled from "styled-components";
import { Semester } from "@sparcs-students/web/types/semester.type";

interface StudentFeeChangeProp {
  changeDate: Date;
  semesterNow: Semester;
  paymentStatus: boolean;
  finishPayment: boolean;
  setPayment: (payment: boolean) => void;
}

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

const ButtonWrapper = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentFeeChange: React.FC<StudentFeeChangeProp> = ({
  changeDate,
  semesterNow,
  paymentStatus,
  finishPayment,
  setPayment,
}) => {
  const isChangeable = changeDate >= new Date();

  return (
    <StudentFeeChangeWrapper>
      <FlexWrapper direction="row" gap={12}>
        <Typography fw="MEDIUM" fs={20} lh={20}>
          {semesterNow.year} {semesterNow.semester}학기
        </Typography>
        {isChangeable ? (
          <Typography fs={14} lh={20} color="PRIMARY">
            {formatSimpleDate(changeDate)}까지 변경 가능
          </Typography>
        ) : (
          <Typography fs={14} lh={20} color="RED.700">
            변경 불가 기간
          </Typography>
        )}
      </FlexWrapper>
      {finishPayment ? (
        <Typography fs={20} lh={20} color="BLUE.900" fw="SEMIBOLD">
          학생회비 8회 납부 완료자
        </Typography>
      ) : (
        <Typography
          fs={20}
          lh={20}
          color={paymentStatus ? "PRIMARY" : "RED.700"}
          fw="SEMIBOLD"
        >
          학생회비 {paymentStatus ? "납부 (공제)" : "미납부 (미공제)"}{" "}
          {isChangeable ? "예정" : ""}
        </Typography>
      )}
      <ButtonWrapper>
        {isChangeable && !finishPayment ? (
          <Button onClick={() => setPayment(!paymentStatus)}>변경하기</Button>
        ) : (
          <div />
        )}
      </ButtonWrapper>
    </StudentFeeChangeWrapper>
  );
};
export default StudentFeeChange;
