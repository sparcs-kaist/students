import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

const Dropdown = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ marginTop?: number; maxContent?: boolean; onlyDropdown?: boolean }>`
  /* TODO: marginTop magic number인데 좀 더 깔끔하게 바꾸는 방법 */
  position: ${({ onlyDropdown }) => (onlyDropdown ? "relative" : "absolute")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ maxContent }) => (maxContent ? "max-content" : "100%")};
  margin-top: ${({ marginTop, onlyDropdown }) =>
    onlyDropdown ? 0 : marginTop || 0}px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GREEN[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 4px;
  ${({ onlyDropdown }) =>
    onlyDropdown
      ? ""
      : "z-index: 1000;"}; // Ensure the dropdown appears above other content

  max-height: 200px;
  overflow-y: auto;
`;

export default Dropdown;
