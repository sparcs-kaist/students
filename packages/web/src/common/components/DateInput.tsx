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
  showTimeInput?: boolean;
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
    align-items: flex-end;
    width: 300px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .react-datepicker-popper {
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
    width: 100%;
    padding: 0px;
  }
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
  showTimeInput = undefined,
}) => {
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleInputClick = () => {
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
      <DateInputWrapper disabled={disabled} onClick={handleInputClick}>
        <DatePicker
          ref={datePickerRef}
          disabled={disabled}
          dateFormat={showTimeInput ? "yyyy.MM.dd HH:mm" : "yyyy.MM.dd"}
          placeholderText={placeholderText}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
        {showIcon && (
          <Icon type="event" size={20} color={disabled ? "#DDDDDD" : "BLACK"} />
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
