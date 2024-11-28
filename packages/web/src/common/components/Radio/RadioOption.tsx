"use client";

import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";
import RadioButton from "./RadioButton";

export interface RadioOptionProps<T extends string> {
  value: T;
  checked?: boolean;
  children: React.ReactNode;
  onClick?: (value: T) => void;
  width?: string;
}

const RadioOptionInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ width?: string }>`
  display: flex;
  padding-left: 2px;
  align-items: center;
  gap: 8px;
  width: ${({ width }) => width ?? ""};
  color: ${({ theme }) => theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  cursor: pointer;

  & > * {
    pointer-events: none;
  }
`;

const RadioOption = <T extends string>({
  value,
  checked = false,
  children,
  onClick = () => {},
  width = "",
}: RadioOptionProps<T>) => (
  <RadioOptionInner onClick={() => onClick(value)} width={width}>
    <RadioButton checked={checked} />
    {children}
  </RadioOptionInner>
);

export default RadioOption;
