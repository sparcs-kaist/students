"use client";

import colors from "@sparcs-students/web/styles/themes/colors";
import React from "react";

const RadioButton = ({ checked = false }: { checked: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 17 17" // CHACHA: 디자인은 16 16 인데 자꾸 원 끝에가 묘하게 잘려서..
    fill="none"
  >
    <circle cx="8" cy="8" r="7" stroke={colors.GREEN[600]} strokeWidth="2" />
    {checked ? <circle cx="8" cy="8" r="4" fill={colors.GREEN[800]} /> : null}
  </svg>
);

export default RadioButton;
