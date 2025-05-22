import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 각 기구장들의 권한으로, project-proposal의 행을 삭제합니다.
 * 만약 해당 행이 submit이 존재하지 않는 경우, 해당 행과 revision을 삭제합니다.
 * 만약 해당 행이 submit이 존재하는 경우, 최신 revision에서 isRemoved를 true로 변경합니다.
 */

const url = () => `/admin/proposals/project-proposals`;
const method = "DELETE";
export const ApiPrp007RequestUrl =
  "/admin/proposals/project-proposals/project-proposal/projectProposalId";

const requestParam = z.object({
  projectProposalId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    success: z.boolean(),
  }),
  [HttpStatusCode.NotFound]: z.object({
    error: z.literal("Project proposal not found."),
  }),
  [HttpStatusCode.Conflict]: z.object({
    error: z.literal("Cannot delete a submitted project proposal."),
  }),
};

const responseErrorMap = {};

const apiPrp007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp007RequestParam = z.infer<typeof apiPrp007.requestParam>;
type ApiPrp007RequestQuery = z.infer<typeof apiPrp007.requestQuery>;
type ApiPrp007RequestBody = z.infer<typeof apiPrp007.requestBody>;
type ApiPrp007ResponseOK = z.infer<(typeof apiPrp007.responseBodyMap)[200]>;

export default apiPrp007;

export type {
  ApiPrp007RequestParam,
  ApiPrp007RequestQuery,
  ApiPrp007RequestBody,
  ApiPrp007ResponseOK,
};
