import React from "react";

import styled from "styled-components";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Typography from "@sparcs-students/web/common/components/Typography";

const FoldableSectionOuter = styled.div`
  width: 100%;
  max-width: calc(100vw + (100% - 100vw));
  gap: 10px;
`;

const FoldableSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  width: 100%;
`;

const SemesterTitle = styled(Typography)`
  font-size: 24px;
  line-height: 30px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.BOLD};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 18px;
    line-height: 20px;
    font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  }
`;

const SemesterFoldableTitle: React.FC<{
  title: string;
  toggle?: boolean;
  toggleHandler: () => void;
  children?: React.ReactNode;
}> = ({ title, toggle = null, toggleHandler, children = null }) => (
  <FoldableSectionOuter>
    <FoldableSectionTitleInner>
      <SemesterTitle>{title}</SemesterTitle>
      <IconButton onClick={toggleHandler}>
        {toggle ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </FoldableSectionTitleInner>
    {toggle && children}
  </FoldableSectionOuter>
);

export default SemesterFoldableTitle;
