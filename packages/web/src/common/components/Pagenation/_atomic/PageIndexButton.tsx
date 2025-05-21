import React from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface ButtonProps {
  selected: boolean;
}

const StyledTextButtonWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTextButton = styled.button.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<ButtonProps>`
  background: none;
  border: none;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.PRIMARY : theme.colors.BLACK};
  font-size: "16px";
  line-height: "20px";
  font-weight: ${({ theme, selected }) =>
    selected ? theme.fonts.WEIGHT.SEMIBOLD : theme.fonts.WEIGHT.REGULAR};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
`;

interface StyledTextButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const PageIndexButton: React.FC<StyledTextButtonProps> = ({
  text,
  selected,
  onClick,
}) => (
  <StyledTextButtonWrapper>
    <StyledTextButton selected={selected} onClick={onClick}>
      {text}
    </StyledTextButton>
  </StyledTextButtonWrapper>
);

export default PageIndexButton;
