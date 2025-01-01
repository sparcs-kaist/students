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

const enumToString = (docType: DocumentType): string => {
  switch (docType) {
    case DocumentType.BudgetProposal:
      return "예산안";
    case DocumentType.FinancialStatementProposal:
      return "결산안";
    case DocumentType.BusinessPlan:
      return "사업 계획서";
    case DocumentType.BusinessReport:
      return "사업 보고서";
    default:
      return "";
  }
};

interface DocumentTypeSelectCardProps {
  documentTypes: DocumentType[];
  type: DocumentType;
  setType: (value: DocumentType) => void;
}

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 138px;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme }) => theme.colors.GREEN[700]};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  height: 80px;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const DocumentTypeSelectCard: React.FC<DocumentTypeSelectCardProps> = ({
  documentTypes,
  type,
  setType,
}) => {
  const rows = Math.round(documentTypes.length / 2);
  const columns = documentTypes.length / rows;
  return (
    <CardWrapper>
      <CardHeaderWrapper>
        <Typography fs={18} fw="SEMIBOLD" color="WHITE" lh={20}>
          문서 유형 선택
        </Typography>
      </CardHeaderWrapper>
      <CardContent>
        <Radio
          rg="8px"
          cg="32px"
          rows={rows}
          columns={columns}
          value={type}
          onChange={(val: DocumentType) => setType(val)}
        >
          {documentTypes.map(e => (
            <RadioOption key={e} value={e}>
              <Typography fs={16} lh={20} fw="REGULAR">
                {enumToString(e)}
              </Typography>
            </RadioOption>
          ))}
        </Radio>
      </CardContent>
    </CardWrapper>
  );
};

export default DocumentTypeSelectCard;
