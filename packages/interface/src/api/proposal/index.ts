import { z } from "zod";
import { registry } from "@sparcs-students/interface/open-api";
import { zOperationProposal } from "./type/operation-proposal.type";
import { zBudgetProposalExpense } from "./type/budget-proposal-expense.type";
import { zProjectProposal } from "./type/project-proposal.type";
import { zBudgetProposalIncome } from "./type/budget-proposal-income.type";

export * from "./type/project-proposal.type";
export * from "./type/project-proposal-document-review.type";
export * from "./type/budget-proposal-income.type";
export * from "./type/budget-proposal-income-document-review.type";
export * from "./type/budget-proposal-expense.type";
export * from "./type/budget-proposal-expense-document-review.type";
export * from "./type/operation-proposal.type";

export * from "./endpoint/apiPrp001";
export { default as apiPrp001 } from "./endpoint/apiPrp001";

export * from "./endpoint/apiPrp002";
export { default as apiPrp002 } from "./endpoint/apiPrp002";

export * from "./endpoint/apiPrp004";
export { default as apiPrp004 } from "./endpoint/apiPrp004";

export * from "./endpoint/apiPrp005";
export { default as apiPrp005 } from "./endpoint/apiPrp005";

export * from "./endpoint/apiPrp006";
export { default as apiPrp006 } from "./endpoint/apiPrp006";

export * from "./endpoint/apiPrp008";
export { default as apiPrp008 } from "./endpoint/apiPrp008";

export * from "./endpoint/apiPrp009";
export { default as apiPrp009 } from "./endpoint/apiPrp009";

export * from "./endpoint/apiPrp021";
export { default as apiPrp021 } from "./endpoint/apiPrp021";

// 도메인 모델 스키마 목록
const zDomainModels = z.object({
  projectProposal: zProjectProposal,
  budgetProposalIncome: zBudgetProposalIncome,
  budgetProposalExpense: zBudgetProposalExpense,
  operationProposal: zOperationProposal,
});

registry.registerPath({
  tags: ["Proposal"],
  method: "head",
  path: "/#/Proposal",
  summary: "PRP-???: Proposal 도메인",
  description: `
      - File 에 관한 도메인입니다.
      
      # API
      - 사업계획서, 예산안, 운영계획을 작성, 조회, 수정합니다.
      
      # 도메인 모델
      - ProjectProposal
      - BudgetProposalIncome
      - BudgetProposalExpense
      - OperationProposal
      - OperatingCommitteeProposal
      - TeamOperationProposal
  
      # 이외
      - 이외 파일 관련한 기능은 api 가 아닌, 내부 퍼블릭 서비스를 이용하여 진행합니다.
      - presigned url을 통해 프론트에 띄우는 방식입니다.
        `,
  responses: {
    200: {
      description: "Domain Models for Proposal Domain",
      content: {
        "application/json": {
          schema: zDomainModels,
        },
      },
    },
  },
});
