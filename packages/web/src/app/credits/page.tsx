"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageHead from "@sparcs-students/web/common/components/PageHead";

import MemberCardSection from "@sparcs-students/web/features/credits/components/MemberCardSection";
import credits from "@sparcs-students/web/features/credits/credits";
import SemesterFoldableTitle from "@sparcs-students/web/features/credits/components/SemesterFoldableTitle";

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
  const [toggleFold, setToggleFold] = React.useState(
    new Array(credits.length).fill(true),
  );
  return (
    <FlexWrapper direction="column" gap={30}>
      <PageHead
        title="만든 사람들"
        items={[{ name: "만든 사람들", path: "/credits" }]}
      />
      {credits.map((credit, index) => (
        <CreditCardsFlexWrapper
          direction="column"
          gap={30}
          key={credit.semester}
        >
          <SemesterFoldableTitle
            title={credit.semester}
            toggle={toggleFold[index]}
            toggleHandler={() => {
              setToggleFold(prev => {
                const newToggleFold = [...prev];
                newToggleFold[index] = !newToggleFold[index];
                return newToggleFold;
              });
            }}
          >
            <ResponsiveMemberCardSectionWrapper>
              <MemberCardSection semesterCredit={credit} />
            </ResponsiveMemberCardSectionWrapper>
          </SemesterFoldableTitle>
        </CreditCardsFlexWrapper>
      ))}
    </FlexWrapper>
  );
};
export default Credits;
