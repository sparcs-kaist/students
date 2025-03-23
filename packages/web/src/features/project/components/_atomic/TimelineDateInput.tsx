import DateInput from "@sparcs-students/web/common/components/DateInput";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Select from "@sparcs-students/web/common/components/Select";
import { useState } from "react";

const TimeLineDateInput = () => {
  const [firstDate, setFirstDate] = useState<Date | null>(new Date());
  const [secondDate, setSecondDate] = useState<Date | null>(new Date());

  const [selectOption, setSelectOption] = useState<string | undefined>(
    undefined,
  );

  console.log(selectOption);
  return (
    <FlexWrapper direction="row" gap={10}>
      <div style={{ width: "180px" }}>
        <Select
          items={[
            { label: "상반기", value: "상반기" },
            { label: "하반기", value: "하반기" },
            { label: "날짜", value: "날짜" },
          ]}
          value={selectOption}
          onChange={option => setSelectOption(option)}
          placeholder="유형을 선택하세요."
          insideTimeline
        />
      </div>
      <div style={{ minWidth: "300px" }}>
        <DateInput
          selectsRange
          disabled={selectOption !== "날짜"}
          startDate={selectOption === "날짜" ? firstDate : null}
          endDate={selectOption === "날짜" ? secondDate : null}
          onChange={(dates: [Date | null, Date | null]) => {
            const [start, end] = dates;
            setFirstDate(start);
            setSecondDate(end);
          }}
          selectedDates={
            selectOption === "날짜"
              ? [firstDate, secondDate].filter(
                  (date): date is Date => date !== null,
                )
              : []
          }
          placeholderText={
            selectOption !== "날짜" && selectOption !== undefined
              ? "선택 완료"
              : "선택하세요."
          }
          dateFormat="yyyy.MM.dd"
        />
      </div>
    </FlexWrapper>
  );
};

export default TimeLineDateInput;
