import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

const Dropdown = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  marginTop?: number;
  maxContent?: boolean;
  onlyDropdown?: boolean;
  insideTable?: boolean;
  height?: number;
}>`
  /* TODO: marginTop magic number인데 좀 더 깔끔하게 바꾸는 방법 */
  position: ${({ onlyDropdown, insideTable }) =>
    onlyDropdown || insideTable ? "relative" : "absolute"};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ maxContent }) => (maxContent ? "max-content" : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "fit-content")};
  margin-top: ${({ marginTop, onlyDropdown }) =>
    onlyDropdown ? 0 : marginTop || 0}px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 8px;
  ${({ onlyDropdown }) => (onlyDropdown ? "" : "z-index: 1000;")};
  max-height: 200px;
  overflow-y: auto;
`;

export default Dropdown;
