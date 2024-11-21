"use client";

import React from "react";
import styled from "styled-components";
import Typography from "./Typography";

const CardWrapper = styled.div`
  display: flex;
  width: 400px;
  height: 132px;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 13px 33px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme }) => theme.colors.GREEN[700]};
`;

const CardContentWrapper = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]}; // CHACHA: D9 일단 GRAY 100으로?
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const SemesterCard: React.FC = () => (
  <CardWrapper>
    <CardHeaderWrapper>
      <Typography fs={20} fw="SEMIBOLD" color="WHITE">
        분기 선택
      </Typography>
    </CardHeaderWrapper>
    <CardContentWrapper />
  </CardWrapper>
);

export default SemesterCard;
