import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 예산안(수출) Revision을 삭제합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense-revision/delete`;
const method = "DELETE";
export const ApiPrp015RequestUrl =
  "/manager/proposals/budget-proposals/expense-revision/delete";

const requestParam = z.object({
  budgetProposalExpenseRevisionId: z.coerce.number(),
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

const apiPrp015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp015RequestParam = z.infer<typeof apiPrp015.requestParam>;
type ApiPrp015RequestQuery = z.infer<typeof apiPrp015.requestQuery>;
type ApiPrp015RequestBody = z.infer<typeof apiPrp015.requestBody>;
type ApiPrp015ResponseOk = z.infer<(typeof apiPrp015.responseBodyMap)[200]>;

export default apiPrp015;

export type {
  ApiPrp015RequestParam,
  ApiPrp015RequestQuery,
  ApiPrp015RequestBody,
  ApiPrp015ResponseOk,
};
