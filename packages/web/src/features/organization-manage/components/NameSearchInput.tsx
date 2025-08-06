import Icon from "@sparcs-students/web/common/components/Icon";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface NameSearchInputProps {
  searchText: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  align-items: center;
  flex: 1;
  &:hover {
    border-color: ${({ theme }) => theme.colors.GRAY[100]};
  }
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }
`;

const SearchInput = styled.input`
  width: 336px;
  display: flex;
  flex-direction: row;
  flex: 1;
  outline: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

const NameSearchInput: React.FC<NameSearchInputProps> = ({
  searchText,
  onChange = (_: string) => {},
  onSearch = (_: string) => {},
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };
  return (
    <SearchInputWrapper>
      <SearchInput
        value={searchText}
        placeholder="이름을 입력해주세요."
        onChange={handleValueChange}
      />
      <Icon type="search" size={20} onClick={() => onSearch(searchText)} />
    </SearchInputWrapper>
  );
};

export default NameSearchInput;
