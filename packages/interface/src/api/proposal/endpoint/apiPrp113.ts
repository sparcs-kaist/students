import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOperationProposalRevisionRequestUpdate,
  zOperationProposalRevisionResponse,
} from "../type/operation-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 운영계획 revision(OperationProposalRevision)을 수정합니다.
 */

const url = () => `/manager/proposals/operation-proposals-revision/update`;
const method = "POST";
export const ApiPrp113RequestUrl =
  "/manager/proposals/operation-proposals-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operationProposalRevision: zOperationProposalRevisionRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    operationProposalRevision: zOperationProposalRevisionResponse,
  }),
};

const responseErrorMap = {};

const apiPrp113 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp113RequestParam = z.infer<typeof apiPrp113.requestParam>;
type ApiPrp113RequestQuery = z.infer<typeof apiPrp113.requestQuery>;
type ApiPrp113RequestBody = z.infer<typeof apiPrp113.requestBody>;
type ApiPrp113ResponseOk = z.infer<(typeof apiPrp113.responseBodyMap)[200]>;

export default apiPrp113;

export type {
  ApiPrp113RequestParam,
  ApiPrp113RequestQuery,
  ApiPrp113RequestBody,
  ApiPrp113ResponseOk,
};
