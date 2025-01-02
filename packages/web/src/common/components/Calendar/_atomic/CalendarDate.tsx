import React from "react";
import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

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
}

const getBackgroundColor = (
  theme: DefaultTheme,
  type?: CalendarDateProps["type"],
) => {
  if (
    type === "Default" ||
    type === "Saturday" ||
    type === "Sunday" ||
    type === "Start" ||
    type === "End" ||
    type === "Pass"
  )
    return theme.colors.PRIMARY;
  if (type === "Past/Future") return theme.colors.GREEN[100];
  return theme.colors.WHITE;
};

const ExistWrapper = styled.div<{
  exist: boolean;
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  position: relative;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ exist, type, theme }) =>
    exist &&
    css`
      &::after {
        content: "";
        position: absolute;
        right: -4px;
        top: -1px;
        width: 4px;
        height: 4px;
        background-color: ${getBackgroundColor(theme, type)};
        border: 1px solid ${theme.colors.WHITE};
        border-radius: 3px;
      }
    `}
`;

const DateContainer = styled.div<CalendarDateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  font-size: 16px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  gap: 10px;
  flex: 1 0 0;
  flex-wrap: wrap;
  color: ${({ type, theme }) => {
    if (type === "Default") return theme.colors.GRAY[900];
    if (type === "Saturday") return theme.colors.GREEN[700];
    if (type === "Sunday") return theme.colors.RED[700];
    if (type === "Past/Future") return theme.colors.GRAY[100];
    return theme.colors.BLACK;
  }};
`;

const DateWrapper = styled.div<{
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex: 1 0 0;
  align-self: stretch;
  flex-wrap: wrap;
  padding: 2px 0px;
  height: fit-content;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
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
  border-radius: ${({ type }) => {
    if (type === "Start") return "2px 0px 0px 2px";
    if (type === "End") return "0px 2px 2px 0px";
    if (type === "Pass") return "0px";
    return "2px";
  }};
`;

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  exist,
  type = "Default",
  onDateClick = () => {},
}) => {
  const handleClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };
  return (
    <DateWrapper type={type} onClick={handleClick}>
      <DateContainer date={date} exist={exist} type={type}>
        <ExistWrapper exist={exist} type={type}>
          {date.getDate()}
        </ExistWrapper>
      </DateContainer>
    </DateWrapper>
  );
};

export default CalendarDate;
