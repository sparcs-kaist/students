import React from "react";
import styled from "styled-components";

const StyledCommitteeNameButtonn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.BLACK};
  cursor: pointer;
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  text-decoration: underline;
`;

interface CommitteeNameButtonnProps {
  text: string;
  onClick?: () => void;
}

const CommitteeNameButton: React.FC<CommitteeNameButtonnProps> = ({
  text,
  onClick = () => {},
}) => (
  <StyledCommitteeNameButtonn onClick={onClick}>
    {text}
  </StyledCommitteeNameButtonn>
);

export default CommitteeNameButton;
