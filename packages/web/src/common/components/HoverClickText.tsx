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

interface HoverClickTextProps {
  text: string;
  onClick?: () => void;
}

const HoverClickText = ({ text, onClick = () => {} }: HoverClickTextProps) => (
  <StyledText onClick={onClick}>{text}</StyledText>
);

export default HoverClickText;
