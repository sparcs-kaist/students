import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Icon from "@sparcs-students/web/common/components/Icon";

interface SearchInputProps {
  searchText: string;
  handleChange: (value: string) => void;
}

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 36px;
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

const SeachInput = styled.input`
  display: flex;
  flex-direction: row;
  flex: 1;
  outline: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

const PetitionSearchBar: React.FC<SearchInputProps> = ({
  searchText,
  handleChange,
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };
  return (
    <SearchBarWrapper>
      <Icon type="search" size={28} />
      <SearchInputWrapper>
        <SeachInput
          value={searchText}
          placeholder="청원 제목을 검색하세요."
          onChange={handleValueChange}
        />
      </SearchInputWrapper>
    </SearchBarWrapper>
  );
};

export default PetitionSearchBar;
