"use client";

import styled from "styled-components";

const ResponsiveContent = styled.div`
  width: 1200px;
  min-height: calc(100vh - 67px - 100px);
  margin: 30px auto;

  @media (max-width: 1440px) {
    width: 1040px;
  }

  @media (max-width: 1200px) {
    width: 800px;
  }

  @media (max-width: 960px) {
    width: 560px;
  }

  @media (max-width: 720px) {
    width: 260px;
    margin: 10px auto;
  }
`;

export default ResponsiveContent;
