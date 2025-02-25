import { useState } from "react";

import Image from "next/image";
import styled from "styled-components";

import SparcsLogo from "@sparcs-students/web/assets/sparcs-orange.svg";
import Card from "@sparcs-students/web/common/components/Card";
import Typography from "@sparcs-students/web/common/components/Typography";

import type { Member } from "../credits";

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 3px;
`;

const StyledCard = styled(Card)`
  padding: 10px 15px 15px 15px;
  gap: 10px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    width: 180px;
    height: 80px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: 136px;
    height: 68px;
  }

  // @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
  //   width: 122px;
  //   height: 68px;
  // }
`;

const MemberCard = ({ member }: { member: Member }) => {
  const [displayText, setDisplayText] = useState(member.role);

  const handleMouseEnter = () => {
    if (member.comment) {
      setDisplayText(member.comment);
    }
  };

  const handleMouseLeave = () => {
    setDisplayText(member.role);
  };

  return (
    <StyledCard>
      <MemberWrapper>
        <Image src={SparcsLogo} alt="SPARCS Logo" height={20} />
        <Typography
          ff="RALEWAY"
          fw="EXTRABOLD"
          fs={14}
          lh={20}
          color="SPARCS.main"
        >
          {member.nickname}
        </Typography>
        <Typography
          ff="NANUM_SQUARE"
          fw="EXTRABOLD" // TODO: 현재 NANUM_SQUARE는 EXTRABOLD만 존재함
          fs={10}
          lh={16}
          color="SPARCS.member"
        >
          {member.name}
        </Typography>
      </MemberWrapper>
      <Typography
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ff="RALEWAY"
        fw="EXTRABOLD"
        fs={10}
        lh={13}
        color="GRAY.900"
      >
        {displayText}
      </Typography>
    </StyledCard>
  );
};

export default MemberCard;
