import DateInput from "@sparcs-students/web/common/components/DateInput";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Select from "@sparcs-students/web/common/components/Selects/Select";
import React, { useEffect, useState } from "react";
import { TimelineDateTypeEnum } from "@sparcs-students/web/features/project/services/_mock/mockProjectTimelineData";

interface TimeLineDateInputProps {
  dateValue?: [Date | null, Date | null];
  dateType?: TimelineDateTypeEnum | undefined;
  onValueChange?: (value: [Date | null, Date | null]) => void;
  onTypeChange?: (value: TimelineDateTypeEnum | undefined) => void;
}

const TimeLineDateInput: React.FC<TimeLineDateInputProps> = ({
  dateValue = undefined,
  dateType = undefined,
  onValueChange = () => {},
  onTypeChange = () => {},
}) => {
  const [firstDate, setFirstDate] = useState<Date | null>(new Date());
  const [secondDate, setSecondDate] = useState<Date | null>(new Date());

  const [selectOption, setSelectOption] = useState<
    TimelineDateTypeEnum | undefined
  >(undefined);

  useEffect(() => {
    if (
      dateValue &&
      (dateValue[0]?.getTime() !== firstDate?.getTime() ||
        dateValue[1]?.getTime() !== secondDate?.getTime())
    ) {
      setFirstDate(dateValue[0]);
      setSecondDate(dateValue[1]);
    }
  }, [dateValue]);

  useEffect(() => {
    if (onValueChange) onValueChange([firstDate, secondDate]);
  }, [firstDate, secondDate]);

  useEffect(() => {
    if (dateType && dateType !== selectOption) {
      setSelectOption(dateType);
    }
  }, [dateType]);

  useEffect(() => {
    if (onTypeChange) onTypeChange(selectOption);
  }, [selectOption]);

  return (
    <FlexWrapper direction="row" gap={10}>
      <div style={{ width: "180px" }}>
        <Select<TimelineDateTypeEnum>
          items={[
            { label: "상반기", value: TimelineDateTypeEnum.FirstHalf },
            { label: "하반기", value: TimelineDateTypeEnum.SecondHalf },
            { label: "날짜", value: TimelineDateTypeEnum.Date },
          ]}
          value={selectOption ?? TimelineDateTypeEnum.Undefined}
          onChange={option => {
            setSelectOption(option);
            onTypeChange(option);
          }}
          placeholder="유형을 선택하세요."
          insideTimeline
        />
      </div>
      <div style={{ minWidth: "300px" }}>
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
            selectOption === TimelineDateTypeEnum.Date
              ? [firstDate, secondDate].filter(
                  (date): date is Date => date !== null,
                )
              : []
          }
          placeholderText={
            selectOption !== TimelineDateTypeEnum.Date &&
            selectOption !== undefined
              ? "선택 완료"
              : "선택하세요."
          }
          dateFormat="yyyy.MM.dd"
          showIcon
        />
      </div>
    </FlexWrapper>
  );
};

export default TimeLineDateInput;
