"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import Select, {
  SelectItem,
} from "@sparcs-students/web/common/components/Select";
import Typography from "@sparcs-students/web/common/components/Typography";
import colors from "@sparcs-students/web/styles/themes/colors";

import Icon from "../Icon";

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
  disabled?: boolean;
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  justify-self: stretch;
  height: 276px;
`;

const CardHeaderWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.GRAY[400] : theme.colors.GREEN[700]};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  height: fit-content;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const CardContentInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
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
  height: 200px;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.GREEN[300]};
`;

const OrganizationSelectCard: React.FC<OrganizationSelectCardProps> = ({
  totalList,
  keyList,
  selectedKey,
  setSelectedKey,
  selectedValue,
  setSelectedValue,
  disabled = false,
}) => {
  const valueList = useMemo(() => {
    const selectedItem = totalList.find(item => item.key.value === selectedKey);
    return selectedItem?.values || [];
  }, [totalList, selectedKey]);

  const handleKeyChange = (newKey: string) => {
    setSelectedKey(newKey);

    const selectedItem = totalList.find(item => item.key.value === newKey);
    if (selectedItem && selectedItem.values.length > 0) {
      setSelectedValue(selectedItem.values[0].value);
    } else {
      setSelectedValue("");
    }
  };

  return (
    <CardWrapper>
      <CardHeaderWrapper disabled={disabled}>
        <Typography fs={18} fw="SEMIBOLD" color="WHITE" lh={20}>
          단체 선택
        </Typography>
      </CardHeaderWrapper>
      <CardContent>
        <CardContentInner>
          <SelectWrapper>
            <Select<string>
              items={keyList}
              value={selectedKey}
              onChange={handleKeyChange}
              placeholder="선택하세요."
              errorMessage="필수 항목입니다."
              noOptionMessage="항목을 선택하세요."
              onlyDropdown
              dropdownHeight={200}
              disabled={disabled}
            />
          </SelectWrapper>
          <ArrowWrapper>
            <IconWrapper>
              <Icon
                type="arrow_forward_ios"
                size={24}
                color={disabled ? colors.GRAY[400] : colors.GREEN[300]}
              />
            </IconWrapper>
          </ArrowWrapper>
          <SelectWrapper>
            <Select
              items={valueList}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="선택하세요."
              errorMessage="필수 항목입니다."
              noOptionMessage="항목을 선택하세요."
              onlyDropdown
              dropdownHeight={200}
              disabled={disabled}
            />
          </SelectWrapper>
        </CardContentInner>
      </CardContent>
    </CardWrapper>
  );
};

export default OrganizationSelectCard;
