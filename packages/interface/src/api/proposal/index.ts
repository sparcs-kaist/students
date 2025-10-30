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

export * from "./endpoint/apiBudPrp002";
export { default as apiBudPrp002 } from "./endpoint/apiBudPrp002";

export * from "./endpoint/apiBudPrp003";
export { default as apiBudPrp003 } from "./endpoint/apiBudPrp003";

export * from "./endpoint/apiBudPrp004";
export { default as apiBudPrp004 } from "./endpoint/apiBudPrp004";

export * from "./endpoint/apiBudPrp005";
export { default as apiBudPrp005 } from "./endpoint/apiBudPrp005";

export * from "./endpoint/apiBudPrp006";
export { default as apiBudPrp006 } from "./endpoint/apiBudPrp006";

export * from "./endpoint/apiBudPrp007";
export { default as apiBudPrp007 } from "./endpoint/apiBudPrp007";

export * from "./endpoint/apiBudPrp008";
export { default as apiBudPrp008 } from "./endpoint/apiBudPrp008";

export * from "./endpoint/apiBudPrp009";
export { default as apiBudPrp009 } from "./endpoint/apiBudPrp009";

export * from "./endpoint/apiBudPrp010";
export { default as apiBudPrp010 } from "./endpoint/apiBudPrp010";

export * from "./endpoint/apiBudPrp011";
export { default as apiBudPrp011 } from "./endpoint/apiBudPrp011";

export * from "./endpoint/apiBudPrp012";
export { default as apiBudPrp012 } from "./endpoint/apiBudPrp012";

export * from "./endpoint/apiBudPrp013";
export { default as apiBudPrp013 } from "./endpoint/apiBudPrp013";

export * from "./endpoint/apiBudPrp014";
export { default as apiBudPrp014 } from "./endpoint/apiBudPrp014";

export * from "./endpoint/apiBudPrp015";
export { default as apiBudPrp015 } from "./endpoint/apiBudPrp015";

export * from "./endpoint/apiBudPrp016";
export { default as apiBudPrp016 } from "./endpoint/apiBudPrp016";

export * from "./endpoint/apiBudPrp017";
export { default as apiBudPrp017 } from "./endpoint/apiBudPrp017";

export * from "./endpoint/apiPrp016";
export { default as apiPrp016 } from "./endpoint/apiPrp016";

export * from "./endpoint/apiPrp017";
export { default as apiPrp017 } from "./endpoint/apiPrp017";

export * from "./endpoint/apiPrp018";
export { default as apiPrp018 } from "./endpoint/apiPrp018";

export * from "./endpoint/apiPrp019";
export { default as apiPrp019 } from "./endpoint/apiPrp019";

export * from "./endpoint/apiPrp020";
export { default as apiPrp020 } from "./endpoint/apiPrp020";

export * from "./endpoint/apiPrp021";
export { default as apiPrp021 } from "./endpoint/apiPrp021";

export * from "./endpoint/apiPrp121";
export { default as apiPrp121 } from "./endpoint/apiPrp121";

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
