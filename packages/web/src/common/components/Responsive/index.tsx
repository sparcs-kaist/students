"use client";

import styled from "styled-components";

const ResponsiveContent = styled.div`
  min-height: calc(100vh - 105px - 160px);
  margin: 80px auto;

  @media (min-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    width: ${({ theme }) => theme.responsive.CONTENT.xxl};
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    width: ${({ theme }) => theme.responsive.CONTENT.xl};
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: ${({ theme }) => theme.responsive.CONTENT.lg};
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    width: ${({ theme }) => theme.responsive.CONTENT.md};
    min-height: calc(100vh - 105px - 80px);
    margin: 40px auto;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: ${({ theme }) => theme.responsive.CONTENT.sm};
    min-height: calc(100vh - 105px - 40px);
    margin: 20px auto;
  }
`;

export default ResponsiveContent;
