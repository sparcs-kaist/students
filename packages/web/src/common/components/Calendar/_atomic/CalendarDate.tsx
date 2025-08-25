// packages\web\src\common\components\Calendar\_atomic\CalendarDate.tsx

import React from "react";
import styled, { css } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

export interface CalendarDateProps {
  date: Date;
  exist: boolean;
  type?:
    | "Default"
    | "Saturday"
    | "Sunday"
    | "Pass"
    | "Start"
    | "End"
    | "Selected"
    | "Past/Future";
  onDateClick?: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
}

const DateWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
  padding: 4px;
  height: fit-content;
  cursor: pointer;
  position: relative;
  background-color: ${({ type, theme }) => {
    if (
      type === "Past/Future" ||
      type === "Default" ||
      type === "Saturday" ||
      type === "Sunday"
    )
      return "transparent";
    if (type === "Pass") return theme.colors.GREEN[100];
    return theme.colors.GREEN[300];
  }};
  border-radius: 50%;

  &:hover {
    background-color: ${({ type, theme }) => {
      if (type === "Past/Future") return "transparent";
      if (type === "Pass") return theme.colors.GREEN[100];
      if (type === "Start" || type === "End" || type === "Selected")
        return theme.colors.GREEN[300];
      return theme.colors.GRAY[50];
    }};
  }
`;

const DateContainer = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<CalendarDateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  line-height: 20px;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    "Helvetica Neue",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    sans-serif;
  gap: 10px;
  flex: 1 0 0;
  flex-wrap: wrap;
  position: relative;
  color: ${({ type, theme }) => {
    if (type === "Default") return theme.colors.GRAY[900];
    if (type === "Saturday") return theme.colors.BLUE[700];
    if (type === "Sunday") return theme.colors.RED[700];
    if (type === "Past/Future") return theme.colors.GRAY[100];
    return theme.colors.BLACK;
  }};
`;

// 날짜 숫자만을 감싸는 래퍼
const DateNumberWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  exist: boolean;
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;

  ${({ exist, type, theme }) =>
    exist &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background-color: ${type === "Past/Future"
          ? theme.colors.GRAY[200]
          : theme.colors.GREEN[600]};
        border-radius: 50%;
        top: -2px;
        right: -2px;
        border: 1px solid ${theme.colors.WHITE};
      }
    `}
`;

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  exist,
  type = "Default",
  onDateClick = () => {},
  onDateHover = () => {},
}) => {
  const handleClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const handleMouseEnter = () => {
    if (exist && onDateHover) {
      onDateHover(date);
    }
  };

  const handleMouseLeave = () => {
    if (onDateHover) {
      onDateHover(null);
    }
  };

  return (
    <DateWrapper
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DateContainer date={date} exist={exist} type={type}>
        <DateNumberWrapper exist={exist} type={type}>
          {date.getDate()}
        </DateNumberWrapper>
      </DateContainer>
    </DateWrapper>
  );
};

export default CalendarDate;
