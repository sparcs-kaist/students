"use client";

import React from "react";
import styled from "styled-components";

import colors from "@sparcs-students/web/styles/themes/colors";
import Typography from "@sparcs-students/web/common/components/Typography";
import SingleColumnTable from "../components/\bSingleColumnTable";

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  gap: 80px;
`;

const MainPageWrapper = styled.div`
  height: 300px;
`;

const PageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  color: ${colors.PRIMARY};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const MainPageMainFrame: React.FC = () => (
  <VerticalWrapper>
    <PageTitleWrapper>
      <Typography fw="BOLD" fs={30} style={{ width: "fit-content" }}>
        KAIST 4천 학우의 생활에 <StyledSpan>필요한 서비스</StyledSpan>를{" "}
        <StyledSpan>한곳</StyledSpan>에.
      </Typography>
    </PageTitleWrapper>
    <MainPageWrapper />
    <TableWrapper>
      <SingleColumnTable />
      <SingleColumnTable />
    </TableWrapper>
  </VerticalWrapper>
);

export default MainPageMainFrame;
