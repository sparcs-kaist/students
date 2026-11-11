import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalExpenseDocumentReview } from "../type/budget-proposal-expense-document-review.type";

/**
 * @version v0.1
 * @description 매니저(manager) 또는 집행부원(staff) 권한으로 ExpenseDocumentReview를 조회합니다.
 */
// manager와 staff가 모두 사용하는 api여서 Public 컨트롤러를 사용하고 service 파일에서 권한 검사
const url = () =>
  `/proposals/budget-proposals/expense-document-review/read:budgetProposalExpenseRevisionId`;
const method = "GET";
export const ApiPrp020RequestUrl =
  "/proposals/budget-proposals/expense-document-review/read:budgetProposalExpenseRevisionId";

const requestParam = z.object({
  budgetProposalExpenseRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseDocumentReview: z.array(
      zBudgetProposalExpenseDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiPrp020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp020RequestParam = z.infer<typeof apiPrp020.requestParam>;
type ApiPrp020RequestQuery = z.infer<typeof apiPrp020.requestQuery>;
type ApiPrp020RequestBody = z.infer<typeof apiPrp020.requestBody>;
type ApiPrp020ResponseCreated = z.infer<
  (typeof apiPrp020.responseBodyMap)[200]
>;

export default apiPrp020;

export type {
  ApiPrp020RequestParam,
  ApiPrp020RequestQuery,
  ApiPrp020RequestBody,
  ApiPrp020ResponseCreated,
};
