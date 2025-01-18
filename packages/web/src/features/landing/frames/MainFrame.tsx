"use client";

import React from "react";
import styled from "styled-components";

import colors from "@sparcs-students/web/styles/themes/colors";
import Typography from "@sparcs-students/web/common/components/Typography";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import Banner from "@sparcs-students/web/common/components/Banner/Banner";

const VerticalWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background-color: aquamarine;
`;

const LeftWrapper = styled.div`
  width: 762px;
  flex-grow: 1;
  background-color: lightcoral;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const RightWrapper = styled.div`
  flex-grow: 1;
  background-color: chocolate;
`;
const MainPageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  gap: 56px;
  background-color: aqua;
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
    <MainPageWrapper>
      <LeftWrapper>
        <Banner />
        <SingleColumnTable header="공지사항" rows={[]} />
      </LeftWrapper>
      <RightWrapper>hello</RightWrapper>
    </MainPageWrapper>
  </VerticalWrapper>
);

export default MainPageMainFrame;
