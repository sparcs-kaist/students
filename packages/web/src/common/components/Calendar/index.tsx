// packages\web\src\common\components\Calendar\index.tsx

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
import CalendarWeek from "./_atomic/CalendarWeek";
import { CalendarDateProps } from "./_atomic/CalendarDate";
import Typography from "../Typography";
import { CalendarProps } from "./types";
import { processedEvents, getExistDates, getEventPeriods } from "./data";
import { formatFullDate } from "./utils";

const CalendarWrapper = styled.div<{
  width?: CalendarProps["width"];
  height?: CalendarProps["height"];
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  position: relative;
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

// 호버 모달 스타일
const HoverModal = styled.div<{ position?: { x: number; y: number } }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 2px solid ${({ theme }) => theme.colors.GREEN[100]};
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 1000;
  min-width: 200px;
  max-width: 300px;
  pointer-events: none;
  ${({ position }) =>
    position &&
    `
    position: fixed;
    left: ${position.x - 210}px;
    top: ${position.y + 10}px;
  `}
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const EventItem = styled.div`
  border-left: 4px solid ${({ theme }) => theme.colors.GREEN[600]};
  padding-left: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const UniformEventText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.BLACK};

  &:last-child {
    margin-bottom: 0;
  }
`;

interface EventDetailsProps {
  date: Date;
  position?: { x: number; y: number };
}

const EventDetails: React.FC<EventDetailsProps> = ({
  date,
  // eslint-disable-next-line react/require-default-props
  position,
}) => {
  const dayEvents = processedEvents.filter(
    event =>
      (date >= event.start && date <= event.end) ||
      isSameDay(date, event.start) ||
      isSameDay(date, event.end),
  );

  if (dayEvents.length === 0) {
    return null;
  }

  return (
    <HoverModal position={position}>
      <EventHeader>
        <Typography fw="SEMIBOLD" color="BLACK">
          {formatFullDate(date)} 일정
        </Typography>
      </EventHeader>
      {dayEvents.map(event => (
        <EventItem key={`${event.title1}-${event.start.getTime()}`}>
          <UniformEventText>{event.title1}</UniformEventText>
          {event.title2 && <UniformEventText>{event.title2}</UniformEventText>}
          {event.title3 && <UniformEventText>{event.title3}</UniformEventText>}
        </EventItem>
      ))}
    </HoverModal>
  );
};

const Calendar: React.FC<CalendarProps> = ({
  title = "학생회 일정표",
  width = undefined,
  height = undefined,
  small = false,
  existDates: _existDates,
  eventPeriods: _eventPeriods = [],
  selectedDates = [],
  onDateClick = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // 엑셀 데이터 사용
  const existDates = getExistDates();
  const eventPeriods = getEventPeriods();

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

  const handleDateHover = (date: Date | null) => {
    if (date) {
      // 마우스 위치 업데이트를 위한 이벤트 리스너
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      document.addEventListener("mousemove", updateMousePosition);
      setHoveredDate(date);

      // 클린업 함수
      setTimeout(() => {
        document.removeEventListener("mousemove", updateMousePosition);
      }, 100);
    } else {
      setHoveredDate(null);
    }
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
      } else if (selectedDates.some(date => isSameDay(date, day))) {
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
              onDateHover={handleDateHover}
            />
          ))}
        </WeekWrapper>

        {/* 호버 시 나타나는 모달 */}
        {hoveredDate && (
          <EventDetails date={hoveredDate} position={mousePosition} />
        )}
      </CalendarContentWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
