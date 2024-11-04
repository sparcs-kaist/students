"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Icon from "@sparcs-students/web/common/components/Icon";

import paths from "@sparcs-students/web/constants/paths";
import { useTranslations } from "next-intl";

const LoginInner = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const Login = () => {
  const t = useTranslations();
  return (
    <LoginInner href={paths.LOGIN.path}>
      <Icon type="person" size={16} />
      {t(paths.LOGIN.name)}
    </LoginInner>
  );
};

export default Login;
