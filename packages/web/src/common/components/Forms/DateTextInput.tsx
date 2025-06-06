import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

// PhoneInput, RentalInput에서 사용하기 위해 export
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  constant?: boolean;
  value?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}

export const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[700]};
`;

export const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[50]};
  border-color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const constantStyle = css`
  border-color: ${({ theme }) => theme.colors.GRAY[100]};
  cursor: not-allowed;
`;

const Input = styled.input.attrs<TextInputProps>(({ constant }) => ({
  readOnly: constant,
}))<TextInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &:focus {
    border-color: ${({ theme, hasError, disabled, constant }) =>
      !hasError && !disabled && !constant && theme.colors.GREEN[600]};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled, constant }) =>
      !hasError && !disabled && !constant && theme.colors.GRAY[200]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[100]};
  }
  ${({ constant }) => constant && constantStyle}
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
`;

export const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

// Component
const DateTextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  disabled = false,
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6);
    }

    handleChange(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    if (e.key === "Backspace" && selectionStart === selectionEnd) {
      if (selectionStart > 0 && input.value[selectionStart - 1] === ".") {
        e.preventDefault();

        const newValue =
          input.value.slice(0, selectionStart - 2) +
          input.value.slice(selectionStart);

        handleChange(newValue);

        setTimeout(() => {
          input.setSelectionRange(selectionStart - 2, selectionStart - 2);
        }, 0);
      }
    }
  };

  useEffect(() => {
    const hasError = !!errorMessage;
    if (setErrorStatus) {
      setErrorStatus(hasError);
    }
  }, [errorMessage, setErrorStatus]);

  useEffect(() => {
    if (value.length === 8) {
      const monthPart = value.slice(5, 7);
      const month = parseInt(monthPart);

      if (Number.isNaN(month) || month < 1 || month > 12) {
        setErrorStatus?.(true);
      } else {
        setErrorStatus?.(false);
      }
    }
  }, [value, setErrorStatus]);

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputContainer>
    </InputWrapper>
  );
};

export default DateTextInput;
