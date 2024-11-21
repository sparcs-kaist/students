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
  size?: "lg" | "md" | "sm";
  onDateClick?: (date: Date) => void;
}

const getBackgroundColor = (
  theme: DefaultTheme,
  type?: CalendarDateProps["type"],
) => {
  if (type === "Default" || type === "Saturday" || type === "Sunday")
    return theme.colors.PRIMARY;
  if (type === "Past/Future") return theme.colors.GREEN[100];
  return theme.colors.WHITE;
};

const ExistWrapper = styled.div<{
  exist: boolean;
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
  position: relative;
  height: 24px;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0px 2px;
  gap: 10px;

  ${({ exist, type, theme }) =>
    exist &&
    css`
      &::after {
        content: "";
        position: absolute;
        right: 5px;
        top: 2px;
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
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.BOLD};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};

  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          width: 32px;
          height: 32px;
        `;
      case "md":
        return css`
          width: 40px;
          height: 40px;
        `;
      case "lg":
      default:
        return css`
          width: 48px;
          height: 48px;
        `;
    }
  }}
  background-color: ${({ type, theme }) => {
    if (
      type === "Past/Future" ||
      type === "Default" ||
      type === "Saturday" ||
      type === "Sunday"
    )
      return "transparent";
    if (type === "Pass") return theme.colors.GREEN[300];
    return theme.colors.PRIMARY;
  }};
  color: ${({ type, theme }) => {
    if (type === "Default") return theme.colors.GRAY[900];
    if (type === "Saturday") return theme.colors.GREEN[700];
    if (type === "Sunday") return theme.colors.RED[700];
    if (type === "Past/Future") return theme.colors.GRAY[100];
    return theme.colors.WHITE;
  }};
`;

const DateWrapper = styled.div<{
  type?: CalendarDateProps["type"];
  size?: CalendarDateProps["size"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  width: 100%;
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          height: 32px;
        `;
      case "md":
        return css`
          height: 40px;
        `;
      case "lg":
      default:
        return css`
          height: 48px;
        `;
    }
  }}
  background: ${({ type, theme }) => {
    switch (type) {
      case "End":
        return `linear-gradient(to left, rgba(255, 255, 255, 0) 50%, ${theme.colors.GREEN[300]} 50%)`;
      case "Start":
        return `linear-gradient(to right, rgba(255, 255, 255, 0) 50%, ${theme.colors.GREEN[300]} 50%)`;
      case "Pass":
        return `${theme.colors.GREEN[300]}`;
      default:
        return "transparent";
    }
  }};
  width: 28px;
  /* height: 24px; */ // CHACHA: 이것 때문에 기간 선택할 때 날짜 하이라이트랑 기간 표시 연두색의 높이차가 생깁니다. 아직 이것에 대한 디자인이 없어서 css 수정을 안 했어요..!
  padding: 0px 2px;
  gap: 10px;
`;

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  exist,
  type = "Default",
  size = "lg",
  onDateClick = () => {},
}) => {
  const handleClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };
  return (
    <DateWrapper type={type} onClick={handleClick} size={size}>
      <DateContainer date={date} exist={exist} type={type} size={size}>
        <ExistWrapper exist={exist} type={type}>
          {date.getDate()}
        </ExistWrapper>
      </DateContainer>
    </DateWrapper>
  );
};

export default CalendarDate;
