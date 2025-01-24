"use client";

import React from "react";

import styled from "styled-components";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Typography from "@sparcs-students/web/common/components/Typography";

const FoldableSectionOuter = styled.div`
  width: 100%;
  max-width: calc(100vw + (100% - 100vw));
`;

const FoldableSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const SemesterFoldableTitle: React.FC<{
  title: string;
  toggle?: boolean;
  toggleHandler: () => void;
  children?: React.ReactNode;
}> = ({ title, toggle = null, toggleHandler = () => {}, children = null }) => (
  <FoldableSectionOuter>
    <FoldableSectionTitleInner>
      <Typography fs={24} lh={30} fw="BOLD">
        {title}
      </Typography>
      <IconButton onClick={toggleHandler}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </FoldableSectionTitleInner>
    {toggle && children}
  </FoldableSectionOuter>
);

export default SemesterFoldableTitle;
