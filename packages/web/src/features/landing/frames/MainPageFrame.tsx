"use client";

import Banner from "@sparcs-students/web/common/components/Banner/Banner";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Calendar from "@sparcs-students/web/common/components/Calendar";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import Typography from "@sparcs-students/web/common/components/Typography";
import colors from "@sparcs-students/web/styles/themes/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface RowProps {
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
}
interface MainPageFrameProps {
  notice: RowProps[];
  _isMobile?: boolean;
}

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  height: 100%;
`;

const LeftWrapper = styled.div`
  width: 762px;
  @media (max-width: 1440px) {
    width: 635px;
  }
  @media (max-width: 1200px) {
    width: 508px;
  }

  display: flex;
  /* flex-grow: 1; */
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
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
  flex-direction: row;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  justify-content: space-between;
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 20px;
  }
  align-items: center;
  width: 100%;
`;

const StyledSpan = styled.span`
  color: ${colors.PRIMARY};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const ButtonWrapperLarge = styled.div`
  margin-left: 150px;
  flex-shrink: 0;
`;

const ButtonWrapperSmall = styled.div`
  display: flex;
  align-self: flex-end;
`;

const LargeFrame: React.FC<MainPageFrameProps> = ({
  notice,
  _isMobile = false,
}) => (
  <VerticalWrapper>
    <PageTitleWrapper>
      <Typography fw="BOLD" fs={30} style={{ width: "fit-content" }}>
        KAIST 4천 학우의 생활에 <StyledSpan>필요한 서비스</StyledSpan>를{" "}
        <StyledSpan>한곳</StyledSpan>에.
      </Typography>
      <ButtonWrapperLarge>
        <Button>
          <Typography fs={16} lh={16}>
            학생회비 납부여부 확인하러 가기
          </Typography>
        </Button>
      </ButtonWrapperLarge>
    </PageTitleWrapper>

    <MainPageWrapper>
      <LeftWrapper>
        <Banner />
        <SingleColumnTable
          header="공지사항"
          rows={notice}
          mini
          moreLink="/notice"
        />
      </LeftWrapper>
      <RightWrapper>
        <Calendar title="학사일정" existDates={[]} selectedDates={[]} />
      </RightWrapper>
    </MainPageWrapper>
  </VerticalWrapper>
);

const SmallFrame: React.FC<MainPageFrameProps> = ({
  notice,
  _isMobile = false,
}) => (
  <VerticalWrapper>
    <PageTitleWrapper>
      <Typography
        fw="BOLD"
        fs={_isMobile ? 20 : 30}
        lh={_isMobile ? 28 : 40}
        style={{ width: "fit-content" }}
      >
        KAIST 4천 학우의 생활에 <StyledSpan>필요한 서비스</StyledSpan>를{" "}
        <StyledSpan>한곳</StyledSpan>에.
      </Typography>
      <ButtonWrapperSmall>
        <Button>
          <Typography fs={_isMobile ? 12 : 16} lh={_isMobile ? 12 : 16}>
            학생회비 납부여부 확인하러 가기
          </Typography>
        </Button>
      </ButtonWrapperSmall>
    </PageTitleWrapper>
    <Banner />
    <Calendar title="학사일정" existDates={[]} selectedDates={[]} />
    <SingleColumnTable
      header="공지사항"
      rows={notice}
      mini={_isMobile}
      moreLink="/notice"
    />
  </VerticalWrapper>
);

const MainPageFrame: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setIsSmallScreen(true);
        if (window.innerWidth <= 720) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      } else {
        setIsSmallScreen(false);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const notice: RowProps[] = [
    {
      tag: "총학",
      content: "2025년 가을학기 예결산안 매뉴얼",
      date: new Date("2025-08-20"),
      link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    },
    {
      tag: "총학",
      content: "2025년 가을학기 예결산안 양식",
      date: new Date("2025-08-18"),
      link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    },
    {
      tag: "감사원",
      content: "2025년 가을학기 예결산 제출 파일 양식",
      date: new Date("2025-08-18"),
      link: "https://linktr.ee/kaistbai",
    },
    {
      tag: "감사원",
      content: "2025년 가을학기 감사 매뉴얼",
      date: new Date("2025-08-10"),
      link: "https://linktr.ee/kaistbai",
    },
  ];

  return isSmallScreen ? (
    <SmallFrame notice={notice.slice(0, 4)} _isMobile={isMobile} />
  ) : (
    <LargeFrame notice={notice.slice(0, 4)} />
  );
};

export default MainPageFrame;
