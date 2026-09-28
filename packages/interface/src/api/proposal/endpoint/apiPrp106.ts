import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zProjectProposalRevisionResponse } from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저 권한으로 사업계획서 revision을 제출합니다.
 */

const url = () => "/manager/proposals/proposal-revision/submit";
const method = "PATCH";

export const ApiPrp106RequestUrl =
  "/manager/proposals/proposal-revision/submit";

const requestParam = z.object({});
const requestQuery = z.object({});

const requestBody = z.object({
  projectProposalRevisionId: zId,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalRevision: zProjectProposalRevisionResponse,
  }),
};

const responseErrorMap = {};

const apiPrp106 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp106RequestParam = z.infer<typeof apiPrp106.requestParam>;
type ApiPrp106RequestQuery = z.infer<typeof apiPrp106.requestQuery>;
type ApiPrp106RequestBody = z.infer<typeof apiPrp106.requestBody>;
type ApiPrp106ResponseOk = z.infer<(typeof apiPrp106.responseBodyMap)[200]>;

export default apiPrp106;

export type {
  ApiPrp106RequestParam,
  ApiPrp106RequestQuery,
  ApiPrp106RequestBody,
  ApiPrp106ResponseOk,
};
