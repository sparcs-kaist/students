import "react-datepicker/dist/react-datepicker.css";
import React, { useRef } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import styled from "styled-components";
import FlexWrapper from "./FlexWrapper";
import Typography from "./Typography";
import Icon from "./Icon";

interface DateInputProps {
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  showIcon?: boolean;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (
    dates: [Date | null, Date | null],
    event?: React.SyntheticEvent,
  ) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  dateFormat?: string;
}

const DateInputWrapper = styled.div<{ disabled: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  padding: 8px 12px;

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.GRAY[50] : theme.colors.WHITE};

  .react-datepicker-wrapper {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.GRAY[50]};
    font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  }

  .react-datepicker {
    display: flex;
    width: 300px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: fit-content;
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }

  .react-datepicker-popper {
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header--custom {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.WHITE};
    border: none;
  }
  .react-datepicker__month-container {
    display: flex;
    width: 280px;
    padding: 20px 18px;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    flex-shrink: 0;
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;
    align-self: stretch;
  }

  .react-datepicker__week {
    display: flex;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
  }

  .react-datepicker__day-names {
    display: none;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    padding: 2px 0px;
    align-items: center;
    align-content: center;
    flex: 1 0 0;
    align-self: stretch;
    flex-wrap: wrap;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    color: ${({ theme }) => theme.colors.BLACK};
  }

  .react-datepicker__sunday {
    color: ${({ theme }) => theme.colors.RED[700]};
  }

  .react-datepicker__saturday {
    color: ${({ theme }) => theme.colors.GREEN[700]};
  }

  .react-datepicker__current-month {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
    font-size: 24px;
    font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  }

  .react-datepicker__day--range-start.react-datepicker__day--keyboard-selected.react-datepicker__day--in-range:not(
      .react-datepicker__day--range-end
    ) {
    border-radius: 2px 0px 0px 2px;
    background-color: ${({ theme }) => theme.colors.GREEN[300]};
  }

  .react-datepicker__day--range-end {
    border-radius: 0px 2px 2px 0px;
    background-color: ${({ theme }) => theme.colors.GREEN[300]};
  }

  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.GREEN[300]};
  }

  .react-datepicker__day--keyboard-selected {
    background: none;
    border: none;
  }

  .react-datepicker__day--today {
    background: none;
    border: none;
  }

  .react-datepicker__day--in-range:not(.react-datepicker__day--range-start):not(
      .react-datepicker__day--range-end
    ) {
    background-color: ${({ theme }) => theme.colors.GREEN[100]};
    border-radius: 0;
  }

  .react-datepicker__day--selecting-range-start,
  .react-datepicker__day--selecting-range-end,
  .react-datepicker__day--in-selecting-range {
    background-color: ${({ theme }) => theme.colors.GREEN[100]};
    border-radius: 2px;
    margin: 1px;
  }

  .react-datepicker__day--outside-month:not(
      .react-datepicker__saturday-outside-month
    ):not(.react-datepicker__sunday-outside-month) {
    color: ${({ theme }) => theme.colors.GRAY[400]};
  }
  .react-datepicker__saturday-outside-month {
    color: ${({ theme }) => theme.colors.GREEN[300]};
  }
  .react-datepicker__sunday-outside-month {
    color: ${({ theme }) => theme.colors.RED[300]};
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .react-datepicker__month-wrapper {
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    width: 100%;
  }
  .react-datepicker__month-text {
    display: flex;
    width: 40px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
  }
  .react-datepicker__month-text--keyboard-selected {
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.GREEN[300]};
  }
  ::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.colors.GRAY[100]};
  }

  &:hover:not(:focus-within) {
    border-color: ${({ theme }) => theme.colors.GRAY[200]};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }

  input {
    color: ${({ theme, disabled }) =>
      disabled ? theme.colors.GRAY[100] : theme.colors.BLACK};
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.GRAY[50] : theme.colors.WHITE};
    font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
    font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    border: none;
    outline: none;
    width: fit-content;
    padding: 0px;
    min-width: 200px; /* 추가 */
    max-width: 100%; /* 추가 */
    padding: 0px;
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 36px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
`;

const DateInput: React.FC<
  DateInputProps & Omit<DatePickerProps, "showIcon">
> = ({
  label = "",
  disabled = false,
  errorMessage = "",
  showIcon = false,
  startDate,
  endDate,
  onChange,
  minDate = undefined,
  maxDate = undefined,
  placeholderText = undefined,
  dateFormat = "yyyy.MM.dd",
}) => {
  const currentMonthRef = useRef<Date>(new Date());
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleIconClick = () => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.calendar?.containerRef
    ) {
      datePickerRef.current.toggleCalendar();
    }
  };

  return (
    <FlexWrapper direction="column" gap={4}>
      {label.length > 0 && (
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          {label}
        </Typography>
      )}
      <DateInputWrapper disabled={disabled}>
        <DatePicker
          ref={datePickerRef}
          disabled={disabled}
          dateFormat={dateFormat}
          placeholderText={placeholderText}
          selectsRange
          selected={null}
          withPortal
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          filterDate={date => {
            const currentMonth = currentMonthRef.current.getMonth();
            return date.getMonth() === currentMonth;
          }}
          dayClassName={date => {
            const day = date.getDay();
            const currentMonth = currentMonthRef.current.getMonth();

            if (day === 6) {
              if (date.getMonth() !== currentMonth) {
                return "react-datepicker__sunday-outside-month";
              }
              return "react-datepicker__sunday";
            }
            if (day === 5) {
              if (date.getMonth() !== currentMonth) {
                return "react-datepicker__saturday-outside-month";
              }
              return "react-datepicker__saturday";
            }

            return "react-datepicker__day";
          }}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
            currentMonthRef.current = date;
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");

            return (
              <HeaderWrapper>
                <Icon size={32} type="chevron_left" onClick={decreaseMonth} />
                <HeaderTitleWrapper>
                  <Typography fs={24} lh={24} fw="MEDIUM">
                    {year}.
                  </Typography>
                  <Typography fs={24} lh={24} fw="MEDIUM">
                    {month}.
                  </Typography>
                </HeaderTitleWrapper>
                <Icon size={32} type="chevron_right" onClick={increaseMonth} />
              </HeaderWrapper>
            );
          }}
          onCalendarOpen={() => {
            setTimeout(() => {
              const input = document.querySelector(
                ".react-datepicker__datepicker",
              ) as HTMLInputElement | null;
              if (input) input.blur();
            }, 0);
          }}
        />
        {showIcon && (
          <IconWrapper>
            <Icon
              type="calendar_month"
              onClick={handleIconClick}
              size={20}
              color={disabled ? "#DDDDDD" : "BLACK"}
            />
          </IconWrapper>
        )}
      </DateInputWrapper>
      {errorMessage.length > 0 && (
        <Typography ff="PRETENDARD" fs={12} lh={16} color="RED.700">
          {errorMessage}
        </Typography>
      )}
    </FlexWrapper>
  );
};

export default DateInput;
