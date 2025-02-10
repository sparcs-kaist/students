import React, {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import styled, { css } from "styled-components";

import Icon from "@sparcs-students/web/common/components/Icon";

import colors from "@sparcs-students/web/styles/themes/colors";

import {
  SearchItem,
  RightContentWrapper,
} from "@sparcs-students/web/common/components/Forms/SearchSelect/SearchItem";

import ErrorMessage from "../_atomic/ErrorMessage";
import Label from "../_atomic/Label";

interface SearchSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  disabled?: boolean;
  hasError?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>; //
}

const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[700]};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
`;

const Input = styled.input<InputProps>`
  display: block;
  width: 100%;
  padding: 8px 12px 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &:focus {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.PRIMARY};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.GRAY[100]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError, disabled }) => hasError && !disabled && errorBorderStyle}
`;

const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
  position: relative;
  justify-content: center;
`;

const SearchList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  opacity: 1;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  padding: 8px;
  max-height: 280px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchSelect: React.FC<SearchSelectProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  disabled = false,
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  onChange = undefined,
  options,
  selected,
  setSelected,
  ...props
}) => {
  const [listToggle, setListToggle] = useState(false);

  const filteredOptions = value
    ? options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase()),
      )
    : options;

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };

  const handleItemClick = (clickedValue: string) => {
    setSelected(clickedValue);
    handleChange(clickedValue);
    setListToggle(false);
  };

  useEffect(() => {
    if (setErrorStatus) {
      setErrorStatus(!!errorMessage);
    }
  }, [errorMessage, setErrorStatus]);

  return (
    <InputWrapper onFocus={() => setListToggle(true)}>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          onChange={onChange ?? handleValueChange}
          {...props}
        />
        <RightContentWrapper onClick={() => setListToggle(!listToggle)}>
          <Icon
            type={listToggle ? "expand_less" : "expand_more"}
            size={20}
            color={disabled ? colors.GRAY[200] : colors.BLACK}
          />
        </RightContentWrapper>
      </InputContainer>
      <InputContainer>
        {filteredOptions.length !== 0 && listToggle && (
          <SearchList onFocus={() => setListToggle(true)}>
            {filteredOptions.map(option => (
              <SearchItem
                key={option}
                onClick={handleItemClick}
                selected={selected}
                isSelected={option === selected}
              >
                {option}
              </SearchItem>
            ))}
          </SearchList>
        )}
        {errorMessage && !listToggle && !disabled && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </InputContainer>
    </InputWrapper>
  );
};

export default SearchSelect;
