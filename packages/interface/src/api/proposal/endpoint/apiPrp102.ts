import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectProposalRevision,
  zProjectProposalRevisionRequestCreate,
} from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 사업계획서 revision(projectProposalRevision)를 생성합니다.
 */

const url = () => `/manager/proposals/proposal-revision/create`;
const method = "POST";
export const ApiPrp102RequestUrl =
  "/manager/proposals/proposal-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectProposalRevision: zProjectProposalRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectProposalRevision: zProjectProposalRevision,
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

const apiPrp102 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp102RequestParam = z.infer<typeof apiPrp102.requestParam>;
type ApiPrp102RequestQuery = z.infer<typeof apiPrp102.requestQuery>;
type ApiPrp102RequestBody = z.infer<typeof apiPrp102.requestBody>;
type ApiPrp102ResponseCreated = z.infer<
  (typeof apiPrp102.responseBodyMap)[201]
>;

export default apiPrp102;

export type {
  ApiPrp102RequestParam,
  ApiPrp102RequestQuery,
  ApiPrp102RequestBody,
  ApiPrp102ResponseCreated,
};
