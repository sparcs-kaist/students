import React from "react";
import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";

const StyledText = styled(Typography)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.PRIMARY};
  }
`;

const HoverClickText = ({ text = "" }: { text: string }) => (
  <StyledText>{text}</StyledText>
);

export default HoverClickText;
