import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 각 기구장들의 권한으로, project-proposal의 행을 삭제합니다.
 * 만약 해당 행이 submit이 존재하지 않는 경우, 해당 행과 revision을 삭제합니다.
 * 만약 해당 행이 submit이 존재하는 경우, 최신 revision에서 isRemoved를 true로 변경합니다.
 */

export const ApiPrp007RequestUrl =
  "/admin/proposals/project-proposals/project-proposal/:projectProposalId";
export const ApiPrp007Method = "DELETE";

export const ApiPrp007RequestParam = z.object({
  projectProposalId: zId,
});

export const ApiPrp007ResponseBody = z.object({
  success: z.boolean(),
});

export const apiPrp007 = {
  url: ApiPrp007RequestUrl,
  method: ApiPrp007Method,
  requestParam: ApiPrp007RequestParam,
  responseBodyMap: {
    [HttpStatusCode.Ok]: ApiPrp007ResponseBody,
    [HttpStatusCode.NotFound]: z.object({
      error: z.literal("Project proposal not found."),
    }),
    [HttpStatusCode.Conflict]: z.object({
      error: z.literal("Cannot delete a submitted project proposal."),
    }),
  },
};
