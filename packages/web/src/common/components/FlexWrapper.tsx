import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

interface FlexWrapperProps {
  direction: "row" | "column";
  gap: number;
  justify?: string;
  padding?: string;
  height?: string;
  xOverflow?: boolean;
}

const FlexWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<FlexWrapperProps>`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => `${gap}px`};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding ?? 0};
  height: ${({ height }) => height ?? "fit-content"};
  ${({ xOverflow }) => (xOverflow ? "overflow-x: auto" : null)};
`;

export default FlexWrapper;
