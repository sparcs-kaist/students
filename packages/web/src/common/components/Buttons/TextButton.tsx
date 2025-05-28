import React from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface ButtonProps {
  disabled: boolean;
  white: boolean;
  light: boolean;
  mini: boolean;
}

const StyledTextButton = styled.button.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<ButtonProps>`
  background: none;
  border: none;
  color: ${({ theme, disabled, color, white }) => {
    if (disabled) return theme.colors.GRAY[100];
    if (color === "blue") {
      return theme.colors.CYAN[700];
    }
    if (color === "red") {
      return theme.colors.RED[500];
    }
    if (color === "white" || white) return theme.colors.WHITE;
    return theme.colors.PRIMARY;
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ mini }) => (mini ? "12px" : "14px")};
  line-height: ${({ mini }) => (mini ? "12px" : "14px")};
  font-weight: ${({ theme, light }) =>
    light ? theme.fonts.WEIGHT.REGULAR : theme.fonts.WEIGHT.MEDIUM};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  text-decoration: underline;
`;

interface TextButtonProps {
  text: string;
  disabled?: boolean;
  white?: boolean;
  light?: boolean;
  mini?: boolean;
  onClick?: () => void;
  color?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  disabled = false,
  white = false,
  light = false,
  mini = false,
  onClick = () => {},
  color = "black",
}) => (
  <StyledTextButton
    disabled={disabled}
    white={white}
    light={light}
    onClick={onClick}
    mini={mini}
    color={color}
  >
    {text}
  </StyledTextButton>
);

export default TextButton;
