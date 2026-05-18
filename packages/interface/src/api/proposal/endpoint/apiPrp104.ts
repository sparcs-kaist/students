import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectProposalRevisionRequestUpdate,
  zProjectProposalRevisionResponse,
} from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 사업계획서 revision(projectProposalRevision)를 수정합니다.
 */

const url = () => `/manager/proposals/proposal-revision/update`;
const method = "POST";
export const ApiPrp104RequestUrl =
  "/manager/proposals/proposal-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectProposalRevision: zProjectProposalRevisionRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalRevision: zProjectProposalRevisionResponse,
  }),
};

const responseErrorMap = {};

const apiPrp104 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp104RequestParam = z.infer<typeof apiPrp104.requestParam>;
type ApiPrp104RequestQuery = z.infer<typeof apiPrp104.requestQuery>;
type ApiPrp104RequestBody = z.infer<typeof apiPrp104.requestBody>;
type ApiPrp104ResponseOk = z.infer<(typeof apiPrp104.responseBodyMap)[200]>;

export default apiPrp104;

export type {
  ApiPrp104RequestParam,
  ApiPrp104RequestQuery,
  ApiPrp104RequestBody,
  ApiPrp104ResponseOk,
};
