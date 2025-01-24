"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-students/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-students/web/common/components/PageHead";

import SectionTitle from "@sparcs-students/web/common/components/SectionTitle";
import MemberCardSection from "@sparcs-students/web/features/credits/components/MemberCardSection";
import credits from "@sparcs-students/web/features/credits/credits";

const CreditCardsFlexWrapper = styled(FlexWrapper)`
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 10px;
  }
`;

const ResponsiveMemberCardSectionWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 16px;
  }
`;

const Credits: React.FC = () => {
  const [toggleFold, setToggleFold] = React.useState(false);
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead title="만든 사람들" />
      {credits.map((credit, index) => (
        <CreditCardsFlexWrapper
          direction="column"
          gap={40}
          key={credit.semester}
        >
          {index === 0 ? (
            <>
              <SectionTitle size="lg">{credit.semester}</SectionTitle>
              <ResponsiveMemberCardSectionWrapper>
                <MemberCardSection semesterCredit={credit} leftMargin={24} />
              </ResponsiveMemberCardSectionWrapper>
            </>
          ) : (
            <FoldableSectionTitle
              title={credit.semester}
              toggle={toggleFold}
              toggleHandler={() => {
                setToggleFold(!toggleFold);
              }}
            >
              <ResponsiveMemberCardSectionWrapper>
                <MemberCardSection semesterCredit={credit} />
              </ResponsiveMemberCardSectionWrapper>
            </FoldableSectionTitle>
          )}
        </CreditCardsFlexWrapper>
      ))}
    </FlexWrapper>
  );
};
export default Credits;
