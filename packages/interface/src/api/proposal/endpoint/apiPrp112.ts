import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOperationProposalRevision,
  zOperationProposalRevisionRequestCreate,
} from "../type/operation-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 운영계획 revision(OperationProposalRevision)을 생성합니다.
 */

const url = () => `/manager/proposals/operation-proposals-revision/create`;
const method = "POST";
export const ApiPrp112RequestUrl =
  "/manager/proposals/operation-proposals-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operationProposalRevision: zOperationProposalRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    operationProposalRevision: zOperationProposalRevision,
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

const apiPrp112 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp112RequestParam = z.infer<typeof apiPrp112.requestParam>;
type ApiPrp112RequestQuery = z.infer<typeof apiPrp112.requestQuery>;
type ApiPrp112RequestBody = z.infer<typeof apiPrp112.requestBody>;
type ApiPrp112ResponseCreated = z.infer<
  (typeof apiPrp112.responseBodyMap)[201]
>;

export default apiPrp112;

export type {
  ApiPrp112RequestParam,
  ApiPrp112RequestQuery,
  ApiPrp112RequestBody,
  ApiPrp112ResponseCreated,
};
