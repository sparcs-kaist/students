"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import colors from "@sparcs-students/web/styles/themes/colors";
import Typography from "@sparcs-students/web/common/components/Typography";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import Banner from "@sparcs-students/web/common/components/Banner/Banner";
import Calendar from "@sparcs-students/web/common/components/Calendar/Calendar";

const VerticalWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 105px - 160px);

  @media (max-width: 960px) {
    height: calc(100vh - 105px - 80px);
  }
  @media (max-width: 960px) {
    gap: 30px;
    height: auto;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  background-color: aqua;
`;

const LeftWrapper = styled.div`
  width: 762px;
  @media (max-width: 1440px) {
    width: 635px;
  }
  @media (max-width: 1200px) {
    width: 508px;
  }

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightWrapper = styled.div`
  flex-grow: 1;
`;

const MainPageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-direction: row;
  gap: 56px;
`;

const PageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  color: ${colors.PRIMARY};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const LargeFrame: React.FC = () => (
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
      <RightWrapper>
        <Calendar title="학사일정" existDates={[]} selectedDates={[]} />
      </RightWrapper>
    </MainPageWrapper>
  </VerticalWrapper>
);

const SmallFrame: React.FC = () => (
  <VerticalWrapper>
    <PageTitleWrapper>
      <Typography fw="BOLD" fs={30} style={{ width: "fit-content" }}>
        KAIST 4천 학우의 생활에 <StyledSpan>필요한 서비스</StyledSpan>를{" "}
        <StyledSpan>한곳</StyledSpan>에.
      </Typography>
    </PageTitleWrapper>
    <Banner />
    <Calendar title="학사일정" existDates={[]} selectedDates={[]} />
    <SingleColumnTable header="공지사항" rows={[]} />
  </VerticalWrapper>
);

const MainPageMainFrame: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // 화면 크기 변화에 대응하는 useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // 화면 크기 변경 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 마운트 시 초기 크기 확인
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen ? <SmallFrame /> : <LargeFrame />;
};

export default MainPageMainFrame;
