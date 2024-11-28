"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import Select, {
  SelectItem,
} from "@sparcs-students/web/common/components/Select";
import Typography from "@sparcs-students/web/common/components/Typography";

export interface OrganizationItem {
  key: SelectItem<string>;
  values: SelectItem<string>[];
}

interface OrganizationSelectCardProps {
  totalList: OrganizationItem[];
  keyList: SelectItem<string>[];
  selectedKey: string;
  setSelectedKey: (value: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const CardWrapper = styled.div`
  display: flex;
  /* width: 316px;
  height: 138px; */
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
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
  flex-direction: row;
  padding: 21px 33px; // CHACHA: 이것만 다른 것들이랑 패딩이 달라서 확인 필요 20, 32
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  height: fit-content;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]}; // CHACHA: D9D9D9 일단 GRAY 100으로?
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const ArrowWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 18px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 203px;
  /* height: 198px; */
  padding: 8px;
  align-items: flex-start;
  gap: 8px;
`;

const OrganizationSelectCard: React.FC<OrganizationSelectCardProps> = ({
  totalList,
  keyList,
  selectedKey,
  setSelectedKey,
  selectedValue,
  setSelectedValue,
}) => {
  const valueList = useMemo(() => {
    const selectedItem = totalList.find(item => item.key.value === selectedKey);
    return selectedItem?.values || [];
  }, [totalList, selectedKey]);

  return (
    <CardWrapper>
      <CardHeaderWrapper>
        <Typography fs={20} fw="SEMIBOLD" color="WHITE">
          단체 선택
        </Typography>
      </CardHeaderWrapper>
      <CardContent>
        <SelectWrapper>
          <Select
            items={keyList}
            value={selectedKey}
            onChange={setSelectedKey}
            placeholder="선택하세요."
            errorMessage="필수 항목입니다."
            onlyDropdown
          />
        </SelectWrapper>
        <ArrowWrapper>
          <Typography fs={16} fw="BOLD" color="GREEN.300">
            ＞
          </Typography>
        </ArrowWrapper>
        <SelectWrapper>
          <Select
            items={valueList}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="선택하세요."
            errorMessage="필수 항목입니다."
            onlyDropdown
          />
        </SelectWrapper>
      </CardContent>
    </CardWrapper>
  );
};

export default OrganizationSelectCard;
