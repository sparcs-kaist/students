"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Icon as MUIIcon } from "@mui/material";
import colors from "@sparcs-students/web/styles/themes/colors";
import isPropValid from "@emotion/is-prop-valid";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
}

const IconInner = styled(MUIIcon).withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  clickable: boolean;
}>`
  display: flex;
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
  <IconInner
    clickable={!!onClick}
    onClick={onClick}
    style={{ color, fontSize: size }}
  >
    {type}
  </IconInner>
);

export default Icon;
