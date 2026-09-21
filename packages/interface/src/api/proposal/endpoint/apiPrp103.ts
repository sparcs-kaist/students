import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectProposalTimeline,
  zProjectProposalTimelineRequestCreate,
} from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 타임라인(projectProposalTimeline)를 생성합니다.
 */

const url = () => `/manager/proposals/timeline/create`;
const method = "POST";
export const ApiPrp103RequestUrl = "/manager/proposals/timeline/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectProposalTimeline: zProjectProposalTimelineRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectProposalTimeline: zProjectProposalTimeline,
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

const apiPrp103 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp103RequestParam = z.infer<typeof apiPrp103.requestParam>;
type ApiPrp103RequestQuery = z.infer<typeof apiPrp103.requestQuery>;
type ApiPrp103RequestBody = z.infer<typeof apiPrp103.requestBody>;
type ApiPrp103ResponseCreated = z.infer<
  (typeof apiPrp103.responseBodyMap)[201]
>;

export default apiPrp103;

export type {
  ApiPrp103RequestParam,
  ApiPrp103RequestQuery,
  ApiPrp103RequestBody,
  ApiPrp103ResponseCreated,
};
