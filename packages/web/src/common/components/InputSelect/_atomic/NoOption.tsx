import styled from "styled-components";

const NoOption = styled.div`
  padding: 4px 12px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  text-align: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.GRAY[400]};
`;

export default NoOption;
