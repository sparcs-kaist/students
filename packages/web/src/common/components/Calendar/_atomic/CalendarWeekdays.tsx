import React from "react";
import styled from "styled-components";

export interface CalendarSizeProps {}

const DayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.GRAY[400]};
  width: 100%;
`;

const WeekWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  align-self: stretch;
  gap: 20px;
  width: 100%;
  flex: 1 0 0;
`;

const CalendarWeekdays = (
  <WeekWrapper>
    <DayWrapper>일</DayWrapper>
    <DayWrapper>월</DayWrapper>
    <DayWrapper>화</DayWrapper>
    <DayWrapper>수</DayWrapper>
    <DayWrapper>목</DayWrapper>
    <DayWrapper>금</DayWrapper>
    <DayWrapper>토</DayWrapper>
  </WeekWrapper>
);

export default CalendarWeekdays;
