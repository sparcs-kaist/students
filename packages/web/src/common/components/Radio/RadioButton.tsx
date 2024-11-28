"use client";

import colors from "@sparcs-students/web/styles/themes/colors";
import React from "react";

const RadioButton = ({ checked = false }: { checked: boolean }) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="16"
  //   height="16"
  //   viewBox="0 0 16 16"
  //   fill="none"
  // >
  //   <rect
  //     width="16"
  //     height="16"
  //     rx="8"
  //     fill={checked ? colors.PRIMARY : colors.GRAY[200]}
  //   />
  //   <rect x="4" y="4" width="8" height="8" rx="4" fill={colors.WHITE} />
  // </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <circle cx="8" cy="8" r="7" stroke={colors.GREEN[600]} strokeWidth="2" />
    {checked ? <circle cx="8" cy="8" r="4" fill={colors.GREEN[800]} /> : null}
    {/* <circle
      cx="8"
      cy="8"
      r="4"
      fill={checked ? colors.GREEN[800] : colors.WHITE} */}
    {/* /> */}
  </svg>
);

export default RadioButton;
