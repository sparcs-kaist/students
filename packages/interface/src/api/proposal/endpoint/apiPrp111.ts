import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOperationProposal,
  zOperationProposalRequestCreate,
} from "../type/operation-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 사업계획서(projectProposal)를 생성합니다.
 */

const url = () => `/manager/proposals/operation-proposals/create`;
const method = "POST";
export const ApiPrp111RequestUrl =
  "/manager/proposals/operation-proposals/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operationProposal: zOperationProposalRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    operationProposal: zOperationProposal,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiPrp111 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp111RequestParam = z.infer<typeof apiPrp111.requestParam>;
type ApiPrp111RequestQuery = z.infer<typeof apiPrp111.requestQuery>;
type ApiPrp111RequestBody = z.infer<typeof apiPrp111.requestBody>;
type ApiPrp111ResponseCreated = z.infer<
  (typeof apiPrp111.responseBodyMap)[201]
>;

export default apiPrp111;

export type {
  ApiPrp111RequestParam,
  ApiPrp111RequestQuery,
  ApiPrp111RequestBody,
  ApiPrp111ResponseCreated,
};
