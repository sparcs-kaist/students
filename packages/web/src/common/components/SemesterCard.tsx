"use client";

import React from "react";
import styled from "styled-components";
import Radio from "@sparcs-students/web/common/components/Radio/index";
import Typography from "./Typography";
import RadioOption from "./Radio/RadioOption";
import Select, { SelectItem } from "./Select";

interface SemesterCardProps {
  year: number;
  setYear: (value: number) => void;
  selectItems: SelectItem<number>[];
  isSpring: boolean;
  setIsSpring: (value: boolean) => void;
}

const CardWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 148px; // CHACHA: 이 정도는 돼야 에러 메시지 떠도 컴포넌트 안의 요소들 위치가 왔다갔다 안 해요.
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 13px 33px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme }) => theme.colors.GREEN[700]};
`;

const CardContent = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]}; // CHACHA: D9D9D9 일단 GRAY 100으로?
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const CardContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const SelectWrapper = styled.div`
  width: 150px;
`;

const RadioWrapper = styled.div`
  width: fit-content;
`;

const SemesterCard: React.FC<SemesterCardProps> = ({
  year,
  setYear,
  selectItems,
  isSpring,
  setIsSpring,
}) => (
  <CardWrapper>
    <CardHeaderWrapper>
      <Typography fs={20} fw="SEMIBOLD" color="WHITE">
        분기 선택
      </Typography>
    </CardHeaderWrapper>
    <CardContent>
      <CardContentWrapper>
        <SelectWrapper>
          <Select
            items={selectItems}
            value={year}
            onChange={setYear}
            placeholder="선택하세요."
            errorMessage="필수 항목입니다."
          />
        </SelectWrapper>
        <RadioWrapper>
          <Radio
            rg="8px"
            cg="0px"
            rows={2}
            columns={1}
            value={String(isSpring)}
            onChange={(boolStr: string) => setIsSpring(JSON.parse(boolStr))}
          >
            <RadioOption value="true">
              <Typography fs={16} lh={20} fw="REGULAR">
                봄학기
              </Typography>
            </RadioOption>
            <RadioOption value="false">
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

export default SemesterCard;
