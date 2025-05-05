import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import MonthNavigator from "./_atomic/MonthNavigator";
import CalendarWeek, { CalendarSizeProps } from "./_atomic/CalendarWeek";
import { CalendarDateProps } from "./_atomic/CalendarDate";
import Typography from "../Typography";

interface EventPeriod {
  start: Date;
  end: Date;
}

interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods?: EventPeriod[];
  selectedDates: Date[];
  onDateClick?: (date: Date) => void;
  width?: string;
  height?: string;
  title?: string;
  small?: boolean;
}

const CalendarWrapper = styled.div<{
  width?: CalendarProps["width"];
  height?: CalendarProps["height"];
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
`;

const CalendarContentWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  title?: CalendarProps["title"];
  small?: CalendarProps["small"];
}>`
  display: flex;
  height: ${({ small }) => (small ? "calc(100% - 28px)" : "calc(100% - 40px)")};
  height: ${({ title }) => title === "" && "100%"};
  padding: ${({ small }) => (small ? "20px 18px" : "30px")};
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  flex-shrink: 0;
  border-radius: ${({ title }) => (title !== "" ? "0px 0px 4px 4px" : "4px")};
  ${({ title, theme }) =>
    title === ""
      ? `border: 2px solid ${theme.colors.GRAY[100]}`
      : `border-left: 2px solid ${theme.colors.GRAY[100]};
  border-right: 2px solid ${theme.colors.GRAY[100]};
  border-bottom: 2px solid ${theme.colors.GRAY[100]};`};
`;

const WeekWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  small?: CalendarProps["small"];
}>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex: 1 0 0;
  height: 100%;
`;

const TitleWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  small?: CalendarProps["small"];
}>`
  display: flex;
  height: ${({ small }) => (small ? "28px" : "40px")};
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.colors.GREEN[600]};
  padding: ${({ small }) => (small ? "8px 12px" : "10px 20px")};
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const Calendar: React.FC<CalendarProps> = ({
  title = "",
  width = undefined,
  height = undefined,
  small = false,
  existDates,
  eventPeriods = [],
  selectedDates,
  onDateClick = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    },
    { weekStartsOn: 1 },
  );

  const handleDateClick = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
    }
    onDateClick?.(date);
  };

  const getWeekData = (startDate: Date): CalendarDateProps[] =>
    Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(startDate, index);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const exist = existDates.some(existDate => isSameDay(existDate, day));
      const dayInWeek = getDay(day);
      let type: CalendarDateProps["type"] = isCurrentMonth
        ? "Default"
        : "Past/Future";

      if (dayInWeek === 0) {
        type = "Sunday";
      } else if (dayInWeek === 6) {
        type = "Saturday";
      }
      if (!isCurrentMonth) {
        type = "Past/Future";
      } else if (
        selectedDates.some(selectedDate => isSameDay(selectedDate, day))
      ) {
        type = "Selected";
      } else {
        eventPeriods.forEach(period => {
          if (
            isSameDay(period.start, period.end) &&
            isSameDay(day, period.start)
          ) {
            type = "Selected";
          } else if (isSameDay(day, period.start)) {
            type = "Start";
          } else if (isSameDay(day, period.end)) {
            type = "End";
          } else if (day >= period.start && day <= period.end) {
            type = "Pass";
          }
        });
      }

      return {
        date: day,
        exist,
        type,
      };
    });

  return (
    <CalendarWrapper width={width} height={height}>
      {title !== "" && (
        <TitleWrapper small={small}>
          {small ? (
            <Typography color="WHITE" fs={16} fw="SEMIBOLD" lh={20}>
              {title}
            </Typography>
          ) : (
            <Typography color="WHITE" fs={18} fw="SEMIBOLD" lh={20}>
              {title}
            </Typography>
          )}
        </TitleWrapper>
      )}
      <CalendarContentWrapper title={title} small={small}>
        <MonthNavigator
          currentDate={currentDate}
          onChange={setCurrentDate}
          small={small}
        />
        <WeekWrapper small={small}>
          {weeks.map((weekStart: Date) => (
            <CalendarWeek
              week={getWeekData(weekStart)}
              small={small}
              key={weekStart.toISOString()}
              onDateClick={handleDateClick}
            />
          ))}
        </WeekWrapper>
      </CalendarContentWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
