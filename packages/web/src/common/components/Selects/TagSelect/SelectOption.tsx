import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

const SelectOption = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ selectable?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 100%;
  gap: 8px;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme, selectable }) =>
    selectable ? theme.colors.BLACK : theme.colors.GRAY[400]};
  background-color: ${({ theme, selected }) =>
    selected !== undefined && selected
      ? theme.colors.GRAY[200]
      : theme.colors.WHITE};
  ${({ selectable }) =>
    selectable &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.GRAY[100]};
      }
    `}
  cursor: ${({ selectable }) => (selectable ? `pointer` : null)};
`;

export default SelectOption;
