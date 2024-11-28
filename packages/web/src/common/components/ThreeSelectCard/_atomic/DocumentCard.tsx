"use client";

import React from "react";
import styled from "styled-components";
import Radio from "@sparcs-students/web/common/components/Radio/index";
import Typography from "@sparcs-students/web/common/components/Typography";
import RadioOption from "@sparcs-students/web/common/components/Radio/RadioOption";

export enum DocumentType {
  BudgetProposal = "예산안",
  FinancialStatementProposal = "결산안",
  BusinessPlan = "사업 계획서",
  BusinessReport = "사업 보고서",
}

interface DocumentCardProps {
  type: DocumentType;
  setType: (value: DocumentType) => void;
}

const CardWrapper = styled.div`
  display: flex;
  width: 316px;
  height: 138px;
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

const CardContent = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]}; // CHACHA: D9D9D9 일단 GRAY 100으로?
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const DocumentCard: React.FC<DocumentCardProps> = ({ type, setType }) => (
  <CardWrapper>
    <CardHeaderWrapper>
      <Typography fs={20} fw="SEMIBOLD" color="WHITE">
        문서 유형 선택
      </Typography>
    </CardHeaderWrapper>
    <CardContent>
      <Radio
        rg="8px"
        cg="32px"
        rows={2}
        columns={2}
        value={type}
        onChange={(val: DocumentType) => setType(val)}
      >
        <RadioOption value={DocumentType.BudgetProposal}>
          <Typography fs={16} lh={20} fw="REGULAR">
            예산안
          </Typography>
        </RadioOption>
        <RadioOption value={DocumentType.FinancialStatementProposal}>
          <Typography fs={16} lh={20} fw="REGULAR">
            결산안
          </Typography>
        </RadioOption>
        <RadioOption value={DocumentType.BusinessPlan}>
          <Typography fs={16} lh={20} fw="REGULAR">
            사업 계획서
          </Typography>
        </RadioOption>
        <RadioOption value={DocumentType.BusinessReport}>
          <Typography fs={16} lh={20} fw="REGULAR">
            사업 보고서
          </Typography>
        </RadioOption>
      </Radio>
    </CardContent>
  </CardWrapper>
);

export default DocumentCard;
