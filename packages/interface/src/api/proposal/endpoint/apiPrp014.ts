import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 예산안(수입) Revision을 삭제합니다.
 */

const url = () => `/manager/proposals/budget-proposals/income-revision/delete`;
const method = "DELETE";
export const ApiPrp014RequestUrl =
  "/manager/proposals/budget-proposals/income-revision/delete";

const requestParam = z.object({
  budgetProposalIncomeRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiPrp014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp014RequestParam = z.infer<typeof apiPrp014.requestParam>;
type ApiPrp014RequestQuery = z.infer<typeof apiPrp014.requestQuery>;
type ApiPrp014RequestBody = z.infer<typeof apiPrp014.requestBody>;
type ApiPrp014ResponseOk = z.infer<(typeof apiPrp014.responseBodyMap)[200]>;

export default apiPrp014;

export type {
  ApiPrp014RequestParam,
  ApiPrp014RequestQuery,
  ApiPrp014RequestBody,
  ApiPrp014ResponseOk,
};
