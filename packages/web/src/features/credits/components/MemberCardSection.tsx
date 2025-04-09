import React from "react";

import styled from "styled-components";

import { Member, SemesterCredit } from "../credits";

import MemberCard from "./MemberCard";

interface MemberCardSectionProps {
  semesterCredit: SemesterCredit;
}

const MemberCardWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    grid-template-columns: repeat(2, 1fr);
    & > *:nth-child(2n + 1) {
      justify-self: end;
    }
    & > *:nth-child(2n) {
      justify-self: start;
    }
  }
`;

const MemberCardSection: React.FC<MemberCardSectionProps> = ({
  semesterCredit,
}) => {
  const compareMembers = (a: Member, b: Member) => {
    if (a.roleType === b.roleType) {
      return a.nickname.localeCompare(b.nickname);
    }
    return a.roleType - b.roleType;
  };

  return (
    <MemberCardWrapper>
      {semesterCredit.members
        .sort((a, b) => compareMembers(a, b))
        .map(member => (
          <MemberCard key={member.nickname} member={member} />
        ))}
    </MemberCardWrapper>
  );
};

export default MemberCardSection;
