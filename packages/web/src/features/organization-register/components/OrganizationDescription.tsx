import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import React from "react";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";

export interface DescriptionProps {
  label: string;
  head: string;
  people: number;
  description: string;
}

const RightText = styled(Typography)`
  margin-left: auto;
`;

const StyledDescription = styled(Typography)`
  white-space: pre-line;
`;

const OrganizationDescription = ({
  label,
  head,
  people,
  description,
}: DescriptionProps) => (
  <FlexWrapper direction="column" gap={16}>
    <Typography fs={24} lh={30} color="PRIMARY" fw="BOLD">
      {label}
    </Typography>
    <FlexWrapper direction="row" gap={8}>
      <RightText fs={18} lh={20} color="BLACK" fw="SEMIBOLD">
        대표자 : {head}
      </RightText>
    </FlexWrapper>
    <FlexWrapper direction="row" gap={8}>
      <RightText fs={18} lh={20} color="BLACK" fw="SEMIBOLD">
        부원 : {people}인
      </RightText>
    </FlexWrapper>
    <StyledDescription fs={16} lh={20} color="BLACK">
      {description}
    </StyledDescription>
  </FlexWrapper>
);

export default OrganizationDescription;
