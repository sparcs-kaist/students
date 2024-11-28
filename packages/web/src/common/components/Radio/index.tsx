"use client";

import styled from "styled-components";
import React, { ReactElement, ReactNode, cloneElement } from "react";
import RadioOption, { type RadioOptionProps } from "./RadioOption";

type RadioProps<T extends string> = {
  children: ReactElement<RadioOptionProps<T>>[];
  value: T;
  onChange: (value: T) => void;
  rows?: number;
  columns?: number;
  rg?: string;
  cg?: string;
};

function isRadioOptionElement<T extends string>(
  child: ReactNode,
): child is ReactElement<RadioOptionProps<T>> {
  return React.isValidElement(child) && "value" in child.props;
}

const StyledRadioInner = styled.div<{
  rows?: number;
  columns?: number;
  rg: string;
  cg: string;
}>`
  display: grid;
  grid-template-rows: ${({ rows }) =>
    rows !== 1 ? `repeat(${rows}, auto)` : "auto"};
  grid-template-columns: ${({ columns }) =>
    columns !== 1 ? `repeat(${columns}, auto)` : "auto"};
  row-gap: ${({ rg }) => rg};
  column-gap: ${({ cg }) => cg};
`;

const Radio = <T extends string>({
  value,
  onChange,
  children,
  rows = 1,
  columns = children.length,
  rg = "12px",
  cg = "12px",
}: RadioProps<T>) => {
  const handleChange = (newValue: T) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <StyledRadioInner rows={rows} columns={columns} rg={rg} cg={cg}>
      {React.Children.map(children, child => {
        if (isRadioOptionElement<T>(child)) {
          return cloneElement(child, {
            checked: child.props.value === value,
            onClick: () => handleChange(child.props.value),
          });
        }
        return child;
      })}
    </StyledRadioInner>
  );
};
Radio.Option = RadioOption;

export default Radio;
