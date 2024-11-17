import React from "react";
import styled from "styled-components";
import { addMonths, format, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import Icon from "@sparcs-students/web/common/components/Icon";

interface MonthNavigatorProps {
  currentDate: Date;
  onChange: (date: Date) => void;
}

const NavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.BOLD};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.GRAY[900]};
  user-select: none;
`;

const MonthDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChevronBlockWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 5px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: rgba(94, 94, 94, 0.5);
`;

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentDate,
  onChange = () => {},
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
        <Icon
          type="chevron_left"
          size={48}
          onClick={handlePrevious}
          color="WHITE"
        />
      </ChevronBlockWrapper>
      <MonthDisplay onClick={handleTodayClick}>
        {format(currentDate, "yyyy. MM.", { locale: ko })}
      </MonthDisplay>
      <ChevronBlockWrapper>
        <Icon
          type="chevron_right"
          size={48}
          onClick={handleNext}
          color="WHITE"
        />
      </ChevronBlockWrapper>
    </NavigatorWrapper>
  );
};

export default MonthNavigator;
