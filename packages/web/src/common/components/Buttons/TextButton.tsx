import React from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled: boolean;
  white: boolean;
  light: boolean;
  mini: boolean;
}

const StyledTextButton = styled.button<ButtonProps>`
  background: none;
  border: none;
  color: ${({ theme, disabled, white }) => {
    if (disabled) return theme.colors.GRAY[100];
    if (white) return theme.colors.WHITE;
    return theme.colors.PRIMARY;
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ mini }) => (mini ? "12px" : "16px")};
  line-height: ${({ mini }) => (mini ? "12px" : "20px")};
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
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  disabled = false,
  white = false,
  light = false,
  mini = false,
  onClick = () => {},
}) => (
  <StyledTextButton
    disabled={disabled}
    white={white}
    light={light}
    onClick={onClick}
    mini={mini}
  >
    {text}
  </StyledTextButton>
);

export default TextButton;
