import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  constant?: boolean;
  value?: string;
  prefix?: string;
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

const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Prefix = styled.span.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ hasPrefix: boolean }>`
  position: absolute;
  left: ${({ hasPrefix }) => (hasPrefix ? "10px" : "0px")};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const Input = styled.input
  .withConfig({
    shouldForwardProp: prop => isPropValid(prop),
  })
  .attrs<TextInputProps>(({ constant }) => ({
    readOnly: constant,
  }))<TextInputProps & { hasError: boolean; hasPrefix: boolean }>`
  display: block;
  width: 100%;
  padding-left: ${({ hasPrefix }) => (hasPrefix ? "24px" : "10px")};
  outline: none;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 14px;
  border: none;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[100]};
  }
  ${({ constant }) => constant && constantStyle}
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
`;

const TableTextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  disabled = false,
  value = "",
  prefix = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const isNumericOnly = Boolean(prefix);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (isNumericOnly) {
      inputValue = inputValue.replace(/[^\d]/g, "");
    }

    handleChange(inputValue);
    console.log(inputValue);
  };

  useEffect(() => {
    const hasError = !!errorMessage;
    if (setErrorStatus) {
      setErrorStatus(hasError);
    }
  }, [errorMessage, setErrorStatus]);

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputContainer>
        {prefix && value && <Prefix hasPrefix={!!prefix}>{prefix}</Prefix>}
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          hasPrefix={!!prefix}
          value={prefix ? value.toString().replace(prefix, "") : value}
          onChange={handleValueChange}
          {...props}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputContainer>
    </InputWrapper>
  );
};

export default TableTextInput;
