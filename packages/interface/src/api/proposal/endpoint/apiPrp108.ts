import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zProjectProposalRevision } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

/**
 * @version v0.1
 * @description 사업계획서 revision(projectProposalRevision) 최신본을 조회합니다.
 */

const url = () => `student/proposals/proposal-revision/getRecent`;
const method = "GET";
export const ApiPrp108RequestUrl =
  "student/proposals/proposal-revision/getRecent";

const requestParam = z.object({});

const requestQuery = z.object({
  projectProposal: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalRevision: zProjectProposalRevision,
  }),
};

const responseErrorMap = {};

const apiPrp108 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp108RequestParam = z.infer<typeof apiPrp108.requestParam>;
type ApiPrp108RequestQuery = z.infer<typeof apiPrp108.requestQuery>;
type ApiPrp108RequestBody = z.infer<typeof apiPrp108.requestBody>;
type ApiPrp108ResponseOk = z.infer<(typeof apiPrp108.responseBodyMap)[200]>;

export default apiPrp108;

export type {
  ApiPrp108RequestParam,
  ApiPrp108RequestQuery,
  ApiPrp108RequestBody,
  ApiPrp108ResponseOk,
};
