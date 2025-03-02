import React from "react";
import styled from "styled-components";

import Typography from "@sparcs-students/web/common/components/Typography";

import colors from "@sparcs-students/web/styles/themes/colors";
import Icon from "./Icon";

interface NoticeProps {
  text: string;
  children?: React.ReactNode;
}

const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const InfoChildWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: 28px;
`;

const InfoInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  //align-items: flex-start;
  //align-self: stretch;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  background: ${({ theme }) => theme.colors.WHITE};
`;

const IconWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
`;

const Notice: React.FC<NoticeProps> = ({ text, children = null }) => (
  <InfoInner>
    <InfoTextWrapper>
      <IconWrapper>
        <Icon type="error_outline" size={20} color={colors.PRIMARY} />
      </IconWrapper>
      <Typography fs={16} lh={20}>
        {text}
      </Typography>
    </InfoTextWrapper>
    <InfoChildWrapper>{children}</InfoChildWrapper>
  </InfoInner>
);

export default Notice;
