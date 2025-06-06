import DateInput from "@sparcs-students/web/common/components/DateInput";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Select from "@sparcs-students/web/common/components/Selects/Select";
import React, { useEffect, useState } from "react";
import { TimelineDateTypeEnum } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import DateTextInput from "@sparcs-students/web/common/components/Forms/DateTextInput";

interface TimeLineDateInputProps {
  dateValue?: [Date | null, Date | null];
  dateType?: TimelineDateTypeEnum | undefined;
  onValueChange?: (value: [Date | null, Date | null]) => void;
  onTypeChange?: (value: TimelineDateTypeEnum | undefined) => void;
  typeItems?: { label: string; value: TimelineDateTypeEnum }[];
}

const TimeLineDateInput: React.FC<TimeLineDateInputProps> = ({
  dateValue = [new Date(), new Date()],
  dateType = undefined,
  onValueChange = () => {},
  onTypeChange = () => {},
  typeItems = [
    { label: "상반기", value: TimelineDateTypeEnum.FirstHalf },
    { label: "하반기", value: TimelineDateTypeEnum.SecondHalf },
    { label: "날짜", value: TimelineDateTypeEnum.Date },
  ],
}) => {
  const [firstDate, setFirstDate] = useState<Date | null>(dateValue[0] ?? null);
  const [secondDate, setSecondDate] = useState<Date | null>(
    dateValue[1] ?? null,
  );
  const [firstMonthText, setFirstMonthText] = useState<string>("");
  const [secondMonthText, setSecondMonthText] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");

  const [selectOption, setSelectOption] = useState<
    TimelineDateTypeEnum | undefined
  >(undefined);

  useEffect(() => {
    if (dateType && dateType !== selectOption) {
      setSelectOption(dateType);
    }
  }, [dateType]);

  useEffect(() => {
    if (firstDate !== null && secondDate !== null) {
      onValueChange?.([firstDate, secondDate]);
    }
  }, [firstDate, secondDate]);

  useEffect(() => {
    if (selectOption !== undefined) {
      onTypeChange?.(selectOption);
    }
  }, [selectOption]);

  useEffect(() => {
    if (
      selectOption === undefined ||
      selectOption === TimelineDateTypeEnum.Date ||
      selectOption === TimelineDateTypeEnum.Month
    ) {
      setPlaceholder("선택하세요.");
    } else if (
      selectOption === TimelineDateTypeEnum.Half ||
      selectOption === TimelineDateTypeEnum.HalfAlways
    ) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      if (month >= 1 && month <= 6) {
        setPlaceholder(`${year}년 상반기`);
      } else {
        setPlaceholder(`${year}년 하반기`);
      }
    }
  }, [selectOption]);

  return (
    <FlexWrapper direction="row" gap={10} style={{ width: "100%" }}>
      <div style={{ width: "140px" }}>
        <Select<TimelineDateTypeEnum>
          items={typeItems}
          value={selectOption ?? TimelineDateTypeEnum.Undefined}
          onChange={option => {
            setSelectOption(option);
            setFirstDate(null);
            setSecondDate(null);
            setFirstMonthText("");
            setSecondMonthText("");
            onTypeChange(option);
          }}
          placeholder="유형 선택"
          insideTimeline
        />
      </div>
      <div style={{ minWidth: "230px", flex: 1 }}>
        {selectOption === TimelineDateTypeEnum.Month ? (
          <FlexWrapper
            direction="row"
            gap={4}
            justify="center"
            style={{ alignItems: "center" }}
          >
            <DateTextInput
              placeholder="20XX.XX"
              value={firstMonthText}
              handleChange={text => {
                const cleaned = text.replace(/\D/g, ""); // 숫자만
                let formatted = cleaned;
                if (cleaned.length >= 5) {
                  formatted = `${cleaned.slice(0, 4)}.${cleaned.slice(4, 6)}.`;
                } else if (cleaned.length >= 1) {
                  formatted = cleaned.slice(0, 4);
                }
                setFirstMonthText(formatted);

                if (cleaned.length >= 4) {
                  const year = parseInt(cleaned.slice(0, 4));
                  const month = parseInt(cleaned.slice(4, 6));
                  const dateObj = new Date(year, month - 1);
                  setFirstDate(dateObj);
                }
              }}
            />
            -
            <DateTextInput
              placeholder="20XX.XX"
              value={secondMonthText}
              handleChange={text => {
                const cleaned = text.replace(/\D/g, ""); // 숫자만
                let formatted = cleaned;
                if (cleaned.length >= 5) {
                  formatted = `${cleaned.slice(0, 4)}.${cleaned.slice(4, 6)}.`;
                } else if (cleaned.length >= 1) {
                  formatted = cleaned.slice(0, 4);
                }
                setSecondMonthText(formatted);

                if (cleaned.length >= 4) {
                  const year = parseInt(cleaned.slice(0, 4));
                  const month = parseInt(cleaned.slice(4, 6));
                  const dateObj = new Date(year, month - 1);
                  setSecondDate(dateObj);
                }
              }}
            />
          </FlexWrapper>
        ) : (
          <DateInput
            selectsRange
            disabled={selectOption !== TimelineDateTypeEnum.Date}
            startDate={
              selectOption === TimelineDateTypeEnum.Date ? firstDate : null
            }
            endDate={
              selectOption === TimelineDateTypeEnum.Date ? secondDate : null
            }
            onChange={(dates: [Date | null, Date | null]) => {
              const [start, end] = dates;
              setFirstDate(start);
              setSecondDate(end);
            }}
            selectedDates={
              selectOption === TimelineDateTypeEnum.Date ||
              TimelineDateTypeEnum.Month
                ? [firstDate, secondDate].filter(
                    (date): date is Date => date !== null,
                  )
                : []
            }
            placeholderText={placeholder}
            dateFormat="yyyy.MM.dd"
            showIcon
          />
        )}
      </div>
    </FlexWrapper>
  );
};

export default TimeLineDateInput;
