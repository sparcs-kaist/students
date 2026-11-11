import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalIncomeDocumentReview } from "../type/budget-proposal-income-document-review.type";

/**
 * @version v0.1
 * @description 매니저(manager) 또는 집행부원(staff) 권한으로 IncomeDocumentReview를 조회합니다.
 */

// manager와 staff가 모두 사용하는 api여서 Public 컨트롤러를 사용하고 service 파일에서 권한 검사
const url = () =>
  `/proposals/budget-proposals/income-document-review/read:budgetProposalIncomeRevisionId`;
const method = "GET";
export const ApiPrp017RequestUrl =
  "/proposals/budget-proposals/income-document-review/read:budgetProposalIncomeRevisionId";

const requestParam = z.object({
  budgetProposalIncomeRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeDocumentReview: z.array(
      zBudgetProposalIncomeDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiPrp017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp017RequestParam = z.infer<typeof apiPrp017.requestParam>;
type ApiPrp017RequestQuery = z.infer<typeof apiPrp017.requestQuery>;
type ApiPrp017RequestBody = z.infer<typeof apiPrp017.requestBody>;
type ApiPrp017ResponseCreated = z.infer<
  (typeof apiPrp017.responseBodyMap)[200]
>;

export default apiPrp017;

export type {
  ApiPrp017RequestParam,
  ApiPrp017RequestQuery,
  ApiPrp017RequestBody,
  ApiPrp017ResponseCreated,
};
