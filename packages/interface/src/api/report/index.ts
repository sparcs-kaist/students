import { z } from "zod";
import { registry } from "@sparcs-students/interface/open-api";
import { zOperationReport } from "./type/operation-report.type";
import { zBudgetReportExpense } from "./type/budget-report-expense.type";
import { zProjectReport } from "./type/project-report.type";
import { zBudgetReportIncome } from "./type/budget-report-income.type";

export * from "./type/project-report.type";
export * from "./type/project-report-document-review.type";
export * from "./type/budget-report-income.type";
export * from "./type/budget-report-income-document-review.type";
export * from "./type/budget-report-expense.type";
export * from "./type/budget-report-expense-document-review.type";
export * from "./type/operation-report.type";

export * from "./endpoint/apiBudRpt002";
export { default as apiBudRpt002 } from "./endpoint/apiBudRpt002";

export * from "./endpoint/apiBudRpt003";
export { default as apiBudRpt003 } from "./endpoint/apiBudRpt003";

export * from "./endpoint/apiBudRpt004";
export { default as apiBudRpt004 } from "./endpoint/apiBudRpt004";

export * from "./endpoint/apiBudRpt005";
export { default as apiBudRpt005 } from "./endpoint/apiBudRpt005";

export * from "./endpoint/apiBudRpt006";
export { default as apiBudRpt006 } from "./endpoint/apiBudRpt006";

export * from "./endpoint/apiBudRpt007";
export { default as apiBudRpt007 } from "./endpoint/apiBudRpt007";

export * from "./endpoint/apiBudRpt008";
export { default as apiBudRpt008 } from "./endpoint/apiBudRpt008";

export * from "./endpoint/apiBudRpt009";
export { default as apiBudRpt009 } from "./endpoint/apiBudRpt009";

export * from "./endpoint/apiBudRpt010";
export { default as apiBudRpt010 } from "./endpoint/apiBudRpt010";

export * from "./endpoint/apiBudRpt011";
export { default as apiBudRpt011 } from "./endpoint/apiBudRpt011";

export * from "./endpoint/apiBudRpt012";
export { default as apiBudRpt012 } from "./endpoint/apiBudRpt012";

export * from "./endpoint/apiBudRpt013";
export { default as apiBudRpt013 } from "./endpoint/apiBudRpt013";

export * from "./endpoint/apiBudRpt014";
export { default as apiBudRpt014 } from "./endpoint/apiBudRpt014";

export * from "./endpoint/apiBudRpt015";
export { default as apiBudRpt015 } from "./endpoint/apiBudRpt015";

export * from "./endpoint/apiBudRpt016";
export { default as apiBudRpt016 } from "./endpoint/apiBudRpt016";

export * from "./endpoint/apiBudRpt017";
export { default as apiBudRpt017 } from "./endpoint/apiBudRpt017";

export * from "./endpoint/apiRpt016";
export { default as apiRpt016 } from "./endpoint/apiRpt016";

export * from "./endpoint/apiRpt017";
export { default as apiRpt017 } from "./endpoint/apiRpt017";

export * from "./endpoint/apiRpt018";
export { default as apiRpt018 } from "./endpoint/apiRpt018";

export * from "./endpoint/apiRpt019";
export { default as apiRpt019 } from "./endpoint/apiRpt019";

export * from "./endpoint/apiRpt020";
export { default as apiRpt020 } from "./endpoint/apiRpt020";

export * from "./endpoint/apiRpt021";
export { default as apiRpt021 } from "./endpoint/apiRpt021";

// 도메인 모델 스키마 목록
const zDomainModels = z.object({
  projectReport: zProjectReport,
  budgetReportIncome: zBudgetReportIncome,
  budgetReportExpense: zBudgetReportExpense,
  operationReport: zOperationReport,
});

registry.registerPath({
  tags: ["Report"],
  method: "head",
  path: "/#/Report",
  summary: "PRP-???: Report 도메인",
  description: `
      - File 에 관한 도메인입니다.
      
      # API
      - 사업계획서, 예산안, 운영계획을 작성, 조회, 수정합니다.
      
      # 도메인 모델
      - ProjectReport
      - BudgetReportIncome
      - BudgetReportExpense
      - OperationReport
      - OperatingCommitteeReport
      - TeamOperationReport
  
      # 이외
      - 이외 파일 관련한 기능은 api 가 아닌, 내부 퍼블릭 서비스를 이용하여 진행합니다.
      - presigned url을 통해 프론트에 띄우는 방식입니다.
        `,
  responses: {
    200: {
      description: "Domain Models for Report Domain",
      content: {
        "application/json": {
          schema: zDomainModels,
        },
      },
    },
  },
});
