import React from "react";
import styled from "styled-components";
import { addMonths, format, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import Icon from "@sparcs-students/web/common/components/Icon";

interface MonthNavigatorProps {
  currentDate: Date;
  onChange: (date: Date) => void;
  small?: boolean;
}

const NavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  user-select: none;
  flex-shrink: 0;
  align-self: stretch;
`;

const MonthDisplay = styled.div<{
  small?: MonthNavigatorProps["small"];
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ small }) => (small ? "24px" : "28px")};
  line-height: ${({ small }) => (small ? "24px" : "30px")};
  text-align: center;
  font-weight: ${({ small, theme }) =>
    small ? theme.fonts.WEIGHT.MEDIUM : theme.fonts.WEIGHT.SEMIBOLD};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.GRAY[900]};
`;

const ChevronBlockWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 5px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentDate,
  onChange = () => {},
  small = false,
}) => {
  const today = new Date();

  const handlePrevious = () => {
    const newDate = subMonths(currentDate, 1);
    onChange(newDate);
  };

  const handleNext = () => {
    const newDate = addMonths(currentDate, 1);
    onChange(newDate);
  };

  const handleTodayClick = () => {
    onChange(today);
  };

  return (
    <NavigatorWrapper>
      <ChevronBlockWrapper>
        {small ? (
          <Icon type="arrow_back_ios_new" size={18} onClick={handlePrevious} />
        ) : (
          <Icon type="arrow_back_ios_new" size={24} onClick={handlePrevious} />
        )}
      </ChevronBlockWrapper>
      <MonthDisplay onClick={handleTodayClick} small={small}>
        {format(currentDate, "yyyy. MM.", { locale: ko })}
      </MonthDisplay>
      <ChevronBlockWrapper>
        {small ? (
          <Icon type="arrow_forward_ios" size={18} onClick={handleNext} />
        ) : (
          <Icon type="arrow_forward_ios" size={24} onClick={handleNext} />
        )}
      </ChevronBlockWrapper>
    </NavigatorWrapper>
  );
};

export default MonthNavigator;
