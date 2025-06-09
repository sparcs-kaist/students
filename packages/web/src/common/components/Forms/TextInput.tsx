import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

/* eslint-disable react/require-default-props */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  constant?: boolean;
  isGroup?: boolean;
  value?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}
/* eslint-enable react/require-default-props */

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

const groupConstantStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[50]};
  color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const Input = styled.input
  .withConfig({
    shouldForwardProp: prop => isPropValid(prop),
  })
  .attrs<TextInputProps>(({ constant }) => ({
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
  ${({ constant, isGroup }) => isGroup && constant && groupConstantStyle}
`;

export const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

export const InputContainer = styled.div`
  flex-direction: column;
  gap: 4px;
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label = "",
      placeholder,
      errorMessage = "",
      disabled = false,
      constant = false,
      isGroup = false,
      value = "",
      handleChange = () => {},
      setErrorStatus = () => {},
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      handleChange(inputValue);
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
          <Input
            ref={ref}
            placeholder={placeholder}
            hasError={!!errorMessage}
            disabled={disabled}
            constant={constant}
            isGroup={isGroup}
            value={value}
            onChange={handleValueChange}
            {...props}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
      </InputWrapper>
    );
  },
);

export default TextInput;
