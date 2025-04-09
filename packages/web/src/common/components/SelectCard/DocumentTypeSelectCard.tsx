"use client";

import React from "react";
import styled from "styled-components";
import Radio from "@sparcs-students/web/common/components/Radio/index";
import Typography from "@sparcs-students/web/common/components/Typography";
import RadioOption from "@sparcs-students/web/common/components/Radio/RadioOption";

export enum DocumentType {
  BudgetProposal = "예산안",
  BudgetReport = "결산안",
  ProjectProposal = "사업 계획서",
  ProjectReport = "사업 보고서",
  None = "", // 문서 유형 선택 안함
}

const enumToString = (docType: DocumentType): string => {
  switch (docType) {
    case DocumentType.BudgetProposal:
      return "예산안";
    case DocumentType.BudgetReport:
      return "결산안";
    case DocumentType.ProjectProposal:
      return "사업 계획서";
    case DocumentType.ProjectReport:
      return "사업 보고서";
    default:
      return "";
  }
};

interface DocumentTypeSelectCardProps {
  type: DocumentType | null;
  setType: (value: DocumentType | null) => void;
  disabled: boolean;
}

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: 274px;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeaderWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.GRAY[400] : theme.colors.GREEN[700]};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 86px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const DocumentTypeSelectCard: React.FC<DocumentTypeSelectCardProps> = ({
  type,
  setType,
  disabled,
}) => {
  const documentTypes = Object.values(DocumentType);

  return (
    <CardWrapper>
      <CardHeaderWrapper disabled={disabled}>
        <Typography fs={18} fw="SEMIBOLD" color="WHITE" lh={20}>
          문서 유형 선택
        </Typography>
      </CardHeaderWrapper>
      <CardContent>
        <Radio
          rg="8px"
          cg="32px"
          rows={2}
          columns={2}
          value={type ?? DocumentType.None}
          onChange={(val: DocumentType) => setType(val)}
        >
          {documentTypes.slice(0, 4).map(e => (
            <RadioOption
              key={e}
              value={e}
              disabled={disabled}
              checked={disabled ? false : type === e}
            >
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
