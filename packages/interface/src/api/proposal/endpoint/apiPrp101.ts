import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectProposal,
  zProjectProposalRequestCreate,
} from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 사업계획서(projectProposal)를 생성합니다.
 */

const url = () => `/manager/proposals/project-proposals/create`;
const method = "POST";
export const ApiPrp101RequestUrl =
  "/manager/proposals/project-proposals/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectProposal: zProjectProposalRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectProposal: zProjectProposal,
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

const apiPrp101 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp101RequestParam = z.infer<typeof apiPrp101.requestParam>;
type ApiPrp101RequestQuery = z.infer<typeof apiPrp101.requestQuery>;
type ApiPrp101RequestBody = z.infer<typeof apiPrp101.requestBody>;
type ApiPrp101ResponseCreated = z.infer<
  (typeof apiPrp101.responseBodyMap)[201]
>;

export default apiPrp101;

export type {
  ApiPrp101RequestParam,
  ApiPrp101RequestQuery,
  ApiPrp101RequestBody,
  ApiPrp101ResponseCreated,
};
