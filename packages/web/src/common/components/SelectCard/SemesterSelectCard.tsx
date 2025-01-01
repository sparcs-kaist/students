"use client";

import React from "react";
import styled from "styled-components";
import Radio from "@sparcs-students/web/common/components/Radio/index";
import Typography from "@sparcs-students/web/common/components/Typography";
import RadioOption from "@sparcs-students/web/common/components/Radio/RadioOption";
import Select, {
  SelectItem,
} from "@sparcs-students/web/common/components/Select";

interface SemesterSelectCardProps {
  year: number;
  setYear: (value: number) => void;
  selectItems: SelectItem<number>[];
  isSpring: boolean;
  setIsSpring: (value: boolean) => void;
}

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 136px;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme }) => theme.colors.GREEN[700]};
`;

const CardContent = styled.div`
  display: flex;
  height: 92px;
  padding: 16px 30px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const CardContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SemesterSelectCard: React.FC<SemesterSelectCardProps> = ({
  year,
  setYear,
  selectItems,
  isSpring,
  setIsSpring,
}) => {
  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    const selectedItem = selectItems.find(item => item.value === newYear);
    if (selectedItem) {
      setIsSpring(true);
    }
  };
  return (
    <CardWrapper>
      <CardHeaderWrapper>
        <Typography fs={18} fw="SEMIBOLD" color="WHITE" lh={20}>
          분기 선택
        </Typography>
      </CardHeaderWrapper>
      <CardContent>
        <CardContentWrapper>
          <Select
            items={Array.from(new Set(selectItems))}
            value={year}
            onChange={handleYearChange}
            placeholder="선택하세요."
            errorMessage="필수 항목입니다."
          />
          <RadioWrapper>
            <Radio
              rg="8px"
              cg="0px"
              rows={2}
              columns={1}
              value={String(isSpring)}
              onChange={(boolStr: string) => setIsSpring(JSON.parse(boolStr))}
            >
              <RadioOption value="true" width="82px">
                <Typography fs={16} lh={20} fw="REGULAR">
                  봄학기
                </Typography>
              </RadioOption>
              <RadioOption value="false" width="82px">
                <Typography fs={16} lh={20} fw="REGULAR">
                  가을학기
                </Typography>
              </RadioOption>
            </Radio>
          </RadioWrapper>
        </CardContentWrapper>
      </CardContent>
    </CardWrapper>
  );
};

export default SemesterSelectCard;
