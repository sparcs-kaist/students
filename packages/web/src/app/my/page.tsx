"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProfileCard from "@sparcs-students/web/features/my/components/ProfileCard";
import StudentFeeCard from "@sparcs-students/web/features/my/components/StudentFeeCard";
import Typography from "@sparcs-students/web/common/components/Typography";
import MyOrganizationTable from "@sparcs-students/web/features/my/components/MyOrganizationTable";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    max-width: 1200px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    max-width: 960px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    max-width: 720px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    max-width: 100%;
    padding: 0 12px;
  }
`;

const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MyPage = () => (
  <PageContainer>
    <FlexWrapper direction="column" gap={20}>
      <Typography fs={30} lh={40} color="GREEN.800" fw="BOLD">
        마이페이지
      </Typography>
      <FlexWrapper direction="column" gap={30}>
        <CardsRow>
          <ProfileCard />
          <StudentFeeCard />
        </CardsRow>
        <FlexWrapper direction="column" gap={10}>
          <MyOrganizationTable />
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  </PageContainer>
);

export default MyPage;
