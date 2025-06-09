/*
사용법

IconButton으로 쓰고자 하면, iconType prop 전달
Button으로 쓰고자 하면, iconType prop 전달X
Custom Children을 넣고자 하면, iconType, buttonText 전달X

*/

"use client";

import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";

type CompButtonProps = {
  type?: keyof typeof ButtonTypeInner;
  children?: React.ReactNode;
  buttonText?: string;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLDivElement>) => void);
} & HTMLAttributes<HTMLDivElement>;

const ButtonInner = styled.div`
  display: inline-flex;
  width: 80px;
  padding: 8px;
  justify-content: center;
  align-items: flex-end;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const ButtonDefaultInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.WHITE};
  background: ${({ theme }) => theme.colors.GREEN[700]};
  cursor: pointer;
`;

const ButtonReverseInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.GREEN[700]};
  background: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GREEN[700]};
  cursor: pointer;
`;

const ButtonDisabledInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.GRAY[100]};
  background: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  cursor: not-allowed;
`;

const ButtonIconInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.BLACK};
  cursor: pointer;
`;

const ButtonTypeInner = {
  default: ButtonDefaultInner,
  reverse: ButtonReverseInner,
  disabled: ButtonDisabledInner,
  icon: ButtonIconInner,
};

const ButtonWithTextInner = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
`;

const ButtonWithText = (buttonText: string) => (
  <ButtonWithTextInner>
    <Typography>{buttonText}</Typography>
  </ButtonWithTextInner>
);

const ButtonWithChildren = (children: React.ReactNode) => (
  <ButtonWithTextInner>{children}</ButtonWithTextInner>
);

const CompButton = ({
  type = "default",
  children = undefined,
  buttonText = "",

  ...divProps
}: CompButtonProps) => {
  const ButtonChosenInner = ButtonTypeInner[type];

  const ButtonContent = () => {
    if (buttonText !== "") return ButtonWithText(buttonText);
    return ButtonWithChildren(children);
  };

  return (
    <ButtonChosenInner
      {...divProps}
      onClick={type === "disabled" ? undefined : divProps.onClick}
    >
      <ButtonContent />
    </ButtonChosenInner>
  );
};

export default CompButton;
