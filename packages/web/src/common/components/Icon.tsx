"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Icon as MUIIcon } from "@mui/material";
import colors from "@sparcs-students/web/styles/themes/colors";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
}

const IconWrapper = styled.span<{
  clickable: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Icon: React.FC<IconProps> = ({
  type,
  size,
  onClick = undefined,
  color = colors.BLACK,
}) => (
  <IconWrapper clickable={!!onClick} onClick={onClick}>
    <MUIIcon style={{ color, fontSize: size }}>{type}</MUIIcon>
  </IconWrapper>
);

export default Icon;
