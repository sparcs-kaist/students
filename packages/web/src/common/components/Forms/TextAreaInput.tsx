import React, { ChangeEvent, TextareaHTMLAttributes, useEffect } from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";
import {
  errorBorderStyle,
  disabledStyle,
  InputWrapper,
  InputContainer,
} from "./TextInput";

/* eslint-disable react/require-default-props */
export interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  height?: number;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}
/* eslint-enable react/require-default-props */

const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ hasError: boolean; height: number }>`
  height: ${({ height }) => `${height}px`};
  resize: none;
  overflow: auto;
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
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.GREEN[600]};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.GRAY[200]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[100]};
  }
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
`;

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      label = "",
      placeholder,
      errorMessage = "",
      disabled = false,
      value = "",
      handleChange = () => {},
      setErrorStatus = () => {},
      id,
      height = 190,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          <StyledTextArea
            ref={ref}
            id={id}
            placeholder={placeholder}
            hasError={!!errorMessage}
            disabled={disabled}
            value={value}
            onChange={handleValueChange}
            aria-invalid={!!errorMessage}
            {...props}
            height={height}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
      </InputWrapper>
    );
  },
);

export default TextAreaInput;
