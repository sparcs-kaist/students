"use client";

import React from "react";

import styled from "styled-components";

const PageTitleInner = styled.div`
  position: relative;
  width: fit-content;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 30px;
  line-height: 24px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 20px;
    line-height: 30px;
  }
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.BOLD};
  color: ${({ theme }) => theme.colors.GREEN[800]};
`;

const PageTitle: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => <PageTitleInner>{children}</PageTitleInner>;

export default PageTitle;
